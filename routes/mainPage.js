import express from "express";
import Post from "../models/Post.js";
import Tag from "../models/Tag.js";

const router = express.Router();

router.use("/ratedposts", (req, res) => {
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
            genre:doc.genre,
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
});

router.use("/updatedposts", (req, res) => {
  try {
    Post.find({})
      .sort({ updated: -1 })
      .limit(10)
      .exec((err, docs) => {
        if (err) {
          throw err;
        }
        const docsarray = [];
        docs.forEach((doc) => {
          const data = {
            name: doc.name,
            synopsis: doc.synopsis,
            updated: doc.updated.toString(),
            genre:doc.genre,
            rating: doc.ratingTotal,
            id: doc._id,
          };
          docsarray.push(data);
        });
        return res.status(200).json(docsarray);
      });
  } catch (e) {
    console.log("Error in updatedposts");
    throw e;
  }
});

router.use("/alltags", async (req, res) => {
  Tag.find({})
    .select("label posts")
    .exec((err, docs) => {
      return res.status(200).json(docs);
    });
});

export const mainRouter = router;
