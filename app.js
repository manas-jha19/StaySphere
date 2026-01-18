const express = require('express');
const app = express();
const mongoose = require('mongoose');
const listing = require("./models/listing.js");
const path = require('path');
const { title } = require('process');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const WrapAsync = require("./utils/WrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const review = require("./models/reviews.js");



const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
main()
.then((res)=>{
    console.log("db connected");
})
.catch((err)=>{
    console.log("something wrong in db");
})
async function main() {
    mongoose.connect(mongo_url);
};

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);


// Validation for Schema

const  validationListing = (req,res,next)=>{
   let {error} = listingSchema.validate(req.body);
   if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
   }else{
    next();
   }
};

app.get("/",(req,res)=>{
    res.send("I am root");
});

//index route
app.get("/listings",WrapAsync(async(req,res)=>{
   const storelistings = await listing.find();
   res.render("listings/index.ejs",{storelistings});
}));

//Create new route
app.get("/listings/new/",(req,res)=>{
    res.render("listings/new.ejs");
});

app.post("/listings",validationListing,WrapAsync(async(req,res,next)=>{
    

    let newListing = new listing(req.body.listing);
    await newListing.save()
    // console.log(newListing);
    res.redirect("/listings");
    
}));


//Show route
app.get("/listings/:id",WrapAsync(async(req,res)=>{
    let {id} = req.params;
    let showall = await listing.findById(id).populate("reviews");
    console.log(showall);
    res.render("listings/show.ejs",{showall});
}));



//Update & edit routes
app.get("/listings/:id/edit",WrapAsync(async(req,res)=>{
    let {id} = req.params;
     let editlisting = await listing.findById(id);
    res.render("listings/edit.ejs",{editlisting});
}));

app.put("/listings/:id",validationListing,WrapAsync(async(req,res)=>{
        let {id} = req.params;
        
     let ulisting = await listing.findByIdAndUpdate(id,{...req.body.listing});
     
     res.redirect(`/listings/${id}`);
}));

//Delete Route
app.delete("/listings/:id",WrapAsync(async(req,res)=>{
    let {id} = req.params;
    let deletelisting = await listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

// validation for review
const  validationreview = (req,res,next)=>{
   let {error} = reviewSchema.validate(req.body);
   if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
   }else{
    next();
   }
};

//Create review route
// post request

app.post("/listings/:id/reviews",validationreview,WrapAsync(async(req,res)=>{
   let listingDoc = await listing.findById(req.params.id);
    let newReview = new review (req.body.review);

    listingDoc.reviews.push(newReview);
    await newReview.save();
    await listingDoc.save();

    console.log("save review");
    res.redirect(`/listings/${listingDoc._id}`);
}));

// Delete reviews route

app.delete("/listings/:id/reviews/:reviewId",WrapAsync(async(req,res)=>{
    let{id,reviewId} = req.params;

    await listing.findByIdAndUpdate(id,{$pull: {reviews : reviewId}});
    await review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);

}));

// app.get("/listingtest",async(req,res)=>{
    // let samplelisting = new Listing(
    //     {
    //         title:"home vila",
    //         description:"2 bhk flat",
    //         price:5000,
    //         location:"katra jammu & kashmir",
    //         country:"india",
    //     });
    //     await samplelisting.save()
    // console.log("saved ");
    // res.send(samplelisting);
// });




// Middleware

app.use((req,res,next)=>{
   next(new ExpressError(404,"Page not Found!"));
});

app.use((err,req,res,next)=>{
    let{statusCode=500 , message="Something went wrong"} = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("listings/error.ejs",{message});
});

// app.use((err,req,res,next)=>{
//     res.send("Something went wrong");
// });

app.listen(8080,()=>{
    console.log("Port listening:",8080);
});