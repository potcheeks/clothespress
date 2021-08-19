const express = require("express");
const app = express();
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

//? Gets all user profiles
//localhost:4000/v1/users/
router.get("/", (req, res) => {
  User.find({}, (err, allUsers) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(allUsers);
  });
});

// shows user by ID
//localhost:4000/v1/users/:id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  User.findOne({ _id: id })
    .populate("posts_history")
    .exec(function (err, Users) {
      console.log("users: ", Users);
      if (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
      }
      res.status(StatusCodes.OK).json(Users);
    });
});

//localhost:4000/v1/users/
router.post("/", (req, res) => {
  // const userExists = User.findOne({email: req.body.email});
  //   if (userExists) {
  //     res.status(400)
  //     throw new Error("User Already Exists");
  //   }
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10) 
  );
  User.create(req.body, (error, createdUser) => {
    if (error) {
      res.status(400).json({ error: error.message });
    }
    res.status(200).send(createdUser);
    // res.redirect("/");
  });
});


// delete a user
router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedUser);
  });
});

// update a user
router.put("/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedUser) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(updatedUser);
    }
  );
});
module.exports = router;


