const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const userSchema = new Schema({ 
username: { type: String, required: true},
password: { type: String, required: true},
email: { type: String, unique: true, required: true },
posts_history: [{ type: Schema.Types.ObjectId, ref: "Post" }]
})

const User = mongoose.model("User", userSchema);

module.exports = User;