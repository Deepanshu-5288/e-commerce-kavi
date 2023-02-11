import React, { Fragment, useState, useContext } from "react";
import { resetReq } from './fetchApi';
import { LayoutContext } from "../index";
import { useParams } from "react-router-dom";
function ForgetPassword() {
    const {  dispatch: layoutDispatch } = useContext(
        LayoutContext
      );
      const {token} = useParams();
      const [data, setData] = useState({
        password: "",
        confirmPassword:"",
        error: false,
        loading: false,
      });
      const alert = (msg) => <div className="text-xs text-red-500">{msg}</div>;
      const formSubmit = async () => {
        setData({ ...data, loading: true });
        try {
          let responseData = await resetReq({
            password: data.password,
            confirmPassword : data.confirmPassword,
            token
          });
          if (responseData.error) {
            setData({
              ...data,
              loading: false,
              error: responseData.error
            });
          } else if (responseData.success) {
            setData({ email: "",  loading: false, error: false });
          }
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <Fragment>
      <section
        className=' fixed z-40 inset-0 my-8 md:my-20 flex items-start justify-center overflow-auto'
      >
        {data.loading ? <h1>Loading...</h1> : 
        <form className="space-y-4">
        <div className="flex flex-col">
        <label htmlFor="password">
            password
            <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) => {
              setData({ ...data, password: e.target.value, error: false });
              layoutDispatch({ type: "loginSignupError", payload: false });
            }}
            value={data.password}
            type="password"
            id="password"
            className={`${
              !data.error ? "" : "border-red-500"
            } px-4 py-2 focus:outline-none border`}
          />
          {!data.error ? "" : alert(data.error)}
        </div>
        <div className="flex flex-col">
        <label htmlFor="confirmPassword">
            confirm password
            <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) => {
              setData({ ...data, confirmPassword: e.target.value, error: false });
              layoutDispatch({ type: "loginSignupError", payload: false });
            }}
            value={data.confirmPassword}
            type="password"
            id="confirmPassword"
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
          Reset Password
        </div>
        </form>}
        </section>
    </Fragment>
  )
}

export default ForgetPassword