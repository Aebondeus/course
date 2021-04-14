import Post from "../models/Post.js";
import Tag from "../models/Tag.js";

const prettifyPosts = async (postsList) => {
  return postsList.map((post) => {
    return {
      name: post.name,
      synopsis: post.synopsis,
      rating: post.ratingTotal,
      genre: post.genre,
      id: post._id,
      updated: post.updated.toString(),
    };
  });
};

export const MainPageController = () => {
  const getRatedPosts = (req, res) => {
    try {
      Post.find({})
        .sort({ ratingTotal: "desc" })
        .limit(10)
        .exec(async (err, docs) => {
          if (err) {
            throw err;
          }
          const posts = await prettifyPosts(docs);
          return res.status(200).json(posts);
        });
    } catch (e) {
      console.log("Erorr in ratedposts");
      res.status(400).status({ msg: "Error in ratedposts" });
    }
  };

  const getUpdatedPosts = (req, res) => {
    try {
      Post.find({})
        .sort({ updated: -1 })
        .limit(10)
        .exec(async (err, docs) => {
          if (err) {
            throw err;
          }
          const posts = await prettifyPosts(docs);
          return res.status(200).json(posts);
        });
    } catch (e) {
      console.log("Error in updatedposts");
      throw e;
    }
  };

  const getAllTags = (req, res) => {
    Tag.find({})
      .select("label posts")
      .exec((err, docs) => {
        return res.status(200).json(docs);
      });
  };

  return { getRatedPosts, getUpdatedPosts, getAllTags };
};
