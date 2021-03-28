import express from "express";
import { UserPageController } from "../controllers/UserPageController.js";

const router = express.Router();
const {
  getUser,
  getData,
  updateNickname,
  updateAbout,
  sortPosts,
} = UserPageController();

router.use("/user_posts/:userId", getUser);
router.use("/get_data/:userId", getData);
router.use("/update_nickname", updateNickname);
router.use("/update_about", updateAbout);
router.use("/sort", sortPosts);

export const userRouter = router;
