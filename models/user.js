const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");


const userSchema = new Schema({ 
username: { type: String, required: true},
password: { type: String, required: true},
email: { type: String, unique: true, required: true },
posts_history: [{ type: Schema.Types.ObjectId, ref: "Post" }]
})

// userSchema.pre("save", async function (next){
//   if (!this.isModified("password")) {
//     next ();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt)
// })

// userSchema.methods.matchPassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password)
// }
const User = mongoose.model("User", userSchema);

module.exports = User;