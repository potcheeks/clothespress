import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Wardrobe.css";

const Wardrobe = ({ loginUser }) => {
  const { data, isError, isLoading } = useQuery("outfitQuery", () =>
    axios(`/v1/users/${loginUserID}`)
  );

  const loginUserID = loginUser._id;

  const userData = data?.data;
  const outfitPosts = userData?.posts_history;
  console.log("outfitposts", outfitPosts);

  if (isLoading) {
    return (
      <p class="lg:text-xl md:text-xl sm:text-xl text-base font-mono pt-16">"Loading.. It's off to the cleaners!"</p>);
  }

  if (isError) {
    return (
      <p class="lg:text-xl md:text-xl sm:text-xl text-base font-mono pt-16">"Uh oh, your outfit's too ugly."</p>);
  }

  return (
    <>
      <h1 class="lg:text-5xl md:text3xl sm:text-3xl text-base font-serif mb-14 text-center py-8">
        this is your clothespress, {loginUser.username} !
      </h1>
      {outfitPosts.length === 0 ? (
        <>
          <p class="lg:text-2xl md:text1xl sm:text-xl text-base font-serif mb-14 text-center">
            your wardrobe is empty, let's hang one up now.
          </p>
          <div class="flex justify-center">
          <Link to="/hang" >
          <button class="inline-flex items-center px-3 py-2 font-serif rounded px-4 py-2 leading-5 bg-black text-primary-100 text-white hover:text-white hover:bg-gray-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Add an outfit
          </button>
          </Link>
          
          </div>
        </>
      ) : (
        <p class="lg:text-2xl md:text1xl sm:text-xl text-base font-serif mb-14 text-center">
          visually pleasing, you've got impeccable taste.
        </p>
      )}

      <div class="grid grid-cols-3 grid-flow-row gap-8">
        {outfitPosts?.map((post) => (
          <>
            <Link to={`wardrobe/${post._id}`}>
              {" "}
              <div className="wardrobecontainer">
                <img className="wardrobeoutfit" src={post?.image_url} />
              </div>
            </Link>
          </>
        ))}
      </div>
    </>
  );
};

export default Wardrobe;

// to dos - href to edit/delete item
