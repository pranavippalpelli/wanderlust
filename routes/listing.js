
const express = require("express");
const router = express.Router();

// Import necessary modules
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedin, validateListing,isowner } = require("../middleware.js");
const listingController = require("../controllers/listings.js");


//------------------------------------------------------------------------------------------------------------------------------
// Routes
//------------------------------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------------------------------
// router.route is used to combine same path routes to simplify code

//below two routes are having same path so we combie then as below
// //index route
// router.get("/", wrapAsync(listingController.index));
// // Create Route
// router.post("/", isLoggedin, validateListing, wrapAsync(listingController.createlisting));
//------------------------------------------------------------------------------------------------------------------------------

router.route("/")
.get(wrapAsync(listingController.index))     //index route
.post(isLoggedin, validateListing, wrapAsync(listingController.createlisting));   //create route


// New Route
router.get("/new", isLoggedin,listingController.rendernewform);



router.route("/:id")
.get(wrapAsync(listingController.showlisting))  // Show Route
.put(isLoggedin, isowner, validateListing, wrapAsync(listingController.updatelisting))   //update route
.delete(isLoggedin, isowner, wrapAsync(listingController.destroylisting));   //delete route

// Edit Route
router.get("/:id/edit", isLoggedin, isowner, wrapAsync(listingController.rendereditform));


module.exports = router;










//------------------------------------------------------------------------------------------------------------------------------
//router:
//------------------------------------------------------------------------------------------------------------------------------
//use to simplify app.js
//cut the listing routes and paste here
//get all the nessasary require functions and change paths according to this file
//replace app.get with router.get and router.port etc...
//export it and import in app.js as:  const listing = require("./routes/listing.js")
//use it in app.js as app.use("/listings",listing)
//remove "/listing" path because it is comman in all below paths and is written in app.use("/listings");






  //to check user is autheticated or not
  
  // New Route
  // router.get("/new", (req, res) => {
  //   if(!req.isAuthenticated()){         //used to check the user is authenticated or not
  //     req.flash("error","you must be logged in to create listing");
  //     return res.redirect("/login");
  //   }
  //   console.log(req.user)   //get user details if user is logged in
  //   res.render("listings/new");
  // });

  //this above code is replace or simplified by using middleware defined in middleware.js


  //  //------------------------------------------------------------------------------------------------------------------------------
  // // Update Route:  this is code for authorisation .. this code is replaced using middleware defined in middleware.js and named as isowner
  // //------------------------------------------------------------------------------------------------------------------------------
  // router.put("/:id",isLoggedin, wrapAsync(async (req, res) => {
  //   const { id } = req.params;
  //   const updatedData = req.body.listing;
    
  //   if (typeof updatedData.image === "string") {
  //     updatedData.image = {
  //       filename: "user-uploaded",
  //       url: updatedData.image,
  //     };
  //   }
  //   // we are adding authorization here to protect our update api
  //   let listing = await Listing.findById(id);

  //   if(!listing.owner._id.equals(res.locals.currUser._id)){
  //     req.flash("error","you dont have permission to edit");
  //     return res.redirect(`/listings/${id}`);
  //   }


  //   await Listing.findByIdAndUpdate(id, updatedData);
  //   res.redirect(`/listings/${id}`);
  // }));
  
  























