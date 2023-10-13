import { fetchCart, fetchCategory, fetchUser,fetchfruitCategory } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();
const cartInfo = fetchCart();
const catInfo = fetchCategory();
const fruitcatInfo = fetchfruitCategory();
export const initialState = {
  user: userInfo,
  foodItems: null,
  freshfoodItems:null,
  foodCategory: catInfo,
  foodfreshcategory:fruitcatInfo,
  cartShow: false,
  cartItems: cartInfo,
};
