import express from "express";
import passport from "passport";
import User from "../models/User.js";
import passportFacebook from "passport-facebook";
import passportVkontakte from "passport-vkontakte";
import config from "../config.js"

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
    },
    function (accessToken, refreshToken, profile, cb) {
      const data = User.findOrCreate({
        facebookId: profile.id,
        nickName: profile.displayName,
        login:profile.displayName.toLowerCase()
      }).then((res) => {
        let user = {
          jwtToken: accessToken,
          userId: res.doc._id,
          nickname: profile.displayName,
        };
        cb(null, user);
      });
    }
  )
);

passport.use(new VkontakteStrategy(
  {
    clientID: config.CLIENT_ID_VK,
    clientSecret: config.CLIENT_SECRET_VK,
    callbackURL: "/oauth/auth/vkontakte/mordorcourse"
  },
  function (accessToken, refreshToken, params, profile, cb) {
    console.log(profile, accessToken)
    User.findOrCreate({
      vkId: profile.id,
      nickName: profile.displayName,
      login: profile.displayName.toLowerCase(),
    })
      .then((res) => {
        let user = {
          jwtToken: accessToken,
          userId: res.doc._id,
          nickname: profile.displayName,
        };
        cb(null, user);
      })
      .catch(cb);
  }
));

const router = express.Router();

const CLIENT_HOME_PAGE = "http://localhost:3000";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      sucess:true,
      msg:"user was authenticated",
      user:req.user,
      cookies:req.cookies
    });
  }
})

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success:false,
    message:"user failed to autheticate"
  })
})

router.get("/logout", (req, res) => {
  req.session = null;
  res.clearCookie("session", { path: "/" });
  res.clearCookie("session.sig", { path: "/" });
  res.redirect(CLIENT_HOME_PAGE);
})

router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/vkontakte", passport.authenticate("vkontakte")); 

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