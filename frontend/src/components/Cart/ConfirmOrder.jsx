import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import "./ConfirmOrder.css";
import { createOrder, clearErrors } from "../../actions/orderAction";

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const address = `${shippingInfo.address}, ${shippingInfo.state},${shippingInfo.city} , ${shippingInfo.pinCode}`;
  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = 150;
  const tax = subTotal * 0.13;
  const totalPrice = subTotal + tax + shippingCharges;

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: subTotal,
    taxPrice: tax,
    shippingPrice: shippingCharges,
    totalPrice: totalPrice,
  };

  const proceedToPayment = (e) => {
    e.preventDefault();
    dispatch(createOrder(order));
    localStorage.removeItem("cartItems");
    navigate("/success");
  };
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);
  return (
    <>
      <MetaData title="Confirm Order" />
      <div className="container my-5">
        <div className=" row mt-5">
          <div className="col-lg-8 col-md-10 col-12">
            <div className="container">
              <div>
                <h3>Shipping Info</h3>
                <div className="fs-6">
                  <div className="mb-2">
                    <span>Name: </span>
                    <span>{user.name}</span>
                  </div>
                  <div className="mb-2">
                    <span>Phone:</span>
                    <span>{shippingInfo.phoneNo}</span>
                  </div>
                  <div className="mb-2">
                    <span>Address: </span>
                    <span>{address}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <h4>Your Cart Items:</h4>
                  <div className="mt-4">
                    {cartItems &&
                      cartItems.map((item) => (
                        <div key={item.product} className="row mb-2">
                          <div className="col-lg-3 col-md-6 col-sm-6 col-12 ">
                            <img
                              src={item.image}
                              alt="prduct"
                              className="w-100"
                            />
                          </div>

                          <div className="col-lg-4 col-md-6 col-sm-6 col-12 my-auto">
                            <div className="d-flex justify-content-between align-items-center flex-wrap">
                              <Link
                                to={`/product/${item.product}`}
                                className="fs-5 text-decoration-none text-dark text-capitalize"
                              >
                                {item.name}
                              </Link>
                              <div className="">
                                {item.quantity} x ${item.price} = $
                                {item.price * item.quantity}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-10 col-10 ">
            <h3 className="mb-2">Order Summmary</h3>
            <div className="line my-4">
              <div className="d-flex justify-content-between  my-2">
                <p>SubTotal:</p>
                <span>${subTotal}</span>
              </div>
              <div className="d-flex justify-content-between my-2">
                <p>Shipping Charges:</p>
                <span>${shippingCharges}</span>
              </div>
              <div className="d-flex justify-content-between my-2">
                <p>Vat:</p>
                <span>${tax}</span>
              </div>
            </div>

            <div className="d-flex justify-content-between py-3 line ">
              <p className="fs-5">
                <b>Total:</b>
              </p>
              <span>${totalPrice}</span>
            </div>

            <button onClick={proceedToPayment} className="bg-dark my-3 fs-6 ">
              Process to Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
