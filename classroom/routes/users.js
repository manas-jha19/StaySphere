const express  = require("express");
const router = express.Router();

//User Index Route
router.get("/",(req,res)=>{
    res.send("THis is the user route");
});

//User show post 
router.get("/:id",(req,res)=>{
    res.send("This is the show user id route");
});

//user post route
router.post("/",(req,res)=>{
    res.send("This is the post route");
});


// user Delete
router.delete("/:id",(req,res)=>{
    res.send("this is the delte route of the delete routes ")
});

module.exports  = router;