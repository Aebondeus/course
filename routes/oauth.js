import express from "express";
import passport from "passport";
import User from "../models/User.js";
import passportFacebook from "passport-facebook";
import config from "../config.js"

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

router.get('/auth/facebook',
  passport.authenticate('facebook'));

router.get(
  "/auth/facebook/testapp",
  passport.authenticate("facebook", {
    failureRedirect: "/oauth/login/failed",
    successRedirect:CLIENT_HOME_PAGE}),
  )

export const oauthRouter = router;