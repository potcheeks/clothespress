import React from "react";

import "./Main.css";

const Main = () => {
  return (
    <div className="bg-white h-screen flex flex-col justify-center items-center bg-fa-img">
      <div class="container">
        <img src="https://images.unsplash.com/photo-1603189343302-e603f7add05a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80"></img>
        <div>
          <p class="lg:text-lg md:text-base sm:text-sm font-serif ">
            clothes(ex)press is a visual and visceral tease of your threads all
            in one virtual wardrobe. <br />
            add and curate your own finery museum based on your mood and
            occasion. <br />
            we will even use google's cloud vision api to identify their
            colours!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
