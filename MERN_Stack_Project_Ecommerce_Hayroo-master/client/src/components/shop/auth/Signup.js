import React, { Fragment, useState, useContext } from "react";
import { signupReq } from "./fetchApi";
import { LayoutContext } from "../index";
import Recaptcha from "react-recaptcha";
// const siteKey = process.env.SITE_KEY;
const Signup = (props) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    error: false,
    loading: false,
    success: false,
    isVerified:false
  });
  const { data: layoutData,dispatch: layoutDispatch } = useContext(
    LayoutContext
  );
  const alert = (msg, type) => (
    <div className={`text-sm text-${type}-500`}>{msg}</div>
  );

  const formSubmit = async () => {
    setData({ ...data, loading: true });
    if(!data.isVerified){
      return console.log("please verify you are human");
    }
    if (data.cPassword !== data.password) {
      return setData({
        ...data,
        error: {
          cPassword: "Password doesn't match",
          password: "Password doesn't match",
        },
      });
    }
    try {
      let responseData = await signupReq({
        name: data.name,
        email: data.email,
        password: data.password,
        cPassword: data.cPassword,
      });
      if (responseData.error) {
        setData({
          ...data,
          loading: false,
          error: responseData.error,
          password: "",
          cPassword: "",
        });
      } else if (responseData.success) {
        setData({
          success: responseData.success,
          name: "",
          email: "",
          password: "",
          cPassword: "",
          loading: false,
          error: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleForgetClick = () =>{
    layoutDispatch({ type: "forgetPasswordModalToggle", payload: true }) 
  }
  return (
    <Fragment>
      <div className="text-center text-2xl mb-6">Register</div>
      
      <form className="space-y-4">
        {data.success ? alert(data.success, "green") : ""}
        <div className="flex flex-col">
          <label htmlFor="name">
            Name<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                name: e.target.value,
              })
            }
            value={data.name}
            type="text"
            id="name"
            className={`${
              data.error.name ? "border-red-500" : ""
            } px-4 py-2 focus:outline-none border`}
          />
          {!data.error ? "" : alert(data.error.name, "red")}
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">
            Email address<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                email: e.target.value,
              })
            }
            value={data.email}
            type="email"
            id="email"
            className={`${
              data.error.email ? "border-red-500" : ""
            } px-4 py-2 focus:outline-none border`}
          />
          {!data.error ? "" : alert(data.error.email, "red")}
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">
            Password<span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                password: e.target.value,
              })
            }
            value={data.password}
            type="password"
            id="password"
            className={`${
              data.error.password ? "border-red-500" : ""
            } px-4 py-2 focus:outline-none border`}
          />
          {!data.error ? "" : alert(data.error.password, "red")}
        </div>
        <div className="flex flex-col">
          <label htmlFor="cPassword">
            Confirm password
            <span className="text-sm text-gray-600 ml-1">*</span>
          </label>
          <input
            onChange={(e) =>
              setData({
                ...data,
                success: false,
                error: {},
                cPassword: e.target.value,
              })
            }
            value={data.cPassword}
            type="password"
            id="cPassword"
            className={`${
              data.error.cPassword ? "border-red-500" : ""
            } px-4 py-2 focus:outline-none border`}
          />
          {!data.error ? "" : alert(data.error.cPassword, "red")}
        </div>
        <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:items-center">
          <div>
            <input
              type="checkbox"
              id="rememberMe"
              className="px-4 py-2 focus:outline-none border mr-1"
            />
            <label htmlFor="rememberMe">
              Remember me<span className="text-sm text-gray-600">*</span>
            </label>
          </div>
          <button type="button" className="block text-gray-600" onClick={() => handleForgetClick()}>
            Lost your password?
          </button>
        </div>
        {layoutData.isCaptchaLoaded && <Recaptcha
        sitekey="6LctRTIkAAAAAEL3pPM0Hm2UePLJc8ZMw_qwerty"
        render="explicit"
        onloadCallback={() => console.log("reCaptcha loaded successfully")}
        verifyCallback={() => setData({...data, isVerified:!data.isVerified})}
        />}
        <div
          onClick={(e) => formSubmit()}
          style={{ background: "#303031" }}
          className="px-4 py-2 text-white text-center cursor-pointer font-medium"
        >
          Create an account
        </div>
      </form>
    </Fragment>
  );
};

export default Signup;