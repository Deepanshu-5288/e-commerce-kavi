export const layoutState = {
  navberHamburger: false,
  loginSignupModal: false,
  forgetPasswordModal:false,
  loginSignupError: false,
  cartModal: false,
  cartProduct: null,
  singleProductDetail: null,
  inCart: null,
  cartTotalCost: null,
  orderSuccess: false,
  loading: false,
  isCaptchaLoaded:false,
  isLoginOrSignup:true,
  isEmailVerified:false,
  isOTPVerified:false,
  isOTPError:false,
};

export const layoutReducer = (state, action) => {
  switch (action.type) {
    case "OtpVerified":
      return {
        ...state,
        isOTPVerified : action.payload,
        isOTPError:!action.payload,
      }
    case "EmailVerified":
      return {
        ...state,
        isEmailVerified : action.payload,
      }
    case "LoginOrSignup":
      return {
        ...state,
        isLoginOrSignup : action.payload,
      }
    case "hamburgerToggle":
      return {
        ...state,
        navberHamburger: action.payload,
      };
    case "loginSignupModalToggle":
      return {
        ...state,
        loginSignupModal: action.payload,
        isCaptchaLoaded:action.payload,
      };
      case "forgetPasswordModalToggle":
      return {
        ...state,
        forgetPasswordModal: action.payload,
      };
    case "cartModalToggle":
      return {
        ...state,
        cartModal: action.payload,
      };
    case "cartProduct":
      return {
        ...state,
        cartProduct: action.payload,
      };
    case "singleProductDetail":
      return {
        ...state,
        singleProductDetail: action.payload,
      };
    case "inCart":
      return {
        ...state,
        inCart: action.payload,
      };
    case "cartTotalCost":
      return {
        ...state,
        cartTotalCost: action.payload,
      };
    case "loginSignupError":
      return {
        ...state,
        loginSignupError: action.payload,
      };
    case "orderSuccess":
      return {
        ...state,
        orderSuccess: action.payload,
      };
    case "loading":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
