import express from "express";
import { SearchController } from "../controllers/SearchController.js";
const router = express.Router();

router.use("/byTag/:tagLabel", SearchController);

export const searchRouter = router;
