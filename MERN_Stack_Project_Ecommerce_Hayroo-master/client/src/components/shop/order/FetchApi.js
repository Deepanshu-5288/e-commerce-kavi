import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getBrainTreeToken = async () => {
  let uId = JSON.parse(localStorage.getItem("jwt")).user._id;
  try {
    let res = await axios.post(`${apiURL}/api/braintree/get-token`, {
      uId: uId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPaymentProcess = async (paymentData) => {
  try {
    let res = await axios.post(`${apiURL}/api/braintree/payment`, paymentData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (orderData) => {
  try {
    let res = await axios.post(`${apiURL}/api/order/create-order`, orderData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const checkoutEmailVerify = async (email) => {
  const user = JSON.parse(localStorage.getItem("jwt")).user._id;
  const data = {email:email, user:user}
  try {
    let res = await axios.post(`${apiURL}/api/order/verify-email`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const checkoutEmailOTP = async (otp) => {
  const user = JSON.parse(localStorage.getItem("jwt")).user._id;
  const data = {otp:otp, uId:user}
  try {
    let res = await axios.post(`${apiURL}/api/order/verify-otp`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
//update stock
export const updateStockReq = async (cartProduct) => {
  const data = cartProduct;
  try {
    let res = await axios.patch(`${apiURL}/api/product/update`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};