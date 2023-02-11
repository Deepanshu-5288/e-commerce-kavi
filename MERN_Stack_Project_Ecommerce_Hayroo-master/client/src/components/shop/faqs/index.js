import React, { Fragment } from "react";
import Layout from "../layout";
import FAQContainer from "./FAQContainer";
import "./assets/FAQ.css"
const WishList = () => {
  return (
    <Fragment>
      <Layout children={<FAQContainer />} />
    </Fragment>
  );
};

export default WishList;