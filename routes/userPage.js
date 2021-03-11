import express from "express";
import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();
const defaultSort = {name:-1};

const matchConvert = (match) => { // match will always have author property
    match["author"] = ObjectId(match["author"]);
}

router.use("/user_posts/:userId", (req, res) => {
  Post.find({author:req.params.userId}).sort({updated:-1}).exec((err, posts) => {
    if (err){
      return res.status(404).json({msg:"User not found!"})
    }
    return res.status(200).json(posts)
  })
})

router.use("/user_comments/:userId", (req, res) => {
  Comment.find({author:req.params.userId}).sort({updated:-1}).exec((err, comments) => {
    if (err) {
      return res.status(404).json({msg:"User not found!"})
    }
    return res.status(200).json(comments)
  })
})

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
