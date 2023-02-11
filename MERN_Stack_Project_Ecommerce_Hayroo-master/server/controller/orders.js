const orderModel = require("../models/orders");
const returnModel = require("../models/returnOrder");
const productModel = require("../models/products");
class Order {
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
