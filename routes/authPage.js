import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
const router = express.Router();
const forToken = "DOITSUNOKAGAKUWASEKAIICHI"
const salt = 15;
router.use("/register", async (req, res) => {
  try {
    const { email, password, nickname } = req.body;
    const pass = bcrypt.hashSync(password, salt);
    const user = new User({
      email:email.toLowerCase(),
      password: pass,
      nickName: nickname,
    });
    user.save((err) => {
      if (err) {
        console.log(err);
        if (err.name === "MongoError" && err.code === 11000) {
          return res
            .status(400)
            .json({ msg: "User with this email already exist" });
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
    const { email, password } = req.body;
    User.findOne({ email:email.toLowerCase() }, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Check error handler in email" });
      }
      if (!!!user) {
        return res.status(403).json({ msg: "Wrong email/password" });
      }
      const ispass = bcrypt.compareSync(password, user.password);
      if (!ispass) {
        return res.status(402).json({ msg: "Wrong email/password" });
      }
      const id = user._id;
      const nickname = user.nickName;
      const token = jwt.sign({ email }, forToken, {
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
