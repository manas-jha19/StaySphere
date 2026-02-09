const listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const MapboxToken = process.env.MAPBOX_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: MapboxToken });


module.exports.index = async (req, res) => {
    try {
        const { q, category } = req.query;
        const filter = {};
        if (q) {
            filter.$or = [
                { title: { $regex: q, $options: "i" } },
                { location: { $regex: q, $options: "i" } },
                { country: { $regex: q, $options: "i" } },
                { category: { $regex: q, $options: "i" } }
            ];

        }

        if (category) {
            filter.category = category;

        }

        let storelistings = await listing.find(filter);

        return res.render("listings/index.ejs", { storelistings });
    }
    catch (err) {
        console.log(err);
        req.flash("error", "Something went wrong!");
        return res.redirect("/listings");
    }
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};


module.exports.createListings = async (req, res, next) => {
  let response = await geocodingClient.forwardGeocode({
  query: req.body.listing.location ,
  limit: 1
})
  .send()



    let url = req.file.path;
    let filename = req.file.filename;
    console.log(req.user);
    let newListing = new listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };

    newListing.geometry = response.body.features[0].geometry;

    await newListing.save()
    console.log(newListing);
    req.flash("success", "New listing created !"); // flash message
    res.redirect("/listings");

};

module.exports.showListings = async (req, res) => {
    let { id } = req.params;
    let showall = await listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!showall) {
        req.flash("error", "Listing you requested does not exist!");  // error 
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { showall });
};

module.exports.renderUpdateListing = async (req, res) => {
    let { id } = req.params;
    let editlisting = await listing.findById(id);
    if (!editlisting) {
        req.flash("error", "Listing you requested does not exist!");
        return res.redirect("/listings");
    }
    let originalListingUrl = editlisting.image.url;
    originalListingUrl = originalListingUrl.replace("/upload", "/upload/h_140,w_110");
    res.render("listings/edit.ejs", { editlisting, originalListingUrl });
};

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let ulisting = await listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        ulisting.image = { url, filename };
        await ulisting.save();
    }
    req.flash("success", "Update listing !"); // flash message

    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let deletelisting = await listing.findByIdAndDelete(id);
    req.flash("error", "Listing deleted !") // flash delete
    res.redirect("/listings");
};

