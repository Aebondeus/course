import express from "express";
import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();
const defaultSort = {name:-1};

const matchConvert = (sortMatch) => { // match will always have author property
  sortMatch["author"] = ObjectId(sortMatch["author"]);
}

router.use("/user_posts/:userId", (req, res) => {
  Post.find({author:req.params.userId}).sort({updated:-1}).exec((err, posts) => {
    if (err){
      return res.status(404).json({msg:"User not found!"})
    }
    return res.status(200).json(posts)
  })
})

router.use("/sort", (req, res) => {
  const { sortMatch, sort } = req.body;
  matchConvert(sortMatch);
  Post.aggregate(
    [
      { $match: sortMatch},
      {
        $project: {
          name: 1,
          synopsis: 1,
          genre: 1,
          author: 1,
          tags: 1,
          parts: 1,
          ratingTotal:1,
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
