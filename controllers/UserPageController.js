import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const ObjectId = mongoose.Types.ObjectId;

const matchConvert = (sortMatch) => {
  sortMatch["author"] = ObjectId(sortMatch["author"]);
};

export const UserPageController = () => {
  const getUser = async (req, res) => {
    try {
      Post.find({ author: req.params.userId })
        .sort({ updated: -1 })
        .exec((err, posts) => {
          if (err) {
            return res.status(404).json({ msg: "User not found!" });
          }
          return res.status(200).json(posts);
        });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ msg: "Server error. Check getUser" });
    }
  };

  const getData = async (req, res) => {
    try {
      await User.findById(req.params.userId, (err, doc) => {
        if (err) {
          return res.status(404).json({ msg: "User not found!" });
        }
        return res.status(200).json({
          nickName: doc.nickName,
          about: doc.about,
          regDate: doc.regDate,
          email: doc.email,
        });
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ msg: "Server error. Check getData" });
    }
  };

  const updateNickname = async (req, res) => {
    try {
      const { id, nickname } = req.body;
      await User.findByIdAndUpdate(
        id,
        { $set: { nickName: nickname } },
        { new: true },
        (err, doc) => {
          const token = jwt.sign(
            { id: doc._id, nickname: doc.nickName },
            process.env.FOR_TOKEN,
            { expiresIn: "1h" }
          );
          return res
            .status(200)
            .json({ msg: "Nickname was updated!", token: token });
        }
      );
    } catch (e) {
      console.log(e);
      return res
        .status(500)
        .json({ msg: "Server error. Check updateNickname" });
    }
  };

  const updateAbout = async (req, res) => {
    try {
      const { id, about } = req.body;
      await User.findByIdAndUpdate(
        id,
        { $set: { about: about } },
        { new: true },
        (err, doc) => {
          return res.status(200).json({ msg: "About was updated!" });
        }
      );
    } catch (e) {
      console.log(e);
      return res.status(500).json({ msg: "Server error. Check updateAbout" });
    }
  };

  const sortPosts = async (req, res) => {
      try {
        const { sortMatch, sort } = req.body;
        matchConvert(sortMatch);
        await Post.aggregate(
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
      } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Server error. Check sortPosts" });
      }
  }

  const deleteUser = async (req, res) => {
    try{
      const userId = req.params.userId;
      User.findByIdAndDelete(userId).exec((err, doc) => {
        return res.status(200).json({ msg: "User was deleted" });
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ msg: "Server Error. Check deleteUser" });
    }
  }
  return { getUser, getData, updateNickname, updateAbout, sortPosts, deleteUser };
};
