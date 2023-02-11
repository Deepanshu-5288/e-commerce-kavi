import { getAllUserByAdmin, deleteUser } from "./FetchApi";

export const fetchData = async (dispatch) => {
  dispatch({ type: "loading", payload: true });
  let responseData = await getAllUserByAdmin();
  setTimeout(() => {
    if (responseData && responseData.Users) {
      dispatch({
        type: "fetchUsers",
        payload: responseData.Users,
      });
      dispatch({ type: "loading", payload: false });
    }
  }, 1000);
};



export const deleteUserReq = async (uId, dispatch) => {
  const data = {uId}
  let responseData = await deleteUser(data);
  console.log(responseData);
  if (responseData && responseData.success) {
    fetchData(dispatch);
  }
};
