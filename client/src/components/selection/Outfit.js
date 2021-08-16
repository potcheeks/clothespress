import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";


import "./Outfit.css";

const Outfit = () => {
  const { data, error, isLoading } = useQuery("singleOutfitQuery", () =>
    axios(`/v1/posts/${postid}`)
  );
  const { postid } = useParams();


  const outfitData = data?.data;
  console.log(outfitData)

  return (
    <div>
      <h1 class="lg:text-5xl md:text3xl sm:text-xl text-base font-serif mb-14 text-center pt-8">
        peek,deep.
      </h1>
      <p class="lg:text-2xl md:text1xl sm:text-xl text-base font-serif mb-14 text-center">
        piqued your interest, this isn't just worth a mere peek.
      </p>
      <div class="grid grid-cols-2 grid-flow-row">
      <div className="container">
        <img
          src={outfitData?.image_url}
          alt=""
        />
      </div>

      <div>
        <p class="lg:text-xl md:textxl sm:text-xl text-base font-serif mb-14 text-left lowercase max-w-lg pt-40">
        "You bought this delightful piece from {outfitData?.brand}, and whenever you wear her you
        feel absolutely {outfitData?.feelings}. An occasion to wear her out to? 
        Mmmm... {outfitData?.occasion} perhaps?"
        </p>
        <button class="lg:text-xl md:textxl sm:text-xl text-base font-serif mb-14 lowercase max-w-lg pt-40"> // edit</button>
      </div>
      </div>
      
    </div>
  );
};

export default Outfit;
