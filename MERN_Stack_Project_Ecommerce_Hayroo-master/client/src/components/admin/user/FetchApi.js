import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getAllUserByAdmin = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/user/get-all-user`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};


export const deleteUser = async (data) => {
  try {
    let res = await axios.post(`${apiURL}/api/user/delete`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
