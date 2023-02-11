const express = require("express");
const router = express.Router();
const {razorPayCheckout, razorPayPaymentVerification} = require("../controller/paymentRazorPayController");

router.route("/razorPayCheckout").post(razorPayCheckout);

router.route("/razorPayPaymentVerification").post(razorPayPaymentVerification);

module.exports = router;