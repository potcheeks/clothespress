const express = require("express");
const app = express();
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");

const { StatusCodes } = require("http-status-codes");
const session = require("express-session");

const cloudinary = require("../utils/cloudinary")
const upload = require("../utils/multer")

// const vision = require("@google-cloud/vision");
// const client = new vision.ImageAnnotatorClient({
//   keyFilename: "./cloudAPIKey.json",
// });

// const imageURL = "https://terrablush.com/w-ebase-uploads/2020/12/TerraBlush_ECommerce-94-1920x2880.jpg"
// client
// .imageProperties(imageURL)
// .then((results) => {
//   const colors = results[0].imagePropertiesAnnotation.dominantColors.colors;

//   console.log("Colours:");
//   colors.forEach(color => console.log(color));
// })
// .catch((err) => {
//   console.error("ERROR:", err);
// });

//*=====================SHOW ALL THE POSTS=======================
router.get("/", (req, res) => {
  Post.find({}, (err, foundPost) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(foundPost);
  });
});

//*======================FIND POST BY ID========================
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Post.findById(id, (err, post) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    res.status(StatusCodes.OK).json(post);
  });
});

//*======================UPLOAD A POST========================
router.post("/",  (req,res) => {
//   console.log("body", req.body)
//   try {
//     const fileStr = req.body.data;
//     const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
//       upload_preset: "clothespress"
//     });
//     console.log(
//       "Image sent to cloud",
//       uploadedResponse,
//       req.body.user_id
//     );

//     // create a new post
//     let post = new Post({
//       image_url: uploadedResponse.secure_url,
//       cloudinary_id: uploadedResponse.public_id,
//       feelings: req.body.feelings,
//       brand: req.body.brand,
//     });
//     console.log("post is", post)
//     // pushes the new post in the user's post history
//     await post.save();
//     console.log("postid", post._id);
//   } catch (error) {
//     console.log("error isssss", error);
//     res.status(500).json({ err: "Uh oh. Something went wrong" });
// }

Post.create(req.body, (error, createdPost) => {
  console.log("body",req.body)
  if (error) {
    res.status(400).json({error: error.message})
  }
  res.status(200).json(createdPost)
})
})

//*========================DELETE BY ID===========================
router.delete("/:id", async (req, res) => {
  try {
    // Find post by id
    let post = await Posts.findById(req.params.id);
    // Delete post from cloudinary
    await cloudinary.uploader.destroy(post.cloudinary_id);
    // Delete post from db
    await post.remove();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Uh oh. Something went wrong" });
  }
});

//*=====================UPDATE THE POST=========================
  router.put("/:id", async (req, res) => {
    try {

      let post = await Post.findbyId(req.params.id)
      await cloudinary.uploader.destroy(user.cloudinary_id)
      const result = await cloudinary.uploader.upload(req.file.path)

      const data = {
        brand: req.body.brand || post.brand,
        feelings: req.body.feelings || post.feelings,
      };

      post = await Posts.findByIdAndUpdate(req.params.id, data, { new: true });
      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({ err: "Uh oh. Something went wrong" });
    }
  });
  
  module.exports = router;