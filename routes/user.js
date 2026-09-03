const express = require("express");
const router = express.Router();
const User = require("../models/user");
const asyncWrap = require("../utils/asyncWrap");
const passport = require("passport");
const { saveRedirect } = require("../authMiddleware");
const userController = require("../controllers/users");

router
  .route("/signup")
  .get(userController.loadSignUp)
  .post(asyncWrap(userController.signup));

// When you use passport.authenticate() with failureFlash: true, it automatically sets up a flash message for errors, even if you don't manually call req.flash() yourself.
router
  .route("/login")
  .get(userController.loadLogIn)
  .post(
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    saveRedirect, // {{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{    Ensure this middleware is applied before redirect     }}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}
    userController.logIn,
  );

router.get("/logout", userController.logOut);

module.exports = router;
