import React from 'react';
import '../App.css';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query"
import { Redirect } from "react-router-dom"
import axios from "axios";


const ImageUploader = () => {
  
    const [imageSelected, setImageSelected] = useState("");
    const [imageURL, setImageURL] = useState("")

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
    // const postOutfit = async (newPost) => 
    // await (await axios.post("http://localhost:4000/v1/posts/", newPost)).data;

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
      setImageURL(response.data.secure_url)
    });
  };

  return (
    <div>
      What brand is this from? < br />
    <form onSubmit={handleSubmit(submitData)}>
     <input
      type="text"
      placeholder="Terrablush"
      {...register("brand", { required: true })}
        /> < br />

      One word to describe how you feel when you put this on. <br />
      <input
      type="text"
      placeholder="Confident"
      {...register("feelings", { required: true })}
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
      value="https://res.cloudinary.com/clothespress/image/upload/v1628600509/clothespress/zg7xwaye8ck0jmopm94n.jpg"
      {...register("image_url", { required: true })}
        /> < br />

      <button type="primary" onClick={uploadImage}> Submit Image </button> < br />
      <input type="submit"
      value="into the wardrobe you gooooo!" />
      
      </form>
    </div>
  );
};

export default ImageUploader;