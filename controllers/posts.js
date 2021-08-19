const express = require("express");
const app = express();
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");

const { StatusCodes } = require("http-status-codes");
const cloudinary = require("../utils/cloudinary");

const vision = require("@google-cloud/vision");

//*=====================SHOW ALL THE POSTS=======================
router.get("/", (req, res) => {
  Post.find({}, (err, foundPost) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(foundPost);
  });
});

//*======================FIND OUTFITPOST BY ID========================
router.get("/:id", (req, res) => {
  const id = req.params.id;
  Post.findById(id, (err, foundPost) => {
    if (err) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }
    console.log("post id", foundPost);
    res.status(StatusCodes.OK).json(foundPost);
  });
});

//*======================UPLOAD A POST========================
router.post("/upload", async (req, res) => {
  try {
    const imageData = req.body.data.previewSource;
    // console.log("reqbodyID", req.body.userID)
    const uploadedResponse = await cloudinary.uploader.upload(imageData, {
      upload_preset: "clothespress",
    });
    console.log("SUCCESS IMAGE SENT TO CLOUD!");
    console.log(process.env.GOOGLE_CREDENTIALS)
    const client = new vision.ImageAnnotatorClient({
      keyFilename: process.env.GOOGLE_CREDENTIALS,
    });

    const imageRequest = {
      image: { 
        content: imageData.substring("data:image/png;base64,".length)
      }, features: imageData[{
        model: "buildin/latest"
      }]
    };

    client.imageProperties(imageRequest, {verbrose: true}).then((results) => {
      const colors =
        results[0]?.imagePropertiesAnnotation.dominantColors.colors;
        colors?.forEach(color => console.log("all the colours",color));
      const dominantColour = colors[0]?.color;
      // console.log("Dominant colour:", dominantColour);
      // create a new post
      let post = new Post({
        image_url: uploadedResponse.secure_url,
        cloudinary_id: uploadedResponse.public_id,
        feelings: req.body.feelings,
        brand: req.body.brand,
        occasion: req.body.occasion,
        colour: dominantColour,
        posted_by: req.body.userID,
      });
      console.log("post is", post);
      post.save();
      console.log("postid", post._id);
      User.findByIdAndUpdate(
        req.body.userID,
        { $push: { posts_history: post._id } },
        { new: true },
        (err, foundUser) => res.json(post)
      );
    });
  } catch (error) {
    console.log("error isssss", error);
    res.status(500).json({ err: "Uh oh. Something went wrong" });
  }
});

//*========================DELETE BY ID===========================
router.delete("/:id", async (req, res) => {
  try {
    // Find post by id
    let post = await Post.findById(req.params.id);
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
    const data = {
      brand: req.body.brand,
      feelings: req.body.feelings,
      occasion: req.body.occasion
    };
    post = await Post.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: "Uh oh. Something went wrong" });
  }
});

module.exports = router;
