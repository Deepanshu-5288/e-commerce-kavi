const mongoose = require("mongoose");
const crypto = require("crypto");
const findOrCreate = require('mongoose-findorcreate');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: function() { return this.googleId === undefined ; },
      maxlength: 32,
    },
    email: {
      type: String,
      required: function() { return this.googleId === undefined ; },
      trim: true,
      index: { unique: true },
      match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    },
    password: {
      type: String,
      required: function() { return this.googleId === undefined ; },
    },
    userRole: {
      type: Number,
      required: true,
      default:0
    },
    phoneNumber: {
      type: Number,
    },
    userImage: {
      type: String,
      default: "user.png",
    },
    verified: {
      type: String,
      default: false,
    },
    secretKey: {
      type: String,
      default: null,
    },
    history: {
      type: Array,
      default: [],
    },
    googleId:String,
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    checkoutOtp:Number
  },
  { timestamps: true }
);

userSchema.plugin(findOrCreate);

userSchema.methods.getResetPasswordToken = async function(){
  //generating token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hashing resetPasswordToken and saving
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() + 15*60*1000;
  return resetToken;
}

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
