const orderModel = require("../models/orders");
const returnModel = require("../models/returnOrder");
const productModel = require("../models/products");
const sendEmail = require("../utils/sendMail");
const userModel = require("../models/users");
class Order {
  async VerifyEmail(req, res) {
    const {email,user} = req.body;
    if(!email){
      return res.json({
        error:"email field is mandatory"
      })
  }
  const userOrder = await userModel.findById(user);
  if(!user || !userOrder){
      return res.json({
        error:"User is not logged in"
      })
  }

  const random4Digits = Math.floor(1000 + Math.random() * 9000);

  const message = `Your 4 digits OTP is :- \n\n ${random4Digits} \n\n If you have not requested it please ignore it.`;
userOrder.checkoutOtp = random4Digits;
await userOrder.save({validateBeforeSave:false});
  try {
      await sendEmail({
          email:email,
          subject:"Hayroo verify email",
          message,
      })
      res.status(200).json({
          success:true,
          message:`Email sent to ${email} successfully`,
      })
  } catch (error) {
      userOrder.checkoutOtp = undefined;
      await userOrder.save({validateBeforeSave:false});
      return res.json({
        error:error.message
      });
  }
  }

  async otpVerify(req, res, next){
    const {uId,otp} = req.body;
    const user = await userModel.findById(uId);
  
    if(!user){
        return res.json({
          error: "User in not available"
        })
    }
    if(!otp){
        return res.json({
          error:"all fields are required"
        })
    }
    // console.log(user);
    console.log(user, otp);
    if(user.checkoutOtp === Number(otp)){
      user.checkoutOtp= undefined;
    await user.save();
    res.status(200).json({
      success:true,
      message:"OTP verified successfully"
    })
    }else{
      console.log(user, otp);
      user.checkoutOtp= undefined;
      await user.save();
        res.json({
          success:false,
          message:"Otp verification failed"
        })
    }
    
  }
  
  async getAllOrders(req, res) {
    const keyword =req.query.keyword ? {
      transactionId:{
        $regex:req.query.keyword,
        $options: "i"
    }
  }:{};
    try {
      let Orders = await orderModel
        .find({...keyword})
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({ _id: -1 });
      if (Orders) {
        return res.json({ Orders });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getOrderByUser(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let Order = await orderModel
          .find({ user: uId })
          .populate("allProduct.id", "pName pImages pPrice")
          .populate("user", "name email")
          .sort({ _id: -1 });
        if (Order) {
          return res.json({ Order });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postCreateOrder(req, res) {
    let { allProduct, user, amount, transactionId, address, phone } = req.body;
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
        let save = await newOrder.save();
        if (save) {
          return res.json({ success: "Order created successfully" });
        }
      } catch (err) {
        return res.json({ error: error });
      }
    }
  }

  async postUpdateOrder(req, res) {
    let { oId, status,allProduct } = req.body;
    
    if (!oId || !status) {
      return res.json({ message: "All filled must be required" });
    } else {
      if(status === "Cancelled"){
        const prod = await productModel.findById(allProduct[0].id._id);
        prod.pQuantity += allProduct[0].quantitiy;
        await prod.save();
      }
      let currentOrder =  orderModel.findByIdAndUpdate(oId, {
        status: status,
        updatedAt: Date.now(),
      });
      currentOrder.exec((err, result) => {
        if (err) console.log(err);
        return res.json({ success: "Order updated successfully" });
      });
    }
  }
  async postReturnOrder(req, res) {
    let { oId, reason, user } = req.body;
    
    if (!oId || !reason || !user) {
      return res.json({ message: "All filled must be required" });
    } else {
      try {
        let currentReturn =await  returnModel.create({ oId, reason, user:user.uId });
        await currentReturn.save();
          return res.json({ success: "Order created successfully" });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async postDeleteOrder(req, res) {
    let { oId, status, allProduct } = req.body;
    if (!oId) {
      return res.json({ error: "All filled must be required" });
    } else {
      if(status !== "Cancelled"){
        const prod = await productModel.findById(allProduct[0].id._id);
        prod.pQuantity += allProduct[0].quantitiy;
        await prod.save();
      }
      try {
        let deleteOrder = await orderModel.findByIdAndDelete(oId);
        if (deleteOrder) {
          return res.json({ success: "Order deleted successfully" });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
}

const ordersController = new Order();
module.exports = ordersController;
