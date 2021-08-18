import React from "react";

import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Redirect } from "react-router-dom";

const CreateAccount = ({ loginUser, setLoginUser }) => {
  //USEFORM
  const { register, handleSubmit } = useForm();

  const uploadUser = async (newUser) => {
    try {
      await fetch("/v1/users", {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        console.log("Account created", res.data)
        return res.json()
      }).then((data) => {
        setLoginUser(data)
      })
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
    return (
      <p class="lg:text-xl md:text-xl sm:text-xl text-base font-serif mb-4 pt-16">
        "Loading...Getting you your exclusive pass"
      </p>
    );
  }

  // if (isError) {
  //   return (
  //     <p class="lg:text-xl md:text-xl sm:text-xl text-base font-serif mb-4 pt-16">
  //       {error}
  //     </p>
  //   );
  // }

  return (
    <>
      <div>
        <h1 class="lg:text-5xl md:text3xl sm:text-xl text-base font-serif mb-14 text-center py-8">
          create an account
        </h1>
        <div class="grid grid-flow-col grid-cols-2">
          <div class="justify-self-center">
            <img
              style={{
                width: "400px",
              }}
              src="https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzV8fGZhc2hpb258ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
            />
          </div>
          <div class="justify-self-center">
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>{" "}
                Create account
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
