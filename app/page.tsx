import { groq } from "next-sanity";
import { client } from "../lib/sanity.client";
import BlogList from "./components/BlogList";

type Props = {};

//reserved keyword to tell next js to fetch the db each 1min and update the statically generated pages with the newest information
export const revalidate = 30;

//query the sanity database using groq and connecting to the DB
const query = groq`
*[_type=='post']{
  ...,
  author->,
  categories[]->
} | order(_createdAt desc)
`;
//Since we will wait for the response from sanity we convert this to a async function
const HomePage = async (props: Props) => {
  const posts = await client.fetch(query);

  return <BlogList posts={posts} />;
};

export default HomePage;
