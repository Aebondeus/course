import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Tag from "../models/Tag.js";

const router = express.Router();

router.use("/newpost", async (req, res) => {
  try {
    console.log(req.body);
    const { name, synopsis, author, genre } = req.body;
    const date = new Date();
    const post = new Post({
      name: name,
      synopsis: synopsis,
      author: author,
      genre: genre,
      tags: null,
      parts: [],
      comments: [],
      rating: 0,
      updated: date,
    });
    post.save(err => {
        if (err){
            console.log(err);
            res.status(400).json({err})
        }
        User.findById(author).exec((err, user) => {
            if (err){
                return res.status(400).json({err});
            }
            user.posts.push(post);
            user.save();
        });
        return res.status(200).json({masg:"We did it"})
    });
  } catch (e) {
    return res.status(400).json({ err:e, msg: "Something going wrong in newpost" });
  }
});
const postRouter = router;
export default postRouter;
