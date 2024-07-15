const Payment = require("../models/payment");
const Transaction = require("../models/transaction");

exports.createPayment = async (req, res) => {
  const { user_id, amount, currency, payment_method } = req.body;

  try {
    const payment = new Payment({ user_id, amount, currency, payment_method });
    await payment.save();

    res.status(201).send({ id: payment._id, status: payment.status });
  } catch (err) {
    res.status(500).send("There was a problem creating the payment.");
  }
};

exports.processPayment = async (req, res) => {
  const { payment_id } = req.params;

  try {
    const payment = await Payment.findById(payment_id);

    if (!payment) {
      return res.status(404).send("Payment not found.");
    }

    payment.status = "PROCESSING";
    await payment.save();

    // Simulate interaction with Payment Provider
    setTimeout(async () => {
      payment.status = "COMPLETED";
      await payment.save();
    }, 2000);

    res.status(200).send({ id: payment._id, status: payment.status });
  } catch (err) {
    res.status(500).send("There was a problem processing the payment.");
  }
};

exports.getPaymentStatus = async (req, res) => {
  const { payment_id } = req.params;

  try {
    const payment = await Payment.findById(payment_id);

    if (!payment) {
      return res.status(404).send("Payment not found.");
    }

    res.status(200).send(payment);
  } catch (err) {
    res.status(500).send("There was a problem retrieving the payment status.");
  }
};

exports.refundPayment = async (req, res) => {
  const { payment_id } = req.params;

  try {
    const payment = await Payment.findById(payment_id);

    if (!payment) {
      return res.status(404).send("Payment not found.");
    }

    payment.status = "REFUNDED";
    await payment.save();

    res.status(200).send({ id: payment._id, status: payment.status });
  } catch (err) {
    res.status(500).send("There was a problem processing the refund.");
  }
};
