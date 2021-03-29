import mongoose from "mongoose";
const { Schema, model } = mongoose;

const genreSchema = new Schema({
  label: { type: String, required: true, unique: true },
  value: { type: String, required: true, unique: true },
});

export default model("Genre", genreSchema);
