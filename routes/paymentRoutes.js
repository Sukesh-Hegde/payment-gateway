const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { verifyToken } = require("../middlewares/auth");

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               amount:
 *                 type: number
 *               currency:
 *                 type: string
 *               payment_method:
 *                 type: string
 *                 enum: [CREDIT_CARD, DEBIT_CARD, DIGITAL_WALLET]
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       500:
 *         description: Internal server error
 */
router.post("/", verifyToken, paymentController.createPayment);

/**
 * @swagger
 * /payments/{payment_id}/process:
 *   post:
 *     summary: Process a payment
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: payment_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment processing initiated
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal server error
 */
router.post(
  "/:payment_id/process",
  verifyToken,
  paymentController.processPayment
);

/**
 * @swagger
 * /payments/{payment_id}:
 *   get:
 *     summary: Retrieve payment status
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: payment_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment status retrieved successfully
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal server error
 */
router.get("/:payment_id", verifyToken, paymentController.getPaymentStatus);

/**
 * @swagger
 * /payments/{payment_id}/refund:
 *   post:
 *     summary: Process a refund
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: payment_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Refund processed successfully
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal server error
 */
router.post(
  "/:payment_id/refund",
  verifyToken,
  paymentController.refundPayment
);

module.exports = router;
