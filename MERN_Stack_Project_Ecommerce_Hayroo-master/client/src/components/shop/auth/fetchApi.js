import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const isAuthenticate = () =>
  localStorage.getItem("jwt") ? JSON.parse(localStorage.getItem("jwt")) : false;

export const isAdmin = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).user.role === 1
    : false;

export const loginReq = async ({ email, password }) => {
  const data = { email, password };
  try {
    let res = await axios.post(`${apiURL}/api/signin`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const signupReq = async ({ name, email, password, cPassword }) => {
  const data = { name, email, password, cPassword };
  try {
    let res = await axios.post(`${apiURL}/api/signup`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const forgetReq = async ({ email }) => {
  const data = {email}
  try {
    let res = await axios.post(`${apiURL}/api/user/forget-password`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const resetReq = async ({ password, confirmPassword, token }) => {
  const data = { password, confirmPassword };
  try {
    let res = await axios.patch(`${apiURL}/api/user/reset-password/${token}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const googleLoginReq = async () => {
  try {
  await axios.get(`${apiURL}/auth/google/callback`);
    
  } catch (error) {
    console.log(error);
  }
};

export const googleTokenReq = async (token ) => {
  const data = { token };
  try {
    let res = await axios.post(`${apiURL}/auth/google/signin`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};