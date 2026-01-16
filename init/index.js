const mongoose = require('mongoose');
const initdata = require("./data.js");
const listing = require("../models/listing.js");

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

const initDB = async () =>{
  await listing.deleteMany({});
  listing.insertMany(initdata.data);
  console.log("successfully");
};
initDB();
