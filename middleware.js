const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const { listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const { reviewSchema } = require("./schema.js");


module.exports.isLoggedin = (req,res,next) =>{
    if(!req.isAuthenticated()){         //used to check the user is authenticated or not
      req.session.redirectUrl = req.originalUrl;    //original url give original url used for post-login page
      req.flash("error","you must be logged in to create listing");
      return res.redirect("/login");
    }
    next();
};




//middleware for post-login and pass this in user.js login route
module.exports.saveredirecturl = (req,res,next) =>{
if(!req.session.redirectUrl){
  res.locals.redirectUrl = req.session.redirectUrl;
}
next();
};






// Middleware for error control
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errorMsg = error.details.map((e1) => e1.message).join(","); // Show only messages
    throw new ExpressError(400, errorMsg);
  } else {
    next();
  }
};



//middleware for db error control
module.exports.validateReviews = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
      let errorMsg = error.details.map((e1) => e1.message).join(","); // Show only messages
      throw new ExpressError(400, errorMsg);
    } else {
      next();
    }
 };




// Middleware to check if the user is the owner of the listing
//middleware for authorisation and passed in listing.js
module.exports.isowner = async (req, res, next) => {
  const { id } = req.params;
   // we are adding authorization here to protect our update api
  // Fetch the listing and populate the owner field
  const listing = await Listing.findById(id).populate("owner");

  // Check if the listing exists
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  // Authorization check
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission to perform this action.");
    return res.redirect("/listings");
  }

  // Allow the user to proceed
  next();
};

  



// Middleware to check if the user is the owner of the listing
module.exports.isauthor = async (req, res, next) => {
  const { id,reviewid } = req.params;
  const review = await Review.findById(reviewid);
  // Authorization check
  if (!review.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You don't have permission to perform this action.");
    return res.redirect(`/listings/${id}`);
  }

  // Allow the user to proceed
  next();
};


