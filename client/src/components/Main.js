async function quickstart() {
  // Imports the Google Cloud client library
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // image url 
  const img_URL = "https://res.cloudinary.com/clothespress/image/upload/v1628224059/ucgoe8pzfuvs4udyytii.jpg"

  // Performs label detection on the image file
  const [result] = await client.labelDetection(img_URL);
  const labels = result.labelAnnotations;
  console.log('Labels:');
  labels.forEach(label => console.log(label.description));
}
quickstart();

