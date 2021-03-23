import express from "express";
import mongoose from "mongoose";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import postRouter from "./routes/postPage.js";
import { mainRouter } from "./routes/mainPage.js";
import { authRouter } from "./routes/authPage.js";
import {userRouter} from "./routes/userPage.js"
import { searchRouter } from "./routes/search.js";
import { oauthRouter } from "./routes/oauth.js";
import passport from "passport";
import cookieSession from "cookie-session";//
import cookieParser from "cookie-parser";//
import cors from "cors";

const app = express();
const port = process.env.PORT || 5000;
const dbUri = process.env.MONGODB_URI;
const cookie = process.env.COOKIE_KEY;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json({ extended: true, limit: "50mb" }));

app.use( //
  cookieSession({
    name: "session",
    keys: [cookie],
    maxAge: 24 * 60 * 60 * 100
  })
);
app.use(cookieParser());//
app.use(passport.initialize());//
app.use(passport.session());//

app.use(cors({//
  origin:"mordorcourse.herokuapp.com",
  methods:"GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials:true
}))

app.use("/post", postRouter);
app.use("/main", mainRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/search", searchRouter);
app.use("/oauth", oauthRouter);

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

if (process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  })
}