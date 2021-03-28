import express from "express";
import { MainPageController } from "../controllers/MainPageController.js";

const router = express.Router();
const { getRatedPosts, getUpdatedPosts, getAllTags } = MainPageController();

router.use("/ratedposts", getRatedPosts);
router.use("/updatedposts", getUpdatedPosts);
router.use("/alltags", getAllTags);

export const mainRouter = router;
