import Tag from "../models/Tag.js";

const defaultSort = { ratingTotal: -1 };

export const SearchController = async (req, res) => {
  try {
    const label = req.params.tagLabel;
    const { sort } = req.body;
    await Tag.aggregate([
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
          id: "$_id",
          name: 1,
          synopsis: 1,
          genre: 1,
          updated: 1,
          rating: "$ratingTotal",
          length: { $size: "$parts" },
        },
      },
      { $sort: sort },
    ]).exec((err, result) => {
      if (err) {
        console.log(err);
        return res.status(404).json({ msg: "Not found" });
      }
      return res.status(200).json(result);
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Server error. Check Search" });
  }
};
