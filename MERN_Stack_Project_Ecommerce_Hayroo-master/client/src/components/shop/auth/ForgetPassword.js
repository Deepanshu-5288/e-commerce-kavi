import React, { Fragment, useState, useContext } from "react";
import { forgetReq } from './fetchApi';
import { LayoutContext } from "../index";

function ForgetPassword() {
    const {  dispatch: layoutDispatch } = useContext(
        LayoutContext
      );
      const [data, setData] = useState({
        email: "",
        error: false,
        loading: false,
      });
      const alert = (msg) => <div className="text-xs text-red-500">{msg}</div>;
      const formSubmit = async () => {
        setData({ ...data, loading: true });
        try {
          let responseData = await forgetReq({
            email: data.email,
          });
          if (responseData.error) {
            setData({
              ...data,
              loading: false,
              error: responseData.error
            });
            layoutDispatch({ type: "forgetPasswordModalToggle", payload: false });
          } else if (responseData.success) {
            setData({ email: "",  loading: false, error: false });
            layoutDispatch({ type: "forgetPasswordModalToggle", payload: false });
          }
        } catch (error) {
          console.log(error);
          layoutDispatch({ type: "forgetPasswordModalToggle", payload: false }) 
        }
      };
  return (
    <Fragment>
        {data.loading ? <h1>Loading...</h1> : 
        <form className="space-y-4">
        <div className="flex flex-col">
        <label htmlFor="email">
            email address
            <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) => {
              setData({ ...data, email: e.target.value, error: false });
              layoutDispatch({ type: "loginSignupError", payload: false });
            }}
            value={data.email}
            type="email"
            id="email"
            className={`${
              !data.error ? "" : "border-red-500"
            } px-4 py-2 focus:outline-none border`}
          />
          {!data.error ? "" : alert(data.error)}
        </div>
        <div
          onClick={(e) => formSubmit()}
          style={{ background: "#303031" }}
          className="font-medium px-4 py-2 text-white text-center cursor-pointer"
        >
          Get Reset password link
        </div>
        </form>}
    </Fragment>
  )
}

export default ForgetPassword