import React from "react";
import { useParams } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { Redirect, useHistory } from "react-router-dom";

import axios from "axios";

const EditOutfitForm = ({ loginUser }) => {
  const { postid } = useParams();
  let history = useHistory();

  //Getting data from backend for previous values
  const { data } = useQuery(
    ["singleOutfitQuery", postid],
    () => axios(`/v1/posts/${postid}`),
    {
      onSuccess: (data) => {
        const outfitData = data?.data;
        setValue("brand", outfitData?.brand);
        setValue("feelings", outfitData?.feelings);
        setValue("occasion", outfitData?.occasion);
      },
    }
  );

  const { register, handleSubmit, reset, setValue } = useForm();

  const editPost = async (newPost) => {
    try {
      console.log(newPost);
      await fetch(`/v1/posts/${postid}`, {
        method: "PUT",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        reset(res.data);
        console.log("Post submitted", res.data);
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    fetch(`/v1/posts/${postid}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }); 
    console.log("delete button works")
    history.push("/wardrobe");
  };

  // USE MUTATION
  // const queryClient = useQueryClient()
  const mutation = useMutation((newPost) => editPost(newPost));
  // const mutation = useMutation((editedpost) => handleDelete(editedpost))

  const { isError, isSuccess } = mutation;

  const submitData = async (data) => {
    mutation.mutate(data);
  };

  if (isSuccess) {
    return <Redirect to={`/wardrobe/${postid}`} />;
  }

  if (isError) {
    return "Error" ;
  }

  return (
    <div>
      <h1 class="lg:text-5xl md:text3xl sm:text-xl text-base font-serif mb-14 text-center py-8">
        let's (re)hang your outfit
      </h1>
      <div class="grid grid-flow-col grid-cols-2">
        <div>
          <form class="m-20" onSubmit={handleSubmit(submitData)}>
            <p class="lg:text-xl md:text-xl sm:text-xl text-base font-serif  pt-16">
              What brand is this from?
            </p>
            <input
              class="lg:text-xl md:text-xl sm:text-xl text-base font-serif"
              type="text"
              {...register("brand", { required: true })}
            />
            <p class="lg:text-xl md:text-xl sm:text-xl text-base font-serif  pt-16">
              Is it still perfect for the occasion below?
            </p>
            <input
              class="lg:text-xl md:text-xl sm:text-xl text-base font-serif"
              type="text"
              {...register("occasion", { required: true })}
            />
            <p class="lg:text-xl md:text-xl sm:text-xl text-base font-serif pt-16">
              Seasons change, feelings too, how about now.
            </p>
            <input
              class="lg:text-xl md:text-xl sm:text-xl text-base font-serif"
              type="text"
              {...register("feelings", { required: true })}
            />
            <br />
            <br />
            <br />
            <button class="inline-flex items-center px-3 py-2 font-serif rounded px-4 py-2 leading-5 bg-black text-primary-100 text-white hover:text-white hover:bg-green-700">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>{" "}
              Edit outfit
            </button>
          </form>
         
          
        </div>
        <div>
          <img src={data?.data?.image_url} alt="chosen" />
          <div class="justify-items-center">
          <button
            onClick={handleDelete}
            class="inline-flex items-center px-3 py-2 font-serif rounded px-4 py-2 leading-5 bg-white text-primary-100 text-black"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            neh, delete this.
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOutfitForm;
