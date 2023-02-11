import React, { Fragment, createContext, useReducer, useEffect } from "react";
import Layout from "../layout";
import Slider from "./Slider";
import ProductCategory from "./ProductCategory";
import { homeState, homeReducer } from "./HomeContext";
import SingleProduct from "./SingleProduct";
import { googleTokenReq } from "../auth/fetchApi";
export const HomeContext = createContext();


const HomeComponent = () => {
  return (
    <Fragment>
      <Slider />
      {/* Category, Search & Filter Section */}
      <section className="m-4 md:mx-8 md:my-6">
        <ProductCategory />
      </section>
      {/* Product Section */}
      <section className="m-4 md:mx-8 md:my-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <SingleProduct />
      </section>
    </Fragment>
  );
};

const Home = (props) => {
  const getGoogleToken = async (token) =>{
   try {
    const responseData = await googleTokenReq(token)
    localStorage.setItem("jwt", JSON.stringify(responseData));
        window.location.href = "/";
   } catch (error) {
    console.log(error);
   }

  }
  useEffect(() =>{
    const urlParams = window.location.search;
    const searchParams = new URLSearchParams(urlParams);
    const token = searchParams.get("token");
    if(token){
      getGoogleToken(token)
    }
  })
  const [data, dispatch] = useReducer(homeReducer, homeState);
  return (
    <Fragment>
      <HomeContext.Provider value={{ data, dispatch }}>
        <Layout children={<HomeComponent />} />
      </HomeContext.Provider>
    </Fragment>
  );
};

export default Home;
