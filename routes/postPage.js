import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Tag from "../models/Tag.js";
import Part from "../models/Part.js";
import Comment from "../models/Comment.js";

const router = express.Router();

const medium = (arr) => {
  const res = arr.reduce((prev, cur) => {
    return prev + cur;
  });
  return (res / arr.length).toFixed(1);
};

const boundPost = async (author, post) => {
  await User.findByIdAndUpdate(author, { $push: { posts: post } }).exec();
};

const unboundPost = (userId, post) => {
  console.log("Unbound post from user");
  User.findByIdAndUpdate(userId, { $pull: { posts: post } }).exec();
};

const createComment = (postId, comment) => {
  const data = new Comment({
    post: postId,
    author: comment.author,
    content: comment.content,
    publishDate: new Date(),
  });
  data.save(() => {
    User.findByIdAndUpdate(comment.author, { $push: { comments: data } });
  });
  return data;
};

const prettifyComment = (arr) => {
  const result = [];
  if (!!arr) {
    arr.forEach((doc) => {
      result.push({
        commentId: doc._id,
        date: doc.publishDate,
        content: doc.content,
        author: doc.author.nickName,
        authorId: doc.author._id,
      });
    });
  }
  return result;
};

const deleteComment = async (arr) => {
  console.log(arr);
  for (const comment of arr) {
    await User.findOneAndUpdate(
      { comments: { $all: comment } },
      { $pull: { comments: comment } }
    ).exec();
    await Comment.findByIdAndDelete(comment).exec();
  }
};

const prettifyParts = (arr) => {
  const result = [];
  arr.forEach((doc) => {
    result.push({ name: doc.name, date: doc.date, id: doc._id });
  });
  return result;
};

const prettifyTags = (arr) => {
  const result = [];
  arr.forEach((doc) => {
    result.push({ label: doc.label, value: doc.value, id: doc._id });
  });
  return result;
};

const boundTags = async (arr, post) => {
  // refactor it
  console.log(arr, post);
  console.log("Bound tags!");
  for (const tag of arr) {
    await Tag.find({ label: tag }, async (err, doc) => {
      let ourTag = null;
      if (!!!doc.length) {
        await new Tag({
          label: tag,
          value: tag.toLowerCase(),
          posts: [post],
        }).save();
      } else {
        console.log("I am here");
        ourTag = doc[0];
        await Tag.findByIdAndUpdate(ourTag._id, {
          $push: { posts: post },
        }).exec();
      }
    });
  }
  setTimeout(async () => {
    await Tag.find({ posts: { $all: post._id } }, (err, docs) => {
      console.log(`This is our docs! ${docs}`);
      Post.findByIdAndUpdate(post, { $push: { tags: { $each: docs } } }).exec();
    });
  }, 50);
};

const unboundTag = (tags, post) => {
  for (const tag of tags) {
    Tag.findById(tag, async (err, doc) => {
      await Tag.findByIdAndUpdate(tag, { $pull: { posts: post } }).exec();
    });
  }
};

router.use("/newpost", (req, res) => {
  try {
    console.log(req.body);
    const { form, author, tags } = req.body;
    const post = new Post({
      name: form.title,
      synopsis: form.synopsis,
      author: author,
      genre: form.genre,
      tags: [],
      parts: [],
      comments: [],
      rating: [],
      updated: new Date(),
    });

    post.save((err) => {
      if (err) {
        return res.status(400).json({ err });
      }
      boundTags(tags, post);
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
    Post.findById(postId)
      .populate("parts")
      .populate("tags")
      .exec((err, doc) => {
        const data = {
          name: doc.name,
          synopsis: doc.synopsis,
          genre: doc.genre,
          tags: prettifyTags(doc.tags),
          parts: prettifyParts(doc.parts),
        };
        return res.status(200).json({ postId, data });
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
        return res.status(200).json({ part, parts: docs.parts });
      });
    });
  } catch (e) {
    return res.status(500).json({ msg: "Server error. Check chooseidid" });
  }
});

router.use("/amendpost", async (req, res) => {
  const { postId, form, tags } = req.body;
  await Post.findById(postId, (err, doc) => {
    console.log(doc);
    unboundTag(doc.tags, doc._id);
  });
  Post.findByIdAndUpdate(
    postId,
    {
      name: form.title,
      synopsis: form.synopsis,
      genre: form.genre,
      tags: [],
      updated: new Date(),
    },
    { new: true },
    (err, post) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ msg: "Post not found" });
      }
      boundTags(tags, post._id);
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
    console.log("first");
    unboundPost(post.author, post._id);
    console.log("second");
    unboundTag(post.tags, post._id);
    console.log("Last but not least");
    deleteComment(post.comments);
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

router.use("/upload_comm/:postId", (req, res) => {
  Comment.find({ post: req.params.postId })
    .sort({ publishDate: 1 })
    .populate("author")
    .exec((err, docs) => {
      const result = prettifyComment(docs);
      return res.status(200).json(result);
    });
});

router.use("/add_comm", (req, res) => {
  const { postId, comment } = req.body;
  Post.findById(postId, (err, post) => {
    if (err) {
      throw err;
    }
    let data = createComment(postId, comment);
    post.comments.push(data);
    post.save();
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
      post.rating.push(Number(rate));
      post.save();
      return res.status(200).json({ msg: "You rated this post!" });
    }
    return res.status(200).json({ rating: medium(post.rating) });
  });
});

router.use("/add_tag", (req, res) => {
  const { label } = req.body;
  const data = new Tag({
    label: label,
    value: label.toLowerCase(),
  });
  data.save();
  return res.status(200).json({ msg: "Tag was added" });
});

router.use("/upload_tags", (req, res) => {
  Tag.find({}, (err, tags) => {
    return res.status(200).json(tags);
  });
});

const postRouter = router;
export default postRouter;

// Comment.findByIdAndDelete(comment).exec(async (err, doc) => {
//   let comments = null;
//   const data = await User.findById(doc.author)
//     .exec()
//     .then((data) => (comments = data.comments));
//   await comments.splice(comments.indexOf(comment));
//   await User.findByIdAndUpdate(
//     doc.author,
//     { comments: comments },
//     { new: true }
//   )
//     .exec()
//     .then((data) => console.log(`Hey look at this shit ${data}`));
// });
