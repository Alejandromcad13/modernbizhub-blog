import urlFor from "../../lib/urlFor";
import Image from "next/image";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import ClientSideRoute from "./ClientSideRoute";

type Props = {
  posts: Post[];
};

const BlogList = ({ posts }: Props) => {
  return (
    <div>
      <hr className="border-[#f7ab0a] mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 px-10 gap-10 gap-y-16 pb-24">
        {posts.map((post) => (
          <ClientSideRoute route={`/post/${post.slug.current}`} key={post._id}>
            <div className="flex flex-col group cursor-pointer mt-10 px-2 ">
              <div
                className="relative w-full h-80 drop-shadow-xl group-hover:scale-105  transition-transform
            duration-200 ease-out bg-[#f7ab0a]/90"
              >
                <Image
                  className="object-contain object-left lg:object-center"
                  fill
                  alt={post.author.name}
                  src={urlFor(post.mainImage).url()}
                />
                <div
                  className="absolute bottom-0 w-full bg-opacity-20 bg-black 
              backdrop-blur-sm rounded drop-shadow-lg text-white p-5 flex justify-between"
                >
                  <div>
                    <p className="font-bold">{post.title}</p>
                    <p>
                      {new Date(post._createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-2 items-center">
                    {post.categories.map((category) => (
                      <div
                        key={category._id}
                        className="bg-[#f7ab0a] text-center text-black px-3 py-1 rounded-full
                  text-sm font-semibold"
                      >
                        {category.title}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex-1">
                <p className="underline text-lg font-bold">{post.title}</p>
                <p className="line-clamp-2 text-gray-500 ">
                  {post.body[0].children[0].text}
                </p>
              </div>
              <p className="mt-5 font-bold flex items-center group-hover:underline">
                Read Post
                <ArrowUpRightIcon className="ml-2 h-4 w-4" />
              </p>
            </div>
          </ClientSideRoute>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
