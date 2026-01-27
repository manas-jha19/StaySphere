const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const WrapAsync = require("../utils/WrapAsync.js");
const passport = require("passport");
const { storeRedirectUrl } = require("../middleware.js");
const userController = require("../controller/user.js");

router.route("/signup")
.get(userController.renderSignupForm)
.post(WrapAsync(userController.SignUpUser));

router.route("/login")
.get(userController.renderLoginForm)
.post(storeRedirectUrl,passport.authenticate("local",{failureRedirect: "/login",failureFlash:true}),userController.loginUser);

router.route("/logout")
.get(userController.logoutUser);

module.exports = router;