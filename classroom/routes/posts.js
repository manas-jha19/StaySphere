const express = require("express");
const router = express.Router();

//Posts
// Index route
router.get("/",(req,res)=>{
    res.send("THis is the index route");
});

// Posts show routes 
router.get("/:id",(req,res)=>{
    res.send("This is the show Post Route");
});

// posts post routes
router.post("/",(req,res)=>{
    res.send("This is the posts Post routes");
});

// Posts delete routes
router.delete("/:id",(req,res)=>{
    res.send("Post delete routes");
});

module.exports = router;