import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

import "./Wardrobe.css";

const Wardrobe = ({ loginUser }) => {
  const { data, error, isLoading } = useQuery("outfitQuery", () =>
    axios(`/v1/users/${loginUserID}`)
  );

  const loginUserID = loginUser._id;

  const userData = data?.data;
  const outfitPosts = userData?.posts_history;
  console.log("outfitposts", outfitPosts);

  if (isLoading) {
    return "Loading...Currently pressing your outfit!";
  }

  return (
    <>
      <h1 class="lg:text-5xl md:text3xl sm:text-xl text-base font-serif mb-14 text-center py-8">
        this is your clothespress, {userData.username} !
      </h1>
      <p class="lg:text-2xl md:text1xl sm:text-xl text-base font-serif mb-14 text-center">
        visually pleasing, you've got impeccable taste.
      </p>
      <div class="grid grid-cols-3 grid-flow-row gap-8">
        {outfitPosts?.map((post) => (
          <>
          <a href={`wardrobe/${post._id}`}>
            <div className="wardrobecontainer">
              <img 
              className="wardrobeoutfit"
              src={post?.image_url} />
            </div>
            </a>
          </>
        ))}
      </div>
    </>
  );
};

export default Wardrobe;

// to dos - href to edit/delete item
