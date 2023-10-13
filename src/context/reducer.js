export const actionType = {
  SET_USER: "SET_USER",
  SET_FOOD_ITEMS: "SET_FOOD_ITEMS",
  SET_FRESH_FOOD_ITEMS: "SET_FRESH_FOOD_ITEMS",
  SET_FOOD_CATEGORIES: "SET_FOOD_CATEGORIES",
  SET_FOOD_FRUIT_CATEGORIES: "SET_FOOD_FRUIT_CATEGORIES",
  SET_CART_SHOW: "SET_CART_SHOW",
  SET_CARTITEMS: "SET_CARTITEMS",
};

const reducer = (state, action) => {
  // console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_FOOD_ITEMS:
      return {
        ...state,
        foodItems: action.foodItems,
      };
      case actionType.SET_FRESH_FOOD_ITEMS:
        return {
          ...state,
          freshfoodItems: action.freshfoodItems,
        };
   case actionType.SET_FOOD_CATEGORIES:
      return {
        ...state,
        foodCategory: action.foodCategory,
      };
  case actionType.SET_FOOD_FRUIT_CATEGORIES:
      return {
        ...state,
        foodfreshCategory: action.foodfreshCategory,
      };

    case actionType.SET_CART_SHOW:
      return {
        ...state,
        cartShow: action.cartShow,
      };

    case actionType.SET_CARTITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      };

    default:
      return state;
  }
};

export default reducer;
