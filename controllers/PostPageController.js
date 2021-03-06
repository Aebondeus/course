import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Genre from "../models/Genre.js";
import Post from "../models/Post.js";
import Tag from "../models/Tag.js";
import Part from "../models/Part.js";
import Comment from "../models/Comment.js";
import cloud from "../utils/cloudinary.js";
import { config } from "../config.js";

const SCORES = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

const isRealUser = (token) => {
  try {
    const user = jwt.verify(token, process.env.FOR_TOKEN || config.FOR_TOKEN);
    return user.id;
  } catch (e) {
    return false;
  }
};

const isAuthorOfPost = async (userId, postId) => {
  const post = await Post.findById(postId).exec();
  return userId == post.author;
};

const medium = (arr) => {
  let data = arr.reduce((prev, cur) => {
    return prev + cur;
  });
  return parseFloat((data / arr.length).toFixed(1));
};

const getRating = (arr) => {
  const rating = arr.reduce((prev, cur) => {
    return prev.concat(Object.values(cur));
  }, []);
  return rating;
};

const getRaters = (arr) => {
  const raters = arr.reduce((prev, cur) => {
    return prev.concat(Object.keys(cur));
  }, []);
  return raters;
};

const boundPost = async (author, post) => {
  await User.findByIdAndUpdate(author, { $push: { posts: post } }).exec();
};

const unboundPost = async (userId, post) => {
  await User.findByIdAndUpdate(userId, { $pull: { posts: post } }).exec();
};

const createComment = (postId, comment) => {
  const data = new Comment({
    post: postId,
    author: comment.author,
    content: comment.content,
    publishDate: new Date(),
  });
  data.save(async () => {
    await User.findByIdAndUpdate(comment.author, { $push: { comments: data } });
  });
  return data;
};

const createNewPost = (form, user) => {
  return new Post({
    name: form.title,
    synopsis: form.synopsis,
    author: user,
    genre: form.genre,
    tags: [],
    parts: [],
    comments: [],
    rating: [],
    ratingTotal: 0,
    updated: new Date(),
  });
};

const createNewPart = (part, postId, imgLink) => {
  return new Part({
    name: part.name,
    date: new Date(),
    content: part.content,
    post: postId,
    image: imgLink,
  });
};

const getPostData = (post) => {
  return {
    id: post.id,
    author: !!post.author && post.author.id,
    nickname: !!post.author && post.author.nickName,
    name: post.name,
    synopsis: post.synopsis,
    genre: post.genre,
    rating: post.ratingTotal,
    raters: getRaters(post.rating),
    tags: prettifyTags(post.tags),
    parts: prettifyParts(post.parts),
  };
};

const prettifyComment = (arr) => {
  if (!!arr) {
    const result = arr.map((doc) => {
      return {
        commentId: doc._id,
        date: doc.publishDate,
        content: doc.content,
        author: !!doc.author ? doc.author.nickName : null,
        authorId: !!doc.author ? doc.author._id : null,
      };
    });
    return result;
  }
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
  const result = arr.map((doc) => {
    return { name: doc.name, date: doc.date, id: doc._id };
  });
  return result;
};

const deletePostParts = async (post) => {
  post.parts.forEach((part) => {
    Part.findByIdAndDelete(part).exec((err, doc) => {
      !!doc.image && destroyImage(doc.image);
    });
  });
};

const prettifyTags = (arr) => {
  const result = arr.map((doc) => {
    return { label: doc.label, value: doc.value, id: doc._id };
  });
  return result;
};

const createNewTag = async (tag, post) => {
  await new Tag({
    label: tag,
    value: tag.toLowerCase(),
    posts: [post],
  }).save();
};

const addNewPostToTag = async (tagId, post) => {
  await Tag.findByIdAndUpdate(tagId, {
    $push: { posts: post },
  }).exec();
};

const addTagsToPost = async (postId) => {
  await Tag.find({ posts: { $all: postId } }, (err, docs) => {
    Post.findByIdAndUpdate(postId, {
      $push: { tags: { $each: docs } },
    }).exec();
  });
};

const handleTags = async (tag, post) => {
  await Tag.find({ label: tag }, async (err, doc) => {
    if (!!!doc.length) {
      await createNewTag(tag, post);
    } else {
      await addNewPostToTag(doc[0]._id, post);
    }
  });
};

const boundTags = async (tagList, post) => {
  if (!!tagList) {
    for (const tag of tagList) {
      await handleTags(tag, post);
    }
    setTimeout(async () => {
      await addTagsToPost(post._id);
    }, 50);
  }
};

const unboundTag = async (tags, post) => {
  for (const tag of tags) {
    await Tag.findByIdAndUpdate(tag, { $pull: { posts: post } }).exec();
  }
};

