import { createOrder,checkoutEmailVerify,checkoutEmailOTP } from "./FetchApi";
import axios from "axios";
export const fetchData = async (cartListProduct, dispatch) => {
  dispatch({ type: "loading", payload: true });
  try {
    let responseData = await cartListProduct();
    if (responseData && responseData.Products) {
      setTimeout(function () {
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "loading", payload: false });
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchbrainTree = async (getBrainTreeToken, setState) => {
  try {
    let responseData = await getBrainTreeToken();
    if (responseData && responseData) {
      setState({
        clientToken: responseData.clientToken,
        success: responseData.success,
      });
      console.log(responseData);
    }
  } catch (error) {
    console.log(error);
  }
};

export const pay = async (
  data,
  dispatch,
  state,
  setState,
  getPaymentProcess,
  totalCost,
  history
) => {
  console.log(state);
  if (!state.address) {
    setState({ ...state, error: "Please provide your address" });
  } else if (!state.phone) {
    setState({ ...state, error: "Please provide your phone number" });
  } else {
    let nonce;
    state.instance
      .requestPaymentMethod()
      .then((data) => {
        dispatch({ type: "loading", payload: true });
        nonce = data.nonce;
        let paymentData = {
          amountTotal: totalCost(),
          paymentMethod: nonce,
        };
        getPaymentProcess(paymentData)
          .then(async (res) => {
            if (res) {
              let orderData = {
                allProduct: JSON.parse(localStorage.getItem("cart")),
                user: JSON.parse(localStorage.getItem("jwt")).user._id,
                amount: res.transaction.amount,
                transactionId: res.transaction.id,
                address: state.address,
                phone: state.phone,
              };
              try {
                let resposeData = await createOrder(orderData);
                if (resposeData.success) {
                  localStorage.setItem("cart", JSON.stringify([]));
                  dispatch({ type: "cartProduct", payload: null });
                  dispatch({ type: "cartTotalCost", payload: null });
                  dispatch({ type: "orderSuccess", payload: true });
                  setState({ clientToken: "", instance: {} });
                  dispatch({ type: "loading", payload: false });
                  return history.push("/");
                } else if (resposeData.error) {
                  console.log(resposeData.error);
                }
              } catch (error) {
                console.log(error);
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log(error);
        setState({ ...state, error: error.message });
      });
  }
};


export const checkoutRazorPayHandler = async (
  state,
  totalCost,) => {
    console.log(totalCost());
    const amount =totalCost()
  const { data: { key } } = await axios.get("http://www.localhost:8000/api/getkey")

  const { data: { order } } = await axios.post("http://localhost:8000/api/razorPayCheckout", {
    amount
  })
  const userData= JSON.parse(localStorage.getItem("jwt"));
  let orderData = {
    allProduct: JSON.parse(localStorage.getItem("cart")),
    user: userData.user._id,
    amount: order.amount,
    address: state.address,
    phone: state.phone,
  };
  orderData = JSON.stringify(orderData);


  const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "E-Commerce",
      description: "E-commerce payment",
      image: "https://avatars.githubusercontent.com/u/25058652?v=4",
      order_id: order.id,
      callback_url: `http://localhost:8000/api/razorPayPaymentVerification?orderData=${orderData}`,
      prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9999999999"
      },
      notes: {
          "address": "Razorpay Corporate Office"
      },
      theme: {
          "color": "#121212"
      }
  };
  const razor = new window.Razorpay(options);
  razor.open();
};


export const verifyEmail = async(email,dispatch) =>{
  if (!email) {
    return console.log("please enter email")
  } 
  try {
    let resposeData = await checkoutEmailVerify(email);
    if (resposeData.success) {
      
      return dispatch({ type: "EmailVerified", payload: true });
    } else if (resposeData.error) {
      console.log(resposeData.error);
      dispatch({ type: "EmailVerified", payload: false });
    }
  } catch (error) {
    console.log(error);
  }
}
export const verifyOTP = async(otp,dispatch) =>{
  if (!otp) {
    return console.log("please enter email")
  } 
  try {
    let resposeData = await checkoutEmailOTP(otp);
    
    if (resposeData.success) {
      return dispatch({ type: "OtpVerified", payload: true });
    } else if (resposeData.error) {
      console.log(resposeData.error);
      dispatch({ type: "OtpVerified", payload: false });
    }
  } catch (error) {
    console.log(error);
  }
}
