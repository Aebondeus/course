import express from "express";
import passport from "passport";
import User from "../models/User.js";
import passportFacebook from "passport-facebook";
import passportVkontakte from "passport-vkontakte";
import passportYandex from "passport-yandex";
import passportGoogle from "passport-google-oauth";
import jwt from "jsonwebtoken";

import { config } from "../config.js";
import { oauthRoutes } from "../constants/routes.js";

const VkontakteStrategy = passportVkontakte.Strategy;
const FaceBookStrategy = passportFacebook.Strategy;
const YandexStrategy = passportYandex.Strategy;
const GoogleStrategy = passportGoogle.OAuth2Strategy;

const profileFields = ["id", "displayName", "emails"];

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
      clientID: process.env.CLIENT_ID_FB || config.CLIENT_ID_FB,
      clientSecret: process.env.CLIENT_SECRET_FB || config.CLIENT_SECRET_FB,
      callbackURL: oauthRoutes.facebookCbUrl,
      profileFields: profileFields,
    },
    async (accessToken, refreshToken, profile, cb) => {
      const data = await User.findOrCreate({
        email: profile.emails[0].value,
        facebookId: profile.id,
      });
      const res = await User.findOneAndUpdate(
        { facebookId: data.doc.facebookId },
        {
          $set: {
            nickName: !!data.doc.nickName
              ? data.doc.nickName
              : profile.displayName,
          },
        },
        { new: true }
      ).exec();
      const user = {
        jwtToken: jwt.sign(
          { id: res._id, nickname: res.nickName },
          process.env.FOR_TOKEN || config.FOR_TOKEN,
          { expiresIn: "1h" }
        ),
      };
      cb(null, user);
    }
  )
);

passport.use(
  new YandexStrategy(
    {
      clientID: process.env.CLIENT_ID_YA || config.CLIENT_ID_YA,
      clientSecret: process.env.CLIENT_SECRET_YA || config.CLIENT_SECRET_YA,
      callbackURL: oauthRoutes.yandexCbUrl,
      profileFields: profileFields,
    },
    async (accessToken, refreshToken, profile, cb) => {
      const data = await User.findOrCreate({
        email: profile.emails[0].value,
        yandexId: profile.id,
      });
      const res = await User.findOneAndUpdate(
        { yandexId: data.doc.yandexId },
        {
          $set: {
            nickName: !!data.doc.nickName
              ? data.doc.nickName
              : profile.displayName,
          },
        },
        { new: true }
      ).exec();
      const user = {
        jwtToken: jwt.sign(
          { id: res._id, nickname: res.nickName },
          process.env.FOR_TOKEN || config.FOR_TOKEN,
          { expiresIn: "1h" }
        ),
      };
      cb(null, user);
    }
  )
);

passport.use(
  new VkontakteStrategy(
    {
      clientID: process.env.CLIENT_ID_VK || config.CLIENT_ID_VK,
      clientSecret: process.env.CLIENT_SECRET_VK || config.CLIENT_SECRET_VK,
      callbackURL: oauthRoutes.vkontakteCbUrl,
      profileFields: profileFields,
    },
    async (accessToken, refreshToken, params, profile, cb) => {
      let data = null;
      const email = !!profile.emails && profile.emails[0].value;
      if (!email) {
        data = await User.findOrCreate({
          vkId: profile.id,
        });
      } else {
        data = await User.findOrCreate({ email: email, vkId: profile.id });
      }
      const res = await User.findOneAndUpdate(
        { vkId: data.doc.vkId },
        {
          $set: {
            nickName: !!data.doc.nickName
              ? data.doc.nickName
              : profile.displayName,
          },
        },
        { new: true }
      ).exec();
      const user = {
        jwtToken: jwt.sign(
          { id: res._id, nickname: res.nickName },
          process.env.FOR_TOKEN || config.FOR_TOKEN,
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
      clientID: process.env.CLIENT_ID_GOOGLE || config.CLIENT_ID_GOOGLE,
      clientSecret:
        process.env.CLIENT_SECRET_GOOGLE || config.CLIENT_SECRET_GOOGLE,
      callbackURL: oauthRoutes.googleCbUrl,
      profileFields: profileFields,
    },
    async (accessToken, refreshToken, profile, cb) => {
      const data = await User.findOrCreate({
        email: profile.emails[0].value,
        googleId: profile.id,
      });
      const res = await User.findOneAndUpdate(
        { googleId: data.doc.googleId },
        {
          $set: {
            nickName: !!data.doc.nickName
              ? data.doc.nickName
              : profile.displayName,
          },
        },
        { new: true }
      ).exec();
      const user = {
        jwtToken: jwt.sign(
          { id: res._id, nickname: res.nickName },
          process.env.FOR_TOKEN || config.FOR_TOKEN,
          { expiresIn: "1h" }
        ),
      };
      cb(null, user);
    }
  )
);

const router = express.Router();

const CLIENT_HOME_PAGE =
  process.env.CLIENT_HOME_PAGE || "http://localhost:3000/";

router.get(oauthRoutes.success, (req, res) => {
  if (!!req.session.passport) {
    // maybe req.user will be
    return res.json({
      sucess: true,
      msg: "user was authenticated",
      user: req.user,
    });
  }
  return res.json({
    success: true,
    msg: "user wasn't authenticated or sign in with local authorization",
    user: null,
  });
});

router.get(oauthRoutes.failure, (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to autheticate",
  });
});

router.get(oauthRoutes.logout, (req, res) => {
  req.session = null;
  req.user = null;
  res.clearCookie("session", { path: "/" });
  res.clearCookie("session.sig", { path: "/" });
  res.redirect(CLIENT_HOME_PAGE); // probably will be removed
});

router.get(
  oauthRoutes.facebookUrl,
  passport.authenticate("facebook", { scope: ["email"] })
);
router.get(
  oauthRoutes.vkontakteUrl,
  passport.authenticate("vkontakte", { scope: ["email"] })
);

router.get(oauthRoutes.yandexUrl, passport.authenticate("yandex"));

router.get(
  oauthRoutes.googleUrl,
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login", "email"],
  })
);

router.get(
  oauthRoutes.facebookApp,
  passport.authenticate("facebook", {
    successRedirect: CLIENT_HOME_PAGE,
    failureRedirect: oauthRoutes.failureOauth,
  })
);

router.get(
  oauthRoutes.yandexApp,
  passport.authenticate("yandex", {
    successRedirect: CLIENT_HOME_PAGE,
    failureRedirect: oauthRoutes.failureOauth,
  })
);

router.get(
  oauthRoutes.vkontakteApp,
  passport.authenticate("vkontakte", {
    successRedirect: CLIENT_HOME_PAGE,
    failureRedirect: oauthRoutes.failureOauth,
  })
);

router.get(
  oauthRoutes.googleApp,
  passport.authenticate("google", {
    successRedirect: CLIENT_HOME_PAGE,
    failureRedirect: oauthRoutes.failureOauth,
  })
);
export const oauthRouter = router;
