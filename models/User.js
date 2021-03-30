import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique:true },
  phone: { type: String },
  password: { type: String },
  nickName: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  facebookId: { type: String },
  vkId: { type: String },
  yandexId: { type: String },
  googleId: { type: String },
  isAdmin: { type: Boolean, required: true, default: false },
  about: { type: String, default: "" },
  regDate: { type: Date, default: new Date() },
});

userSchema.plugin(findOrCreate);
export default model("User", userSchema);
