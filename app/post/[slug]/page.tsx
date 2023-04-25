import { client } from "@/lib/sanity.client";
import urlFor from "@/lib/urlFor";
import { PortableText } from "@portabletext/react";
import { groq } from "next-sanity";
import Image from "next/image";
import { RichTextComponents } from "../../components/RichTextComponents";

type Props = {
  params: {
    slug: string;
  };
};

//reserved keyword to tell next js to fetch the db each 1min and update the statically generated pages with the newest information
export const revalidate = 30;

export async function generateStaticParams() {
  //we create a query that only returns that slug information of each post created
  const query = groq`
  *[_type=='post']{
    slug
  } 
  `;
  //fetches the sanity DB using the query below
  const slugs: Post[] = await client.fetch(query);
  // we map through the list of post slugs we got and we get the specific slug for each post
  const slugRoutes = slugs.map((slug) => slug.slug.current);

  //map through all the slug list and with it's content, we create an object that will have the slug each post has
  return slugRoutes.map((slug) => ({
    slug,
  }));
}

const Post = async ({ params: { slug } }: Props) => {
  //query says find me the schemas of type post that have the same slug as the slug im passing in the url as params
  const query = groq`
  *[_type=='post' && slug.current == $slug][0]{
    ...,
    author->,
    categories[]->
  } 
  `;
  //we import the type for the post, and fetch the sanity DB with the fetch function, we also pass the slug given as params
  const post: Post = await client.fetch(query, { slug });

  return (
    <article className="px-10 pb-28">
      <section className="space-y-2 border border-[#F7AB0A] text-white">
        <div className="relative min-h-56 flex-col flex md:flex-row justify-between">
          <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
            <Image
              alt={post.title}
              fill
              src={urlFor(post.mainImage).url()}
              className="object-cover object-center mx-auto"
            />
          </div>
          <section className="p-5 bg-[#f7ab0a] w-full ">
            <div className="flex flex-col md:flex-row justify-between gap-y-5">
              <div>
                <h1 className="text-4xl font-extrabold">{post.title}</h1>
                <p>
                  {new Date(post._createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  alt={post.author.name}
                  height={40}
                  width={40}
                  src={urlFor(post.author.image).url()}
                  className="rounded-full"
                />
                <div className="w-64">
                  <h3 className="text-lg font-bold">{post.author.name}</h3>
                  <div>{/*author bio*/}</div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="italic pt-10">{post.description}</h2>
              <div className="flex items-center justify-end mt-auto space-x-2">
                {post.categories.map((category) => (
                  <p
                    className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4"
                    key={category._id}
                  >
                    {category.title}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section>
      <section className="pt-10">
        <PortableText value={post.body} components={RichTextComponents} />
      </section>
    </article>
  );
};

export default Post;
