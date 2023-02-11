const userModel = require("../models/users");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const sendEmail = require("../utils/sendMail");
class User {
  async getAllUser(req, res) {
    try {
      let Users = await userModel
        .find({})
        .populate("allProduct.id", "pName pImages pPrice")
        .populate("user", "name email")
        .sort({ _id: -1 });
      if (Users) {
        return res.json({ Users });
      }
    } catch (err) {
      console.log(err);
    }
  }
  async deleteUser(req, res) {
    try {
      let Users = await userModel
        .findByIdAndDelete(req.body.uId)
      if (Users) {
        return res.json({ Users });
      }
    } catch (err) {
      console.log(err);
    }
  }
  async getAllUserByAdmin(req, res) {
    console.log("hi");
    try {
      let Users = await userModel
        .find({}).select("-password");
      if (Users) {
        return res.json({ Users });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getSingleUser(req, res) {
    let { uId } = req.body;
    if (!uId) {
      return res.json({ error: "All filled must be required" });
    } else {
      try {
        let User = await userModel
          .findById(uId)
          .select("name email phoneNumber userImage updatedAt createdAt");
        if (User) {
          return res.json({ User });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async postAddUser(req, res) {
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
        let newUser = new userModel({
          allProduct,
          user,
          amount,
          transactionId,
          address,
          phone,
        });
        let save = await newUser.save();
        if (save) {
          return res.json({ success: "User created successfully" });
        }
      } catch (err) {
        return res.json({ error: error });
      }
    }
  }

  async postEditUser(req, res) {
    let { uId, name, phoneNumber } = req.body;
    if (!uId || !name || !phoneNumber) {
      return res.json({ message: "All filled must be required" });
    } else {
      let currentUser = userModel.findByIdAndUpdate(uId, {
        name: name,
        phoneNumber: phoneNumber,
        updatedAt: Date.now(),
      });
      currentUser.exec((err, result) => {
        if (err) console.log(err);
        return res.json({ success: "User updated successfully" });
      });
    }
  }

  async getDeleteUser(req, res) {
    let { oId, status } = req.body;
    if (!oId || !status) {
      return res.json({ message: "All filled must be required" });
    } else {
      let currentUser = userModel.findByIdAndUpdate(oId, {
        status: status,
        updatedAt: Date.now(),
      });
      currentUser.exec((err, result) => {
        if (err) console.log(err);
        return res.json({ success: "User updated successfully" });
      });
    }
  }

  async changePassword(req, res) {
    let { uId, oldPassword, newPassword } = req.body;
    if (!uId || !oldPassword || !newPassword) {
      return res.json({ message: "All filled must be required" });
    } else {
      const data = await userModel.findOne({ _id: uId });
      if (!data) {
        return res.json({
          error: "Invalid user",
        });
      } else {
        const oldPassCheck = await bcrypt.compare(oldPassword, data.password);
        if (oldPassCheck) {
          newPassword = bcrypt.hashSync(newPassword, 10);
          let passChange = userModel.findByIdAndUpdate(uId, {
            password: newPassword,
          });
          passChange.exec((err, result) => {
            if (err) console.log(err);
            return res.json({ success: "Password updated successfully" });
          });
        } else {
          return res.json({
            error: "Your old password is wrong!!",
          });
        }
      }
    }
  }
  //forget password
async forgetPassword(req, res, next){
  console.log(req.body);
  const {email} = req.body;
  if(!email){
      return res.json({
        error:"email field is mandatory"
      })
  }
  const user = await userModel.findOne({email});
  if(!user){
      return res.json({
        error:"email is not correct"
      })
  }
  const resetToken = await user.getResetPasswordToken();
  await user.save({validateBeforeSave:false});

  const resetPasswordUrl = `${req.protocol}://${req.hostname}:3000/user/reset-password/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested it please ignore it.`;

  try {
      await sendEmail({
          email:user.email,
          subject:"Financial reset password",
          message,
      })
      res.status(200).json({
          success:true,
          message:`Email sent to ${user.email} successfully`,
      })
  } catch (error) {
      user.resetPasswordExpire= undefined;
      user.resetPasswordToken = undefined;
      await user.save({validateBeforeSave:false});

      return res.json({
        error:error.message
      });
  }

}


//reset password
async resetPassword(req, res, next){
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
  const user = await userModel.findOne({
      resetPasswordToken,
      resetPasswordExpire:{$gt :Date.now()},
  });

  if(!user){
      return res.json({
        error: "Reset password token is invalid or has been expired"
      })
  }
  if(!req.body.password || !req.body.confirmPassword){
      return res.json({
        error:"all fields are required"
      })
  }
  if(req.body.password !== req.body.confirmPassword){
      return res.json({
        error:"password are not matching"
      })
  }

  user.password = bcrypt.hashSync(req.body.password, 10);
  user.resetPasswordExpire= undefined;
  user.resetPasswordToken = undefined;
  await user.save();
  res.status(200).json({
    success:true,
    message:"Password updated successfully"
  })
}
}

const ordersController = new User();
module.exports = ordersController;
