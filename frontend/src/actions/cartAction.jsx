 import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../contants/cartContants";
import axios from "axios";

export const addItemsCard = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(
    `http://localhost:4000/api/v1/product/${id}`
  );
  dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.image[0].url,
      stock: data.product.Stock,
      quantity,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemsFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  console.log(data);
  dispatch({ type: SAVE_SHIPPING_INFO, payload: data });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
