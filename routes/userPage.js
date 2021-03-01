import express from "express";
import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";
import postRouter from "./postPage.js";
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();
const defaultSort = {name:-1};

const matchConvert = (match) => {
    match["author"] = ObjectId(match["author"]);
}

router.use("/sort", (req, res) => {
  const { match, sort } = req.body;
  matchConvert(match);
  Post.aggregate(
    [
      { $match: match},
      {
        $project: {
          name: 1,
          synopsis: 1,
          genre: 1,
          author: 1,
          tags: 1,
          parts: 1,
          rating:1,
          updated:1,
          length: { $size: "$parts" },
        },
      },
      { $sort: Object.keys(sort).length > 0 ? sort : defaultSort },
    ],
    (err, results) => {
      return res.status(200).json(results);
    }
  );
});

export const userRouter = router;
