import express from "express";
import Tag from "../models/Tag.js";
const router = express.Router();

const defaultSort = { ratingTotal: -1 };

const prettifyPost = (post) => {
  const data = {
    name: post.name,
    synopsis: post.synopsis,
    id: post._id,
    genre: post.genre,
    rating: post.ratingTotal,
    updated: post.updated,
  };
  return data;
};

router.use("/byTag/:tagLabel", async (req, res) => {
  const label = req.params.tagLabel;
  const { sort } = req.body;
  Tag.aggregate([
    { $match: { label: label } },
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "tags",
        as: "posts",
      },
    },
    { $unwind: "$posts" },
    { $replaceRoot: { newRoot: "$posts" } },
    {
      $project: {
        id:"$_id",
        name: 1,
        synopsis: 1,
        genre: 1,
        updated: 1,
        rating:"$ratingTotal",
        length: { $size: "$parts" }
      }
    },
    { $sort: sort },
  ]).exec((err, result) => {
    if (err){
      console.log(err);
      return res.status(404).json({msg:"Not found"})
    }
    return res.status(200).json(result);
  });
});

export const searchRouter = router;
