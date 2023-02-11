import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getAllOrder = async (searchTrxId) => {
  try {
    let res = await axios.get(`${apiURL}/api/order/get-all-orders?keyword=${searchTrxId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editCategory = async (oId, status,allProduct) => {
  let data = { oId: oId, status: status,allProduct:allProduct };
  try {
    let res = await axios.post(`${apiURL}/api/order/update-order`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrder = async (data) => {
  try {
    let res = await axios.post(`${apiURL}/api/order/delete-order`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const returnOrder = async (data) => {
  try {
    let res = await axios.post(`${apiURL}/api/order/return-order`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
