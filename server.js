//* =======================================
//*              DEPENDENCIES
//* =======================================
const express = require("express"); 
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const methodOverride = require("method-override");

//* =======================================
//*              CONFIGURATIONS
//* =======================================
require("dotenv").config();
const PORT = process.env.PORT;
const mongodbURI = process.env.MONGODB_URI;


//* =======================================
//*        BODY PARSER, MIDDLEWARE
//* =======================================
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  res.send("Hello World");
});

//* =======================================
//*            MONGOOSE CONNECTION
//* =======================================
mongoose.connect(mongodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);

mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

//* =======================================
//*         CONTROLLERS/ROUTES
//* =======================================
const postsController = require("./controllers/posts.js");
app.use("/v1/posts", postsController); //only users can post

// const usersController = require("./controllers/users.js");
// app.use("/v1/users", usersController);



//* =======================================
//*              LISTENER
//* =======================================
app.listen(PORT, () => {
  console.log("Listening on the port", PORT);
});