export const homeState = {
  categoryListDropdown: false,
  filterListDropdown: false,
  searchDropdown: false,
  sortListDropdown:false,
  ratingsListDropdown:false,
  products: null,
  loading: false,
  sliderImages: [],
};

export const homeReducer = (state, action) => {
  switch (action.type) {
    case "sortListDropdown":
      return {
        ...state,
        sortListDropdown: action.payload,
        filterListDropdown: false,
        searchDropdown: false,
        categoryListDropdown:false,
  ratingsListDropdown:false,
      };
      case "ratingsListDropdown":
      return {
        ...state,
        ratingsListDropdown: action.payload,
        filterListDropdown: false,
        searchDropdown: false,
        sortListDropdown:false,
        categoryListDropdown:false,
      };
    case "categoryListDropdown":
      return {
        ...state,
        categoryListDropdown: action.payload,
        filterListDropdown: false,
        searchDropdown: false,
        sortListDropdown:false,
  ratingsListDropdown:false,
      };
    case "filterListDropdown":
      return {
        ...state,
        categoryListDropdown: false,
        filterListDropdown: action.payload,
        searchDropdown: false,
        sortListDropdown:false,
  ratingsListDropdown:false,
      };
    case "searchDropdown":
      return {
        ...state,
        categoryListDropdown: false,
        filterListDropdown: false,
        searchDropdown: action.payload,
        sortListDropdown:false,
  ratingsListDropdown:false,
      };
    case "setProducts":
      return {
        ...state,
        products: action.payload,
      };
    case "searchHandleInReducer":
      return {
        ...state,
        products:
          action.productArray &&
          action.productArray.filter((item) => {
            if (
              item.pName.toUpperCase().indexOf(action.payload.toUpperCase()) !==
              -1
            ) {
              return item;
            }
            return null;
          }),
      };
    case "loading":
      return {
        ...state,
        loading: action.payload,
      };
    case "sliderImages":
      return {
        ...state,
        sliderImages: action.payload,
      };
    default:
      return state;
  }
};
