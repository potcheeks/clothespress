import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const Wardrobe = () => {


  const { data, error, isLoading } = useQuery("outfitQuery", () =>
    axios("http://localhost:4000/v1/posts")
  );
  const outfitPosts = data?.data;
  console.log("outfitposts", outfitPosts);

  // const { data: colours } = useQuery("outfitColour", () => 
  // axios("https://process.env.CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_SECRET@api.cloudinary.com/v1_1/process.env.CLOUDINARY_CLOUD_NAME/resources/image")
  // );
  // const outfitColoursData = colours?.data
  // console.log("outfitdata", outfitColoursData);

 

  return (
    <div className="container">
       {outfitPosts?.map((post) => (
        <>
              <img src={post?.image_url} />
        </>
      ))} 
   
    </div>
  );
};

export default Wardrobe;
