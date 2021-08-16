import { useQuery, QueryCache, QueryClient, QueryObserver } from "react-query";
import axios from "axios";

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
  console.log("coloursobject", rgbArray);

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
      <div class="grid grid-cols-5 grid-flow-row gap-8">
        {rgbArray?.map((colour) => (
          <div 
          style={{
            backgroundColor: `rgb(${colour.colour.red}, ${colour.colour.green}, ${colour.colour.blue})`,
            height: '200px',
            width: '200px',
          }}
          class="justify-self-center "
          >
            </div>
        ))}
      </div>
    </div>
  );
};

export default Colours;
