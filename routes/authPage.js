import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import config from "../config.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.use("/register", async (req, res) => {
  try {
    const { login, password, nickname } = req.body;
    const pass = bcrypt.hashSync(password, config.salt);
    const user = new User({
      login: login,
      password: pass,
      nickName: nickname,
      posts: [],
      comments: [],
      isAdmin: false,
    });
    user.save((err) => {
      if (err) {
        if (err.name === "MongoError" && err.code === 11000) {
          return res
            .status(400)
            .json({ msg: "User with this login or nickname already exist" });
        }
      }
      return res.status(200).json({ msg: "User was created" });
    });
  } catch (e) {
    return res
      .status(500)
      .json({ msg: "Server error while register", error: e });
  }
});

router.use("/login", async (req, res) => {
  try {
    const { login, password } = req.body;
    User.findOne({ login }, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Check error handler in login" });
      }
      if (!!!user) {
        return res.status(403).json({ msg: "Wrong login/password" });
      }
      const ispass = bcrypt.compareSync(password, user.password);
      if (!ispass) {
        return res.status(402).json({ msg: "Wrong password/login" });
      }
      const id = user._id;
      const nickname = user.nickName;
      const token = jwt.sign({ login }, config.forToken, {
        expiresIn: "1h",
      });
      return res
        .status(200)
        .json({ msg: "User was authorized!", token, userId: id, nickname });
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ msg: "Troubles with server" });
  }
});

export const authRouter = router;
