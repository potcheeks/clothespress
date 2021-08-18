import React from "react";
import { useHistory } from "react-router-dom";
import "./Choices.css";

const Choices = () => {

  const history = useHistory();

  const feelingsRoute = () =>{ 
    let path = "/feelings"; 
    history.push(path);
  }

  const coloursRoute = () =>{ 
    let path = "/colour"; 
    history.push(path);
  }

  const occasionRoute = () =>{ 
    let path = "/occasion"; 
    history.push(path);
  }



  return (
    <div>
      <h1 class="lg:text-5xl md:text3xl sm:text-xl text-base font-serif mb-14 text-center pt-8">
        SOS Style, let's help.
      </h1>

      <div class="grid grid-cols-3 grid-flow-row">
        <div class="containerchoices">
          <img
            class="imgchoices"
            src="https://i.pinimg.com/564x/e4/72/0a/e4720a017f91a71ef4bbff16ad9f0089.jpg"
          ></img>
          <button 
          onClick={feelingsRoute}
          class="btn"><p class="font-mono">the feels</p></button>
        </div>

        <div class="containerchoices">
          <img
          class="imgchoices" 
          src="https://images.unsplash.com/photo-1523297467724-f6758d7124c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=962&q=80"></img>
          <button 
          onClick={occasionRoute}
          class="btn"><p class="font-mono">the occasion</p></button>
        </div>

        <div class="containerchoices">
         <img
         class="imgchoices" 
         src="https://images.unsplash.com/photo-1513569771920-c9e1d31714af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3634&q=80"></img>
         <button
         onClick={coloursRoute}
         class="btn"><p class="font-mono">the colour</p></button>
        </div>
      </div>
    </div>
  );
};

export default Choices;
