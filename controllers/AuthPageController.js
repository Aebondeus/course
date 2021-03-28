import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const AuthPageController = () => {
  const registerUser = async (req, res) => {
    try {
      const { email, password, nickname } = req.body;
      const pass = bcrypt.hashSync(password, Number(process.env.SALT));
      const user = new User({
        email: email.toLowerCase(),
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
      console.log(e);
      return res
        .status(500)
        .json({ msg: "Server error while register", error: e });
    }
  };

  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
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
        console.log(process.env.FOR_TOKEN);
        const id = user._id;
        const nickname = user.nickName;
        const token = jwt.sign(
          { id, nickname },
          process.env.FOR_TOKEN,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).json({ msg: "User was authorized!", token });
      });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ msg: "Troubles with server" });
    }
  };

  return { registerUser, loginUser };
};
