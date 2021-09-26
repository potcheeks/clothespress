import React from 'react'


import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Redirect } from "react-router-dom";


const SignIn = ({setLoginUser, loginUser}) => {

  const { register, handleSubmit } = useForm();

  

  const handleLogin = async (newUser) => {
    try {
      await fetch("/v1/sessions", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        return res.json();
      }).then((data) => {
        setLoginUser(data)

      })
    } catch (err) {
      console.error(err);
    }
  };

  
      // USE MUTATION
      const mutation = useMutation((newUser) => handleLogin(newUser));
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
        return "Sorry! Please create an account wiht us"}



  return (
       <>
       <div>
        <h1 class="lg:text-5xl md:text3xl sm:text-2xl text-base font-serif mb-14 text-center py-8">
          welcome back
        </h1>
        <div 
        class="grid grid-flow-col grid-cols-5 container mx-auto">
          <div></div>
          <div 
          class="col-span-2">
            <img
              alt="signinimage"
              className="object-fill"
              src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
            />
          </div>
          <div
          className="col-span-1 pl-32">
            <form onSubmit={handleSubmit(submitData)}>
              <p class="lg:text-xl md:text-xl sm:text-xl text-base font-serif mb-4 pt-60">
                Name
              </p>
              <input
                type="text"
                {...register("username", { required: true })}
                className="bg-gray-100"
              />{" "}
              <p className="lg:text-xl md:text-xl sm:text-xl text-base font-serif mb-4">
                Email
              </p>
              <input 
              type="email" 
              {...register("email", { required: true })}
              className="bg-gray-100"
              />{" "}
              <p className="lg:text-xl md:text-xl sm:text-xl text-base font-serif mb-4">
                Password
              </p>
              <input
                type="password"
                {...register("password", { required: true })}
                className="bg-gray-100"
              />{" "}
              <br />
              <br />
              <br />
              <button className="inline-flex items-center px-3 py-2 font-serif rounded px-4 py-2 leading-5 bg-black text-primary-100 text-white hover:text-white hover:bg-gray-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>{" "}
                Log in
              </button>
            </form>
          </div>
          <div></div>
        </div>
      </div>
    </>
    
  )
}

export default SignIn
