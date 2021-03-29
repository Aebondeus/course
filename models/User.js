import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: { type: String },
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

export default model("User", userSchema);
