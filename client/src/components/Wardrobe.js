import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

import "./Wardrobe.css";

const Wardrobe = () => {
  const { data, error, isLoading } = useQuery("outfitQuery", () =>
    axios("/v1/posts")
  );
  const outfitPosts = data?.data;
  console.log("outfitposts", outfitPosts);

  return (
    <>
    <h1 class="lg:text-5xl md:text3xl sm:text-xl text-base font-serif mb-14 text-center py-8">your clothespress</h1>
    <div class="grid grid-cols-3 grid-flow-row gap-8">
      {outfitPosts?.map((post) => (
        <>
          <div className="wardrobecontainer">
            <img src={post?.image_url} />
          </div>
        </>
      ))}
    </div>
    </>
  );
};

export default Wardrobe;
