const Listing = require("../models/listing");

//index route
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
}


//new route
module.exports.rendernewform = (req, res) => {
    res.render("listings/new");
}



//show route
module.exports.showlisting = async (req, res) => {
    const { id } = req.params;
  
    // Fetch listing and populate reviews and owner
    const listing = await Listing.findById(id)
    .populate({path:"reviews",
      populate:{                //nested populate method--
        path:"author",
      },
    })
    .populate("owner");   //getting owners data means user data 
  
    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }
  
    res.render("listings/show", { listing });
}



// Create Route
module.exports.createlisting = async (req, res) => {
    const listingData = req.body.listing;
  
    // Handle single image case
    if (typeof listingData.image === "string") {
      listingData.image = {
        filename: "user-uploaded",
        url: listingData.image,
      };
    }
  
    // Set the owner of the new listing
    const newListing = new Listing(listingData);
    newListing.owner = req.user._id;
  
    await newListing.save();
    req.flash("success", "New listing created!");
    res.redirect("/listings");
}




// Edit Route
module.exports.rendereditform = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  res.render("listings/edit", { listing });
}



//update route
module.exports.updatelisting = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body.listing;
  
    // Handle single image case
    if (typeof updatedData.image === "string") {
      updatedData.image = {
        filename: "user-uploaded",
        url: updatedData.image,
      };
    }
  
    const listing = await Listing.findByIdAndUpdate(id, updatedData, { new: true });
  
    if (!listing) {
      req.flash("error", "Failed to update the listing.");
      return res.redirect("/listings");
    }
  
    req.flash("success", "Listing updated successfully!");
    res.redirect(`/listings/${id}`);
}



//Delete Route
module.exports.destroylisting = async (req, res) => {
    const { id } = req.params;
  
    const listing = await Listing.findByIdAndDelete(id);
  
    if (!listing) {
      req.flash("error", "Failed to delete the listing.");
      return res.redirect("/listings");
    }
  
    req.flash("success", "Listing deleted successfully!");
    res.redirect("/listings");
}