const Listing = require("../models/listing.js");
const Review = require("../models/review.js");


//create review route
module.exports.createreview = async (req, res) => {

    let listing = await Listing.findById(req.params.id);   //getting listing by id
    let newreview = new Review(req.body.review);           //getting review content by form in that listing
    newreview.author = req.user._id;         //adding current user to author
    listing.reviews.push(newreview);              //adding this data to listings reviews
    
    await newreview.save();
    await listing.save();                         //saving both collections (models)
    req.flash("success","New Review Created")
    res.redirect(`/listings/${listing._id}`);
}

//delete review route
module.exports.destroyreview = async (req, res) => {
    let {id , reviewid} = req.params;
  
    await Listing.findByIdAndUpdate(id,{$pull : {reviews: reviewid}})  //pull ais like set method which is used to delete and save update
    await Review.findByIdAndDelete(reviewid);
    req.flash("success","Review Deleted")
    res.redirect(`/listings/${id}`);
  
}