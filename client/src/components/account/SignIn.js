import React from 'react'


import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Redirect } from "react-router-dom";


const SignIn = () => {

  const { register, handleSubmit } = useForm();

  const uploadUser = async (newUser) => {
    try {
      await fetch("http://localhost:4000/v1/users", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log("Post submitted", res.data);
      });
    } catch (err) {
      console.error(err);
    }
  };

      // USE MUTATION
      const mutation = useMutation((newUser) => uploadUser(newUser));
      const { isLoading, isError, isSuccess } = mutation;
    
      const submitData = async (data) => {
        mutation.mutate(data);
      };
    
      if (isSuccess) {
        return <Redirect to="/wardrobe" />;
      }
    
      if (isLoading) {
        return "Loading...Getting you your exclusive pass";
      }
    
      if (isError) {
        return "Uh oh, your outfit's too ugly.";
      }

      
  return (
  
       <>
      <div>
        <h1 class="lg:text-5xl md:text3xl sm:text-xl text-base font-serif mb-14 text-center py-8">
          welcome back
        </h1>
        <div class="grid grid-flow-col grid-cols-2">
          <div class="flex">
            <img src="https://images.unsplash.com/photo-1531347058246-6dfef49b7b7b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=800" />
          </div>
          <div class="flex">
            <form onSubmit={handleSubmit(submitData)}>
              <p class="lg:text-xl md:text-xl sm:text-xl text-base font-serif mb-4 pt-16">
                Name
              </p>
              <input
                type="text"
                {...register("username", { required: true })}
              />{" "}
              <p class="lg:text-xl md:text-xl sm:text-xl text-base font-serif mb-4">
                Email
              </p>
              <input type="email" {...register("email", { required: true })} />{" "}
              <p class="lg:text-xl md:text-xl sm:text-xl text-base font-serif mb-4">
                Password
              </p>
              <input
                type="password"
                {...register("password", { required: true })}
              />{" "}
              <br />
              <br />
              <br />
              <button class="inline-flex items-center px-3 py-2 font-serif rounded px-4 py-2 leading-5 bg-black text-primary-100 text-white hover:text-white hover:bg-green-700">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>{" "}
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
    
  )
}

export default SignIn
