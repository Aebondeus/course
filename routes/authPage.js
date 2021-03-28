import express from "express";
import { AuthPageController } from "../controllers/AuthPageController.js";

const { registerUser, loginUser } = AuthPageController();
const router = express.Router();

router.use("/register", registerUser);
router.use("/login", loginUser);

export const authRouter = router;
