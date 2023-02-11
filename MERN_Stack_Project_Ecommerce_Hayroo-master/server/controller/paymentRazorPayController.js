const orderModel = require("../models/orders");
const crypto = require("crypto");
const { json } = require("express");
// import { Payment } from "../models/paymentModel.js";
const RazorPay = require("razorpay");


const instance = new RazorPay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_APT_SECRET,
  });

const razorPayCheckout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};

 const razorPayPaymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
    const orderData = JSON.parse(req.query.orderData);
    const orderDetails = {...orderData, transactionId:razorpay_payment_id};
    let { allProduct, user, amount, transactionId, address, phone } = orderDetails;
    

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_APT_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here

    if (
        !allProduct ||
        !user ||
        !amount ||
        !transactionId ||
        !address ||
        !phone
      ) {
        return res.json({ message: "All filled must be required" });
      } else {
        try {
          let newOrder = new orderModel({
            allProduct,
            user,
            amount,
            transactionId,
            address,
            phone,
          });
          await newOrder.save();
        } catch (err) {
          return res.json({ error: error });
        }
      }

    res.redirect(
      `http://localhost:3000`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

module.exports = {razorPayCheckout,razorPayPaymentVerification }