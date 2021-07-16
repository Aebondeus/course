import express from "express";
import { PostPageController } from "../controllers/PostPageController.js";

const router = express.Router();
const {
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
} = PostPageController();

router.use("/newpost", createPost);
router.use("/newpart", createPart);
router.route("/post/:postId").get(getPost).put(amendPost).delete(deletePost);
router
  .route("/part/:postId/:partId")
  .get(getPart)
  .put(amendPart)
  .delete(deletePart);
router.use("/add_comm", addComment);
router.use("/rate", ratePost);
router.use("/upload_tags", uploadTags);
router.use("/upload_genres", uploadGenres);
router.use("/upload_comm/:postId", uploadComments);

const postRouter = router;
export default postRouter;
