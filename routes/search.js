import express from "express";
import mongoose from "mongoose";
import Post from "../models/Post.js";
import Tag from "../models/Tag.js";
const router = express.Router();

const medium = (arr) => {
    const res = arr.reduce((prev, cur) => {
      return prev + cur;
    });
    return (res / arr.length).toFixed(1);
  };

const prettifyPost = (post) => {
    const data = {
      name: post.name,
      synopsis: post.synopsis,
      id: post._id,
      genre: post.genre,
      rating: !!post.rating.length ? medium(post.rating) : 0,
      updated:post.updated
    };
    return data;
}

router.use('/byTag/:tagLabel', async (req, res) => {
    Tag.findOne({ label: req.params.tagLabel })
      .populate("posts")
      .exec((err, docs) => {
          if (!!docs) {
            const data = docs.posts.map((post) => {
              return prettifyPost(post);
            });
            return res.status(200).json(data);
          }
          return res.status(404).json({msg:"Tag doesn't exists"})
      });
})

export const searchRouter = router;