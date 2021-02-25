import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Tag from "../models/Tag.js";

const router = express.Router();

// try to make one function that handle docsarray

router.use("/ratedposts", async (req, res) => {
  try {
    Post.find({})
      .sort({ rating: "desc" })
      .exec((err, docs) => {
        if (err) {
          throw err;
        }
        const docsarray = [];
        docs.forEach((doc) => {
          const data = {
            name: doc.name,
            synopsis: doc.synopsis,
            rating: doc.rating,
            id:doc._id
          };
          docsarray.push(data);
        });
        return res.status(200).json({ result: docsarray });
      });
  } catch (e) {
    console.log("Erorr in ratedposts");
    res.status(400).status({msg:'Error in ratedposts'})
  }
});

router.use("/updatedposts", async (req, res) => {
  try {
    Post.find({})
      .sort({ updated: -1 })
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
            id:doc._id
          };
          docsarray.push(data);
        });

        return res.status(200).json({ result: docsarray });
      });
  } catch (e) {
    console.log("Error in updatedposts");
    throw e;
  }
});

router.use("/alltags", async (req, res) => {});

export const mainRouter = router;