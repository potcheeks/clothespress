import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const Colours = (loginUser) => {
  const { data, error, isLoading } = useQuery("outfitQuery", () =>
    axios(`/v1/users/${loginUserID}`)
  );

  const loginUserID = "6117e2af37eb3bd2df0897c5" || loginUser.username;

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
        green is the colour of your energy, white is blanc but blank you might
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
{
  /* <a href={`/wardrobe/${photo._id}`}></a> */
}
{
  /* <Link to={`wardrobe/${colour.id}`}></Link> */
}
