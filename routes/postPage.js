import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Tag from "../models/Tag.js";
import Part from "../models/Part.js";

const router = express.Router();

router.use("/newpost", async (req, res) => {
  try {
    console.log(req.body);
    const { name, synopsis, author, genre, parts } = req.body;
    const post = new Post({
      name: name,
      synopsis: synopsis,
      author: author,
      genre: genre,
      tags: [], // array of objectsIds of tags
      parts: [], // array of objectIds of parts
      comments: [],
      rating: 0,
      updated: new Date(),
    });
    if (!!parts) {
      // create parts of the post and save them with ref to the post
      parts.forEach(async (part) => {
        const data = new Part({
          name: part.name,
          content: part.content,
          date: new Date(),
          post: post._id,
        });
        post.parts.push(data);
        await data.save();
      });
    }
    post.save((err) => {
      // saving post and push it to the User of the author while saving
      if (err) {
        console.log(err);
        res.status(400).json({ err });
      }
      User.findById(author).exec((err, user) => {
        if (err) {
          return res.status(400).json({ err });
        }
        user.posts.push(post);
        user.save();
      });
      return res.status(200).json({ msg: "We did it" });
    });
  } catch (e) {
    return res
      .status(400)
      .json({ err: e, msg: "Something going wrong in newpost" });
  }
});

router.use("/choose/:postId", async (req, res) => {
  const postId = req.params.postId;
  Post.findById(postId, async (err, doc) => {
    if (err) {
      return res
        .status(400)
        .json({ msg: "Probably post doesn't exists", error: err });
    }
    if (!!doc) {
      Part.find({"_id":{$in : doc.parts}}, (err, docs) => {
          const parts = [];
          docs.forEach(doc => {
              parts.push({name:doc.name, date:doc.date, id:doc._id})
          })
          const data = {
              name:doc.name,
              synopsis:doc.synopsis,
              genre:doc.genre,
              tags:doc.tags,
              parts:parts
          }
          return res.status(200).json({data});
      })
    } else {
      return res.status(404).json({ msg: "Post doesn't exists" });
    }
  });
});

const postRouter = router;
export default postRouter;