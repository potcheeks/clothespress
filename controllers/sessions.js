const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/user");

// check login
router.get("/check", (req, res) => {
  console.log("checkkkkk");
  console.log("reqcurent",req.session.currentUser)
  res.send(req.session.currentUser);
});

//login
router.post("/", (req, res) => {
  console.log("test response", req.body);
  User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) {
      // Database Problem
      res.status(400).json({ error: err.message });
    } else if (!foundUser) {
      res.status(409).json({ error: "User not found" });
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.status(200).json(foundUser);
      } else {
        res.status(401).json({ error: "Password Does Not Match" });
      }
    }
  });
});

// logout
router.delete("/logout", (req, res) => {
  req.session.destroy(() => {
    res.send("user has logged out");
    // res.redirect("/");
  });
});

// EXPORT
module.exports = router;
