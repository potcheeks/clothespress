import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const Colours = (loginUser) => {
  const loginUserID = loginUser?._id;

  const { data, error, isLoading } = useQuery(["outfitQuery", loginUserID], () =>
    axios(`/v1/users/${loginUserID}`)
  );

  
  const userData = data?.data;
  const postHistory = userData?.posts_history;
  const rgbArray = postHistory?.map((post) => {
    return { colour: post.colour, id: post._id };
  });

  return (
    <div>
      <h1 class="lg:text-5xl md:text3xl sm:text-xl text-base font-serif mb-14 text-center pt-8">
        SOS Style, let's help.
      </h1>
      <p class="lg:text-2xl md:text1xl sm:text-xl text-base font-serif mb-14 text-center">
        {" "}
        nude is the colour of your energy, white is blanc but blank you might
        not be.{" "}
      </p>
      <div class="grid grid-cols-6 grid-flow-row gap-8">
        {rgbArray?.map((colour) => (
          <div class="justify-self-center">
            <a href={`wardrobe/${colour.id}`}>
              <div
                style={{
                  backgroundColor: `rgb(${colour.colour.red}, ${colour.colour.green}, ${colour.colour.blue})`,
                  height: "200px",
                  width: "200px",
                }}
              ></div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Colours;
