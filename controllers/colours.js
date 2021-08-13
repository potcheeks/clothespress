const axios = require('axios');
const router = express.Router();





// Make a request for a user with a given ID
axios.get('https://process.env.CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_SECRET@api.cloudinary.com/v1_1/process.env.CLOUDINARY_CLOUD_NAME/resources/image')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

  module.exports = router;
