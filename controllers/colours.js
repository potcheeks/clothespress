// export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Downloads/service-account-file.json"


const vision = require("@google-cloud/vision");
const client = new vision.ImageAnnotatorClient({
  keyFilename: "./cloudAPIKey.json",
});

const imageURL = "https://terrablush.com/w-ebase-uploads/2020/12/TerraBlush_ECommerce-94-1920x2880.jpg"
client
.imageProperties(imageURL)
.then((results) => {
  const colors = results[0].imagePropertiesAnnotation.dominantColors.colors;

  console.log("Colours:");
  colors.forEach(color => console.log(color));
})
.catch((err) => {
  console.error("ERROR:", err);
});