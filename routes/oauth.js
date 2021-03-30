import express from "express";
import passport from "passport";
import User from "../models/User.js";
import passportFacebook from "passport-facebook";
import passportVkontakte from "passport-vkontakte";
import passportYandex from "passport-yandex";
import passportGoogle from "passport-google-oauth";
import jwt from "jsonwebtoken";

const VkontakteStrategy = passportVkontakte.Strategy;
const FaceBookStrategy = passportFacebook.Strategy;
const YandexStrategy = passportYandex.Strategy;
const GoogleStrategy = passportGoogle.OAuth2Strategy;

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

passport.use(
  // probably will be deleted
  new FaceBookStrategy(
    {
      clientID: process.env.CLIENT_ID_FB,
      clientSecret: process.env.CLIENT_SECRET_FB,
      callbackURL: "/oauth/auth/facebook/testapp",
      profileFields: ["id", "displayName", "emails"],
    },
    async (accessToken, refreshToken, profile, cb) => {
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
          jwtToken: jwt.sign(
            { id: newUser._id, nickname: newUser.nickName },
            process.env.FOR_TOKEN,
            { expiresIn: "1h" }
          ),
        };
      } else {
        await data.update({ $set: { facebookId: profile.id } }).exec();
        user = {
          jwtToken: jwt.sign(
            { id: data._id, nickname: data.nickName },
            process.env.FOR_TOKEN,
            {
              expiresIn: "1h",
            }
          ),
        };
      }
      cb(null, user);
    }
  )
);

passport.use(
  new YandexStrategy(
    {
      clientID: process.env.CLIENT_ID_YA,
      clientSecret: process.env.CLIENT_SECRET_YA,
      callbackURL: "/oauth/auth/yandex/mordorcourse",
      profileFields: ["id", "displayName", "emails"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      let user = null;
      const data = await User.findOne({
        email: profile.emails[0].value,
      }).exec();
      if (!data) {
        const newUser = await new User({
          nickName: profile.displayName,
          email: profile.emails[0].value,
          yandexId: profile.id,
        }).save();
        user = {
          jwtToken: jwt.sign(
            { id: newUser._id, nickname: newUser.nickName },
            process.env.FOR_TOKEN,
            {
              expiresIn: "1h",
            }
          ),
        };
      } else {
        await data.update({ $set: { yandexId: profile.id } }).exec();
        user = {
          jwtToken: jwt.sign(
            { id: data._id, nickname: data.nickName },
            process.env.FOR_TOKEN,
            {
              expiresIn: "1h",
            }
          ),
        };
      }
      cb(null, user);
    }
  )
);

passport.use(
  new VkontakteStrategy(
    {
      clientID: process.env.CLIENT_ID_VK,
      clientSecret: process.env.CLIENT_SECRET_VK,
      callbackURL: "/oauth/auth/vkontakte/mordorcourse",
      profileFields: ["id", "displayName", "emails"],
    },
    async (accessToken, refreshToken, params, profile, cb) => {
      console.log(profile);
      let user = null;
      let data = null;
      const email = !!profile.emails && profile.emails[0].value;
      if (!email) {
        data = await User.findOrCreate({
          vkId: profile.id
        })
        console.log(data);
      } else {
        data = await User.findOrCreate({ email: email, vkId: profile.id });
        console.log(data);
      }
      const res = await User.findOneAndUpdate(
        { vkid: data.vkId },
        {
          $set: {
            nickName: !!data.doc.nickName
              ? data.doc.nickName
              : profile.displayName,
          },
        }
      ).exec();
      user = {
        jwtToken: jwt.sign(
          { id: res._id, nickname: res.nickName },
          process.env.FOR_TOKEN,
          { expiresIn: "1h" }
        ),
      };
      cb(null, user);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID_GOOGLE,
      clientSecret: process.env.CLIENT_SECRET_GOOGLE,
      callbackURL: "/oauth/auth/google/mordorcourse",
      profileFields: ["id", "displayName", "emails"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      let user = null;
      const data = await User.findOne({
        email: profile.emails[0].value,
      }).exec();
      if (!data) {
        const newUser = await new User({
          nickName: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        }).save();
        user = {
          jwtToken: jwt.sign(
            { id: newUser._id, nickname: newUser.nickName },
            process.env.FOR_TOKEN,
            {
              expiresIn: "1h",
            }
          ),
        };
      } else {
        await data.update({ $set: { googleId: profile.id } }).exec();
        user = {
          jwtToken: jwt.sign(
            { id: data._id, nickname: data.nickName },
            process.env.FOR_TOKEN,
            {
              expiresIn: "1h",
            }
          ),
        };
      }
      cb(null, user);
    }
  )
);

const router = express.Router();

const CLIENT_HOME_PAGE =
  process.env.CLIENT_HOME_PAGE || "http://localhost:3000/";

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

router.get("/auth/yandex", passport.authenticate("yandex"));

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "email"],
  })
);

router.get(
  "/auth/facebook/testapp",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_HOME_PAGE,
    failureRedirect: "/oauth/login/failed",
  })
);

router.get(
  "/auth/yandex/mordorcourse",
  passport.authenticate("yandex", {
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

router.get(
  "/auth/google/mordorcourse",
  passport.authenticate("google", {
    successRedirect: CLIENT_HOME_PAGE,
    failureRedirect: "/oauth/login/failed",
  })
);
export const oauthRouter = router;
