import express from "express";
import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";
const ObjectId = mongoose.Types.ObjectId;
const router = express.Router();

const matchConvert = (sortMatch) => {
  sortMatch["author"] = ObjectId(sortMatch["author"]);
};

router.use("/user_posts/:userId", (req, res) => {
  Post.find({author:req.params.userId}).sort({updated:-1}).exec((err, posts) => {
    if (err){
      return res.status(404).json({msg:"User not found!"})
    }
    return res.status(200).json(posts)
  })
})

router.use("/get_data/:userId", async(req, res) => {
  User.findById(req.params.userId, (err, doc) => {
    if (err){
      return res.status(200).json({msg:"User not found!"})
    }
    return res
      .status(200)
      .json({ nickName: doc.nickName, about: doc.about, regDate: doc.regDate, email:doc.email });
  })
})

router.use("/update_nickname", async (req, res) => {
  const {id, nickname} = req.body;
  await User.findByIdAndUpdate(
    id,
    { $set: { nickName: nickname} },
    { new: true },
    (err, doc) => {
      return res.status(200).json({ msg: "Nickname was updated!" });
    }
  );
})

router.use("/update_about", async (req, res) => {
  const {id, about} = req.body;
  await User.findByIdAndUpdate(
    id,
    { $set: { about: about} },
    { new: true },
    (err, doc) => {
      return res.status(200).json({ msg: "About was updated!" });
    }
  );
})

router.use("/sort", (req, res) => {
  try{
    const { sortMatch, sort } = req.body;
    matchConvert(sortMatch);
    Post.aggregate(
      [
        { $match: sortMatch },
        {
          $project: {
            name: 1,
            synopsis: 1,
            genre: 1,
            author: 1,
            tags: 1,
            parts: 1,
            ratingTotal: 1,
            updated: 1,
            length: { $size: "$parts" },
          },
        },
        { $sort: sort },
      ],
      (err, results) => {
        return res.status(200).json(results);
      }
    );
  } catch (e){
    console.log("Error");
    return res.status(400).json({msg:"Not found!"})
  }
});

export const userRouter = router;
