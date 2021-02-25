import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import config from "../config.js";

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
      isAdmin: false,
    });
    user.save((err) => {
      if (err) {
        if (err.name === "MongoError" && err.code === 11000) {
          return res
            .status(400)
            .json({ msg: "User with such login or nickname already exist" });
        }
      }
      return res.status(200).json({ msg: "User was created" });
    });
  } catch (e) {
    console.log(e);
    return res
      .status(500)
      .json({ msg: "Server error while register", error: e });
  }
});

router.use("/login", async (req, res) => {});

export const authRouter = router;