const handleImage = async (imgLink) => {
  const uploadResponse = await cloud.uploader.upload(imgLink, {
    upload_preset: "ml_default",
  });
  return uploadResponse.public_id;
};

const destroyImage = async (imgLink) => {
  await cloud.uploader.destroy(imgLink, (err, res) => {
    console.log(err, res);
  });
};

export const PostPageController = () => {
  const createPost = async (req, res) => {
    try {
      const { form, token, tags } = req.body;
      const user = isRealUser(token);
      const genre = await Genre.findOne({ label: form.genre }).exec();
      if (!user || !genre) {
        return res
          .status(403)
          .json({ msg: "Get logged in or choose genre from list" });
      }
      const post = createNewPost(form, user);
      post.save(async (err) => {
        if (err) {
          return res
            .status(400)
            .json({ err, msg: "You're forget about title!" });
        }
        await boundTags(tags, post);
        await boundPost(user, post);
        return res.status(200).json({ msg: "We did it" });
      });
    } catch (e) {
      console.log(e);
      return res
        .status(400)
        .json({ err: e, msg: "Something going wrong in newpost" });
    }
  };

  const createPart = async (req, res) => {
    try {
      const { postId, token, part } = req.body;
      const user = isRealUser(token);
      const author = await isAuthorOfPost(user, postId);
      if (!part.name) {
        return res.status(400).json({ msg: "You're forget about a title!" });
      }
      if (!user || !author) {
        return res.status(403).json({ msg: "Forbidden" });
      }
      let imgLink = "";
      if (!!part.image) {
        imgLink = await handleImage(part.image);
      }
      const newPart = createNewPart(part, postId, imgLink);
      newPart.save(async (err) => {
        if (err) {
          return res.status(400).json({ msg: "You're forget about a title!" });
        }
        await Post.findByIdAndUpdate(postId, {
          $push: { parts: newPart },
        }).exec();
        return res.status(200).json({ msg: "Part was added" });
      });
    } catch (e) {
      console.log("Error in create part");
      console.log(e);
      return res
        .status(400)
        .json({ err: e, msg: "Something going wrong in newpart" });
    }
  };

  const getPost = async (req, res) => {
    try {
      const postId = req.params.postId;
      Post.findById(postId)
        .populate("parts")
        .populate("tags")
        .populate("author")
        .exec((err, doc) => {
          if (err) {
            return res.status(404).json({ msg: "Not Found" });
          }
          const post = getPostData(doc);
          return res.status(200).json(post);
        });
    } catch (e) {
      return res.status(500).json({ msg: "Server error in getpost" });
    }
  };

  const getPart = async (req, res) => {
    try {
      const { postId, partId } = req.params;
      Post.findById(postId, (err, docs) => {
        if (err) {
          console.log("Error - post not found");
          return res.status(400).json({ msg: "Post not found" });
        }
        if (!!docs && !!!docs.parts.includes(partId)) {
          console.log("Error - part not found");
          return res.status(404).json({ msg: "Part not found" });
        }
        Part.findById(partId, (err, part) => {
          return res.status(200).json({ part, parts: docs.parts });
        });
      });
    } catch (e) {
      return res.status(500).json({ msg: "Server error. Check get part" });
    }
  };

  const amendPost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const { form, token, tags } = req.body;
      const user = isRealUser(token);
      const author = await isAuthorOfPost(user, postId);
      const genre = await Genre.findOne({ label: form.genre }).exec();
      if (!form.title) {
        return res.status(400).json({ msg: "You forget about a title!" });
      }
      if (!user || !author) {
        return res.status(403).json({ msg: "Forbidden" });
      }
      if (!genre) {
        return res.status(400).json({ msg: "Choose genre from a list" });
      }
      await Post.findById(postId, (err, doc) => {
        // ? maybe in update
        unboundTag(doc.tags, doc._id);
      });
      await Post.findByIdAndUpdate(
        postId,
        {
          name: form.title,
          synopsis: form.synopsis,
          genre: form.genre,
          tags: [],
          updated: new Date(),
        },
        { new: true },
        async (err, post) => {
          if (err) {
            console.log(err);
            return res.status(400).json({ msg: "Post not found" });
          }
          await boundTags(tags, post._id);
          return res.status(200).json({ msg: "Post was updated" });
        }
      );
    } catch (e) {
      return res.status(500).json({ msg: "Server error. Check amend post" });
    }
  };

  const amendPart = async (req, res) => {
    try {
      const partId = req.params.partId;
      const postId = req.params.postId;
      const { data, prevImg, token } = req.body;
      const user = isRealUser(token);
      const author = await isAuthorOfPost(user, postId);
      console.log(author);

      if (!data.name) {
        return res.status(400).json({ msg: "You're forget about a title" });
      }
      if (!user || !author) {
        return res.status(403).json({ msg: "Forbidden" });
      }
      if (!!prevImg) {
        destroyImage(prevImg);
        data.image = await handleImage(data.image);
      }
      await Part.findByIdAndUpdate(
        partId,
        {
          name: data.name,
          date: new Date(),
          content: data.content,
          image: data.image,
        },
        { new: true },
        (err, part) => {
          if (err) {
            return res.status(400).json({ msg: "Part not found" });
          }
          return res.status(200).json({ msg: "Part was updated" });
        }
      );
    } catch (e) {
      return res.status(500).json({ msg: "Server error. Check amendPart" });
    }
  };

  const deletePost = async (req, res) => {
    try {
      const postId = req.params.postId;
      const { token } = req.body;
      const user = isRealUser(token);
      const author = await isAuthorOfPost(user, postId);
      if (!user || !author) {
        return res.status(403).json({ msg: "Forbidden" });
      }
      await Post.findById(postId, async (err, post) => {
        if (err) {
          console.log(err);
        }
        await deletePostParts(post);
        await unboundPost(post.author, post._id);
        await unboundTag(post.tags, post._id);
        await deleteComment(post.comments);
      });
      await Post.findByIdAndDelete(postId, (err, post) => {
        return res.status(200).json({ msg: "Post was deleted" });
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ msg: "Server error. Check deletePage" });
    }
  };

  const deletePart = async (req, res) => {
    try {
      const { postId, partId } = req.params;
      const { token } = req.body;
      const user = isRealUser(token);
      const author = await isAuthorOfPost(user, postId);
      if (!user || !author) {
        return res.status(403).json({ msg: "Forbidden" });
      }
      Part.findById(partId).exec(async (err, part) => {
        await Post.findByIdAndUpdate(postId, {
          $pull: { parts: partId },
        }).exec();
        !!part.image && destroyImage(part.image);
        await Part.findByIdAndDelete(partId).exec();
      });
    } catch (e) {
      return res.status(500).json({ msg: "Server error. Check deletePart" });
    }
  };

  const uploadComments = async (req, res) => {
    try {
      const { postId } = req.params;
      Comment.find({ post: postId })
        .sort({ publishDate: 1 })
        .populate("author")
        .exec((err, docs) => {
          const result = prettifyComment(docs);
          return res.status(200).json(result);
        });
    } catch (e) {
      return res.status(500).json({ msg: "Server error. Check uploadComms" });
    }
  };

  const addComment = async (req, res) => {
    try {
      const { postId, comment, token } = req.body;
      if (!isRealUser(token)) {
        return res.status(404).json({ msg: "Forbidden" });
      }
      let data = createComment(postId, comment);
      await Post.findByIdAndUpdate(postId, {
        $push: { comments: data },
      }).exec();
      return res.status(200).json({ msg: "Comment was added" });
    } catch (e) {
      return res.status(500).json({ msg: "Server error. Check addComm" });
    }
  };

  const ratePost = async (req, res) => {
    try {
      const { postId, token, rate } = req.body;
      const user = isRealUser(token);
      const post = await Post.findById(postId).exec();
      const raters = getRaters(post.rating);
      if (!user || !SCORES.includes(rate) || raters.includes(user)) {
        return res.status(403).json({ msg: "Forbidden" });
      }
      const isUserInDb = await User.findById(user).exec();
      if (!isUserInDb) {
        return res.status(403).json({ msg: "Forbidden" });
      }
      Post.findByIdAndUpdate(
        postId,
        { $push: { rating: { [user]: rate } } },
        { new: true }
      ).exec((err, doc) => {
        doc.ratingTotal = medium(getRating(doc.rating));
        doc.save();
      });
      return res.status(200).json({ msg: "Rating added" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ msg: "Server error. Check ratePost" });
    }
  };

  const uploadTags = async (req, res) => {
    try {
      await Tag.find({}, (err, tags) => {
        return res.status(200).json(tags);
      });
    } catch (e) {
      return res.status(500).json({ msg: "Server Error. Check uploadTags" });
    }
  };

  const uploadGenres = async (req, res) => {
    try {
      await Genre.find({}, (err, genres) => {
        return res.status(200).json(genres);
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ msg: "Server error. Check uploadGenres" });
    }
  };

  return {
    createPost,
    createPart,
    getPost,
    getPart,
    amendPost,
    amendPart,
    deletePost,
    deletePart,
    uploadComments,
    addComment,
    ratePost,
    uploadTags,
    uploadGenres,
  };
};
