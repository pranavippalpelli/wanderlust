const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({}); 
  //inserting user owner from user database with owner objectid for each data/record in listing
  initData.data = initData.data.map((obj) => ({...obj, owner:"678bef43bc75c9dfc380b41e"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
