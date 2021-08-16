import React from "react";
import { useQuery } from "react-query";
import axios from "axios";

const Dropdown = (loginUser) => {
  const { data, error, isLoading } = useQuery("outfitQuery", () =>
    axios(`/v1/users/${loginUserID}`)
  );

  const loginUserID = "6117e2af37eb3bd2df0897c5" || loginUser.username;

  const userData = data?.data;
  const postHistory = userData?.posts_history;
  const feelings = uniq(postHistory?.map((post) => post.feelings));
  const occasion = uniq(postHistory?.map((post) => post.occasion));
  console.log("feelings", feelings);
  console.log("occasions", occasion);

  // unique 
  function uniq(a) {
    return a.sort().filter(function (item, pos, ary) {
      return !pos || item != ary[pos - 1];
    });
  }

  // console.log(uniq(feelings));

  return (
    <div>
      <h1 class="lg:text-5xl md:text3xl sm:text-xl text-base font-serif mb-14 text-center pt-8">
        SOS Style, let's help.
      </h1>
      <p class="lg:text-2xl md:text1xl sm:text-xl text-base font-serif mb-14 text-center">
        good morning {userData?.username}, and how are you feeling today?
      </p>

      <div class="relative inline-flex">
        <svg
          class="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 412 232"
        >
          <path
            d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
            fill="#648299"
            fill-rule="nonzero"
          />
        </svg>
        <select class="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
          <option>Feelings, ugh what are they?</option>
          <option>Red</option>
          <option>Blue</option>
          <option>Yellow</option>
          <option>Black</option>
          <option>Orange</option>
          <option>Purple</option>
          <option>Gray</option>
          <option>White</option>
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
