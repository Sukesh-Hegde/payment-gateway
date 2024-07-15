const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: {
    type: String,
    enum: ["CREATED", "PROCESSING", "COMPLETED", "FAILED", "REFUNDED"],
    default: "CREATED",
  },
  payment_method: {
    type: String,
    enum: ["CREDIT_CARD", "DEBIT_CARD", "DIGITAL_WALLET"],
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", paymentSchema);
