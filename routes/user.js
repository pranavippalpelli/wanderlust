const express = require("express");
const router = express.Router();
const user = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveredirecturl } = require("../middleware");
const usercontroller = require("../controllers/user");

//------------------------------------------------------------------------------------------------------------------------------
//signup route
//------------------------------------------------------------------------------------------------------------------------------
//getting form
router.get("/signup",usercontroller.rendersignupform);

//posting form data 
router.post("/signup", wrapAsync(usercontroller.signup));


//------------------------------------------------------------------------------------------------------------------------------
//login route
//------------------------------------------------------------------------------------------------------------------------------
router.get("/login", usercontroller.renderloginform);


//authenticate and there paramerts are get from documentation
router.post("/login",saveredirecturl, passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}), usercontroller.login);


//------------------------------------------------------------------------------------------------------------------------------
//logout
//------------------------------------------------------------------------------------------------------------------------------
router.get("/logout",usercontroller.logout);


module.exports = router;