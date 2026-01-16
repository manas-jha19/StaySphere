const mongoose = require("mongoose");
const schema = mongoose.Schema;

const listingSchema = new schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
       
        
    },
    image:{
        filename:{
            type:String,
            default:"istingimage"
        },
        url:{
            type:String,
        default:"https://images.unsplash.com/photo-1656265327059-2f06a2e26db7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) => v ==="" ? "https://images.unsplash.com/photo-1656265327059-2f06a2e26db7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" :v,
        },
    },
    price:{
        type:Number,
       default :0,
        
    },
    location:{
        type:String,
     
    },
    country:{
        type:String,
       
    },
});

const listing = mongoose.model("listing",listingSchema);
module.exports = listing; 