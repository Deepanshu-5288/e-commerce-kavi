import React, { createContext, Fragment, useContext, useReducer } from "react";
import LoginSignup from "../../shop/auth/LoginSignup";
import AdminLayout from "../layout";
import UserContainer from "./UserContainer";
import { LayoutContext } from "../../shop/layout/index";
import { userState, userReducer } from "./UserContext";

export const userContext = createContext();
const UserDiv = () => {
    const { data, dispatch } = useContext(LayoutContext);
    const loginModalOpen = () =>{
        if(data.loginSignupModal){
            dispatch({ type: "loginSignupModalToggle", payload: false });
        }else{
            dispatch({ type: "loginSignupModalToggle", payload: true });
            dispatch({ type: "LoginOrSignup", payload: false });
        }
    }



  return (
    
    <div className="grid grid-cols-1 space-y-4 p-4">
        <button className="adduser-btn" onClick={() =>loginModalOpen()} type="button" >Add User </button>
        <LoginSignup />
        <UserContainer />
    </div>
  );
};

const User = (props) => {
    const [data, dispatch] = useReducer(userReducer, userState);
  return (
    <Fragment>
        <userContext.Provider value={{ data, dispatch }}>
        <AdminLayout children={<UserDiv />} />
        </userContext.Provider>
    </Fragment>
  );
};

export default User;
