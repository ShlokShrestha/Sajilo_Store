import React from "react";
import "./Cart.css";
import CartItemCard from "./CartItemCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemsCard,
  removeItemsFromCart,
} from "../../actions/cartAction.jsx";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { MdRemoveShoppingCart } from "react-icons/md";
import MetaData from "../layout/MetaData";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQtr = quantity + 1;
    if (stock <= quantity) return;
    dispatch(addItemsCard(id, newQtr));
  };
  const decreaseQuantity = (id, quantity) => {
    const newQtr = quantity - 1;
    if (1 >= quantity) return;
    dispatch(addItemsCard(id, newQtr));
  };

  const deleteFromCart = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  const checkOutHandler = () => {
    navigate("/shipping");
  };
  const shopNowHandler = () => {
    navigate("/products");
  };
  return (
    <>
      <MetaData title="Your Cart" />
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <MdRemoveShoppingCart size={70} />
          <p className="fs-3">Your Shopping Cart is Empty</p>
          <button onClick={shopNowHandler}>Show Now</button>
        </div>
      ) : (
        <div className="cartPage">
          <div className=" container my-5">
            <div className="row">
              <div className="col-lg-8 col-md-12">
                <div className="cartHeader">
                  <p className=" fs-5">PRODUCT</p>
                  <p className=" fs-5">QUANTITY</p>
                  <p className=" fs-5">TOTAL</p>
                </div>
                <div className="line"></div>
                <div className="my-3">
                  {cartItems &&
                    cartItems.map((item) => (
                      <>
                        <div className="cartContainer" key={item.product}>
                          <CartItemCard
                            item={item}
                            deleteFromCart={deleteFromCart}
                          />
                          <div className="d-flex align-items-center">
                            <span
                              onClick={() =>
                                decreaseQuantity(item.product, item.quantity)
                              }
                              className="text-center fs-6 qtnBtn"
                            >
                              <FaMinus />
                            </span>
                            <span className="fs-5 cart-quantity ">
                              {item.quantity}
                            </span>
                            <span
                              onClick={() =>
                                increaseQuantity(
                                  item.product,
                                  item.quantity,
                                  item.stock
                                )
                              }
                              className="text-center fs-6 qtnBtn"
                            >
                              <FaPlus />
                            </span>
                          </div>
                          <h5 className="d-flex align-items-center justify-content-start">
                            $ {`${item.price * item.quantity}`}
                          </h5>
                          <span
                            className="remove"
                            onClick={() => deleteFromCart(item.product)}
                          >
                            <MdClose />
                          </span>
                        </div>
                        <div className="line"></div>
                      </>
                    ))}
                </div>
              </div>
              <div className="col-lg-4 col-md-12">
                <div className="">
                  <div className="mb-5">
                    <p className=" fs-5">DISCOUNT CODES</p>
                    <div className="d-flex">
                      <input
                        type="text"
                        className="form-control shadow-none py-2"
                        placeholder="Coupon code"
                      />
                      <button className="px-4">Apply</button>
                    </div>
                  </div>

                  <div className="cartTotal px-5 py-5">
                    <div className="fs-6 mb-3">CART TOTAL</div>
                    <div className="d-flex justify-content-between">
                      <p>Grand Total</p>
                      <p className="text-danger fw-bold">{`$ ${cartItems.reduce(
                        (acc, item) => acc + item.quantity * item.price,
                        0
                      )}`}</p>
                    </div>
                    <button onClick={checkOutHandler} className="w-100">
                      Process to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
