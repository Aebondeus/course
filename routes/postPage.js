import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Tag from "../models/Tag.js";
import Part from "../models/Part.js";

const router = express.Router();

const medium = (arr) => {
  const res = arr.reduce((prev, cur) => {
    return prev + cur;
  });
  return (res / arr.length).toFixed(1);
};

const boundPost = (author, post) => {
  User.findById(author).exec((err, user) => {
    user.posts.push(post);
    user.save();
  });
};

const unboundPost = (userId, post) => {
  User.findById(userId, (err, user) => {
    user.posts.splice(indexOf(post), 1);
    user.save();
  });
};

router.use("/newpost", async (req, res) => {
  try {
    const { name, synopsis, author, genre } = req.body;
    const post = new Post({
      name: name,
      synopsis: synopsis,
      author: author,
      genre: genre,
      tags: [],
      parts: [],
      comments: [],
      rating: [],
      updated: new Date(),
    });
    post.save((err) => {
      if (err) {
        res.status(400).json({ err });
      }
      boundPost(author, post);
      return res.status(200).json({ msg: "We did it" });
    });
  } catch (e) {
    return res
      .status(400)
      .json({ err: e, msg: "Something going wrong in newpost" });
  }
});

router.use("/newpart", async (req, res) => {
  const { postId, part } = req.body;
  Post.findById(postId, (err, post) => {
    if (err) {
      return res.status(400).json({ msg: "Post nor found" });
    }
    const data = new Part({
      name: part.name,
      date: new Date(),
      content: part.content,
      post: postId,
    });
    data.save();
    post.parts.push(data);
    post.save();
    return res.status(200).json({ msg: "Part was added" });
  });
});

router.use("/getpost/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    Post.findById(postId, (err, doc) => {
      if (err) {
        return res
          .status(400)
          .json({ msg: "Probably post doesn't exists", error: err });
      }
      if (!!doc) {
        Part.find({ _id: { $in: doc.parts } }, (err, docs) => {
          const parts = [];
          docs.forEach((doc) => {
            parts.push({ name: doc.name, date: doc.date, id: doc._id });
          });
          const data = {
            name: doc.name,
            synopsis: doc.synopsis,
            genre: doc.genre,
            tags: doc.tags,
            parts: parts,
          };
          return res.status(200).json({ postId, data });
        });
      } else {
        return res.status(404).json({ msg: "Post doesn't exists" });
      }
    });
  } catch (e) {
    return res.status(500).json({ msg: "Server error in getpost" });
  }
});

router.use("/getpart/:postId/:partId", async (req, res) => {
  try {
    const partId = req.params.partId;
    Post.findById(req.params.postId, (err, docs) => {
      if (err) {
        return res.status(400).json({ msg: "Post not found" });
      }
      if (!!docs && !!!docs.parts.includes(partId)) {
        return res.status(404).json({ msg: "Part not found" });
      }
      Part.findById(partId, (err, part) => {
        if (err) {
          return res.status(404).json({ msg: "Part not found" });
        }
        return res.status(200).json({ part });
      });
    });
  } catch (e) {
    return res.status(500).json({ msg: "Server error. Check chooseidid" });
  }
});

router.use("/amendpost", (req, res) => {
  const { postId, data } = req.body;
  Post.findByIdAndUpdate(
    postId,
    {
      name: data.name,
      synopsis: data.synopsis,
      genre: data.genre,
      tags: data.tags,
      updated: new Date(),
    },
    { new: true },
    (err, post) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ msg: "Post not found" });
      }
      return res.status(200).json({ msg: "Post was updated" });
    }
  );
});

router.use("/amendpart", (req, res) => {
  const { partId, data } = req.body;
  Part.findByIdAndUpdate(
    partId,
    {
      name: data.name,
      date: new Date(),
      content: data.content,
    },
    { new: true },
    (err, part) => {
      if (err) {
        return res.status(400).json({ msg: "Part not found" });
      }
      return res.status(200).json({ msg: "Part was updated" });
    }
  );
});

router.use("/deletepost", async (req, res) => {
  const { postId } = req.body;
  await Post.findById(postId, (err, post) => {
    post.parts.forEach((part) => {
      Part.findByIdAndDelete(part).exec();
    });
    unboundPost(post.author, post);
  });
  Post.findByIdAndDelete(postId, (err, post) => {
    return res.status(200).json({ msg: "Post was deleted" });
  });
});

router.use("/deletepart", async (req, res) => {
  const { partId } = req.body;
  await Part.findById(partId, (err, part) => {
    Post.findById(part.post, (err, post) => {
      post.parts.splice(post.parts.indexOf(part), 1);
      post.save();
    });
  });
  Part.findByIdAndDelete(partId, (err, part) => {
    return res.status(200).json({ msg: "Part was deleted" });
  });
});

// will work with ajax
router.use("/upload_comm", (req, res) => {
  const postId = req.body;
  Post.findById(postId, (err, post) => {
    if (err) {
      throw err;
    }
    return res.status(200).json({ comms: post.comments });
  });
});

router.use("/add_comm", (req, res) => {
  const { postId, comment } = req.body;
  Post.findById(postId, (err, post) => {
    if (err) {
      throw err;
    }
    post.comments.push(comment);
    return res.status(200).json({ msg: "Comment was added" });
  });
});

// probably will work with ajax
router.use("/rate", (req, res) => {
  const { postId, rate } = req.body;
  Post.findById(postId, (err, post) => {
    if (err) {
      throw err;
    }
    if (!!rate) {
      post.rating.push(rate);
      res.status(200).json({ msg: "You rated this post!" });
    }
    return res.status(200).json({ rating: medium(post.rating) });
  });
});

const postRouter = router;
export default postRouter;
