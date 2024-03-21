require("dotenv").config();

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.once("open", () => console.log("connected to Mongo"));

db.on("error", error => {
  console.log("MongoDB Connection error");
  console.error(error);
});

module.exports = db;