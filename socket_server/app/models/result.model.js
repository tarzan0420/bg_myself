const mongoose = require("mongoose");

const Result = mongoose.model(
  "Result",
  new mongoose.Schema({
    bet_amount: String,
    bet_payout: String,
    bet_result: String,
    is_profit_lost: Boolean,
    created_at: Number
  })
);

module.exports = Result;