import express from "express";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import config from "./config.js";
import postRouter from "./routes/postPage.js";
import { mainRouter } from "./routes/mainPage.js";
import { authRouter } from "./routes/authPage.js";
import {userRouter} from "./routes/userPage.js"
const app = express();
const port = process.env.PORT || 5000;
const dbUri = process.env.MONGODB_URI || config.dbUri;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json({ extended: true }));

app.use("/post", postRouter);
app.use("/main", mainRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter)

const start = async () => {
  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology:true,
      useFindAndModify:false
    });
    app.listen(port, () => console.log(`App on port number ${port}`));
  } catch (e) {
    console.log("Error: ", console.log(e));
    process.exit(1);
  }
};
start();
