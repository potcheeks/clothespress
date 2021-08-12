import React from "react";
import "../App.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Redirect } from "react-router-dom";
import axios from "axios";

const ImageUploader = () => {
  const [imageSelected, setImageSelected] = useState("");
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  // Converting image to string
  const handleFileInputChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  //USEFORM
  const { register, handleSubmit, setValue } = useForm();

  const uploadImage = async (newPost) => {
    try {
      console.log("imagefile", newPost.data);
      console.log("imageselected", imageSelected);
      await fetch("http://localhost:4000/v1/posts/upload", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        // setImage("");
        // setLoaded(!loaded);
        console.log("Post submitted", res.data);
      });
    } catch (err) {
      console.error(err);
    }
  };

  // USE MUTATION
  const mutation = useMutation((newPost) => uploadImage(newPost));
  const { isLoading, isError, error, isSuccess } = mutation;

  const submitData = async (data) => {
    mutation.mutate(data);
  };

  return (
    <div>
      <h2>Ok let's hang this up.</h2>
      What brand is this from? <br />
      <form onSubmit={handleSubmit(submitData)}>
        <input
          type="text"
          placeholder="Terrablush"
          {...register("brand", { required: true })}
        />{" "}
        <br />
        And it's perfect for what occasion? <br />
        <input
          type="text"
          placeholder="Work"
          {...register("occasion", { required: true })}
        />{" "}
        <br />
        One word that describes how you feel when you wear it. <br />
        <input
          type="text"
          placeholder="Confident"
          {...register("feelings", { required: true })}
        />{" "}
        <br />
        <input
          type="file"
          onChange={handleFileInputChange}
        />
        <br />
        <button onClick={() => setValue("data", { previewSource })}>
          into the wardrobe you gooooo!
        </button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: "300px" }} />
      )}
    </div>
  );
};

export default ImageUploader;
