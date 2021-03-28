import Post from "../models/Post.js";
import Tag from "../models/Tag.js";

export const MainPageController = () => {
  const getRatedPosts = (req, res) => {
    try {
      Post.find({})
        .sort({ ratingTotal: "desc" })
        .limit(10)
        .exec((err, docs) => {
          if (err) {
            throw err;
          }
          const docsarray = docs.map((doc) => {
            return {
              name: doc.name,
              synopsis: doc.synopsis,
              rating: doc.ratingTotal,
              genre: doc.genre,
              id: doc._id,
              updated: doc.updated.toString(),
            };
          });

          return res.status(200).json(docsarray);
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
        .exec((err, docs) => {
          if (err) {
            throw err;
          }
          const docsarray = docs.map((doc) => {
            return {
              name: doc.name,
              synopsis: doc.synopsis,
              rating: doc.ratingTotal,
              genre: doc.genre,
              id: doc._id,
              updated: doc.updated.toString(),
            };
          });
          return res.status(200).json(docsarray);
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
