import express from "express";
import passport from "passport";
import User from "../models/User.js";
import passportFacebook from "passport-facebook";
import passportVkontakte from "passport-vkontakte";
import config from "../config.js";

const VkontakteStrategy = passportVkontakte.Strategy;
const FaceBookStrategy = passportFacebook.Strategy;
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

passport.use(
  new FaceBookStrategy(
    {
      clientID: config.CLIENT_ID_FB,
      clientSecret: config.CLIENT_SECRET_FB,
      callbackURL: "/oauth/auth/facebook/testapp",
      profileFields: ["id", "displayName", "emails"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(profile, accessToken); // delete it
      let user = null;
      const data = await User.findOne({
        email: profile.emails[0].value,
      }).exec();
      if (!data) {
        const newUser = await new User({
          nickName: profile.displayName,
          email: profile.emails[0].value,
          facebookId: profile.id,
        }).save();
        user = {
          jwtToken: accessToken,
          userId: newUser._id,
          nickname: newUser.nickName,
        };
      } else {
        await data.update({ $set: { facebookId: profile.id } }).exec();
        user = {
          jwtToken: accessToken,
          userId: data._id,
          nickname: data.nickName,
        };
      }
      cb(null, user);
    }
  )
);

passport.use(
  new VkontakteStrategy(
    {
      clientID: config.CLIENT_ID_VK,
      clientSecret: config.CLIENT_SECRET_VK,
      callbackURL: "/oauth/auth/vkontakte/mordorcourse",
      profileFields: ["id", "displayName", "emails"],
    },
    async (accessToken, refreshToken, params, profile, cb) => {
      console.log(profile, accessToken); // delete it
      let user = null;
      const data = await User.findOne({
        email: profile.emails[0].value,
      }).exec();
      if (!data) {
        const newUser = await new User({
          nickName: profile.displayName,
          email: profile.emails[0].value,
          vkId: profile.id,
        }).save();
        user = {
          jwtToken: accessToken,
          userId: newUser._id,
          nickname: newUser.nickName,
        };
      } else {
        await data.update({ $set: { vkId: profile.id } }).exec();
        user = {
          jwtToken: accessToken,
          userId: data._id,
          nickname: data.nickName,
        };
      }
      cb(null, user);
    }
  )
);

const router = express.Router();

const CLIENT_HOME_PAGE = "http://localhost:3000/";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      sucess: true,
      msg: "user was authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.json({
      success: true,
      msg: "user wasn't authenticated or sign in with local authorization",
      user: null,
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to autheticate",
  });
});

router.get("/logout", (req, res) => {
  req.session = null;
  res.clearCookie("session", { path: "/" });
  res.clearCookie("session.sig", { path: "/" });
  res.redirect(CLIENT_HOME_PAGE);
});

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  "/auth/vkontakte",
  passport.authenticate("vkontakte", { scope: ["email"] })
);

router.get(
  "/auth/facebook/testapp",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_HOME_PAGE,
    failureRedirect: "/oauth/login/failed",
  })
);

router.get(
  "/auth/vkontakte/mordorcourse",
  passport.authenticate("vkontakte", {
    successRedirect: CLIENT_HOME_PAGE,
    failureRedirect: "/oauth/login/failed",
  })
);
export const oauthRouter = router;
