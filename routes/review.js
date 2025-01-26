const express = require("express");
const router = express.Router({mergeParams:true});
//here we write megaparms:true because app.js not send id to routes
//if req is:  /listing/:id/reviews. then by using {megaparams:true} only we can get id into router and review.js file

const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const{validateReviews,isLoggedin,isauthor} = require("../middleware.js");
const reviewcontroller = require("../controllers/reviews.js")




//create review route
router.post("/",validateReviews, isLoggedin, wrapAsync(reviewcontroller.createreview));
    
//delete review route 
router.delete("/:reviewid",isLoggedin,isauthor,wrapAsync(reviewcontroller.destroyreview));   

//------------------------------------------------------------------------------------------------------------------------------
//anyone can insert reviews on listing but only author of that review can delete their review 
//so we need authorisation and we did it in middleware function above named as is author and passed in it
//for deleting review
//------------------------------------------------------------------------------------------------------------------------------


 

 module.exports = router;