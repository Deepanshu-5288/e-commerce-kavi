export const userState = {
    users: [],
    loading: false,
  };
  
  export const userReducer = (state, action) => {
    switch (action.type) {
      /* Get all users */
      case "fetchUsers":
        return {
          ...state,
          users: action.payload,
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
  