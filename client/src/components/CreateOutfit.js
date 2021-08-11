import React from 'react';
import '../App.css';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query"
import { Redirect } from "react-router-dom"
import axios from "axios";


const CreateOutfit = () => {
  
    const [imageSelected, setImageSelected] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [cloudinaryID, setCloudinaryID] = useState("")

    //USEFORM
    const { register, handleSubmit, errors } = useForm();
    

    const postOutfit = (newPost) => {
     fetch("http://localhost:4000/v1/posts/", {
       method: "POST",
       body: JSON.stringify(newPost),
       headers: {
         "Content-Type": "application/json",
       }
     })
     .then((res) => res.json())
     .catch((error) => console.error({ Error: error }));
    }

    
    // USE MUTATION
    const mutation = useMutation((newPost) => postOutfit(newPost));
    const { isLoadinng, isError, error, isSuccess } = mutation;

    const submitData = async (data) => {
      mutation.mutate(data)
    }
   
    if (isSuccess) {
      return <Redirect to= "/" />
    }

    // SENDING IT TO CLOUDINARY
    const uploadImage = () => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "clothespress");

    axios.post(
      "http://api.cloudinary.com/v1_1/clothespress/image/upload",
      formData
    ).then((response) => {
      console.log("image data", response.data);
      setImageURL(response.data.secure_url);
      setCloudinaryID(response.data.public_id);
    });
  };

  return (
    <div>
      <h2>Ok let's hang this up.</h2>
      What brand is this from? < br />
      <form onSubmit={handleSubmit(submitData)}>
      <input
      type="text"
      placeholder="Terrablush"
      {...register("brand", { required: true })}
        /> < br />

      And it's perfect for what occasion? <br />
      <input
      type="text"
      placeholder="Confident"
      {...register("feelings", { required: true })}
        /> < br />

      One word that describes how you feel when you wear it. <br />
      <input
      type="text"
      placeholder="Work"
      {...register("occasion", { required: true })}
        /> < br />
  
      <input
        type="file"
        name="image"
        onChange={(e) => {
          setImageSelected(e.target.files[0]);
        }}
      />

      <input
      type="hidden"
      value="dsdsd"
      {...register("image_url", { required: true })}
        /> < br />

      <input
      type="hidden"
      value="sdsdsd"
      {...register("cloudinary_id", { required: true })}
        /> < br />  

      <button type="primary" onClick={uploadImage}> Submit Image </button> < br />
      <input type="submit"
      value="into the wardrobe you gooooo!" />
      
      </form>
    </div>
  );
};

export default CreateOutfit;