import React from "react";

type Props = {};

const Banner = (props: Props) => {
  return (
    <section className="md:flex items-center justify-between p-10">
      <div>
        <h1 className="text-7xl font-bold">Miguel&apos;s Daily Blog</h1>
        <h2 className="mt-5">
          Welcome to{" "}
          <span className="underline decoration-4 decoration-[#F7AB0A]">
            every Developers
          </span>{" "}
          Favorite blog in the devosphere
        </h2>
      </div>
      <p className="mt-5 md:mt-2 text-gray-400 max-w-sm">
        New product features | The latest in technology | Weekly tool review
      </p>
    </section>
  );
};

export default Banner;
