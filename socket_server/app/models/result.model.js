const mongoose = require("mongoose");

const Result = mongoose.model(
  "Result",
  new mongoose.Schema({
    bet_result: String,
    created_at: Number
  })
);

module.exports = Result;