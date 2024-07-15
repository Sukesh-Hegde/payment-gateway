const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { verifyToken } = require("../middlewares/auth");


router.post("/", verifyToken, paymentController.createPayment);

router.post(
  "/:payment_id/process",
  verifyToken,
  paymentController.processPayment
);

router.get("/:payment_id", verifyToken, paymentController.getPaymentStatus);

router.post(
  "/:payment_id/refund",
  verifyToken,
  paymentController.refundPayment
);

module.exports = router;
