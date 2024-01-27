import React, { useEffect, useState } from "react";
import SiderBar from "./SiderBar";
import "./admin.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getOrderDetails,
  updateOrder,
} from "../../actions/orderAction";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { UPDATE_ORDERS_RESET } from "../../contants/orderConstants";
import Navbar from "./Navbar";
const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const { loading, order, error } = useSelector((state) => state.orderDetails);
  const { isUpdated, error: updateError } = useSelector((state) => state.order);
  const { id } = useParams();

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("status", status);
    dispatch(updateOrder(id, myForm));
  };
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert("Order Update Succesfully");

      dispatch({ type: UPDATE_ORDERS_RESET });
    }
    dispatch(getOrderDetails(id));
  }, [dispatch, error, navigate, isUpdated, updateError, id]);

  return (
    <>
      <div className="bg-light">
        <div className="container-fluid row">
          <div className="col-lg-3">
            <Navbar />
          </div>

          <div className="col-lg-9 col-md-12 col-12 mt-5">
            {loading ? (
              <Loader />
            ) : (
              <>
                <h3 className="my-4">User Order Details</h3>
                <div className="line mb-4"></div>
                <div className="order-details ">
                  <h4 className="mb-4 text-uppercase">Order List</h4>
                  {order &&
                    order.orderItems &&
                    order.orderItems.map((item, index) => (
                      <Link to={`/product/${item.product}`} key={index}>
                        <div className="d-flex mb-4 order-details-item ">
                          <div className="orderItemImg">
                            <img src={item && item.image} alt={item.name} />
                          </div>
                          <div className="my-auto ms-3 text-dark">
                            <h5>{item.name}</h5>
                            <div>
                              Quantity: <span>{item.quantity}</span>
                            </div>
                            <div>
                              Price : $<span>{item.price}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}

                  <h4 className="my-4 text-uppercase">DELIVERY ADDRESS</h4>
                  <div className="delievery-address my-4">
                    <div>
                      Address :{" "}
                      {order.shippingInfo && order.shippingInfo.address},{" "}
                      {order.shippingInfo && order.shippingInfo.city}
                    </div>
                    <div>
                      State : {order.shippingInfo && order.shippingInfo.state},{" "}
                      {order.shippingInfo && order.shippingInfo.pinCode}
                    </div>
                    <span>
                      Contact No:{" "}
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </div>

                  <div className="line w-50"></div>
                  <div className="my-3">
                    <div className="d-flex justify-content-between w-50">
                      <div>
                        <span>
                          <h6 className="fw-bolder">Total Price</h6>
                          <p>(Inclusive of all taxes)</p>
                        </span>
                        <h6 className="fw-bolder">Order Status</h6>
                        <h6 className="fw-bolder">Payment Status</h6>
                      </div>
                      <div>
                        <h6 className="mb-5">${order.totalPrice}</h6>
                        <h6
                          style={
                            order.orderStatus === "Processing"
                              ? { color: "red" }
                              : { color: "green" }
                          }
                        >
                          {order.orderStatus}
                        </h6>
                        <h6 className="text-success">PAID</h6>
                      </div>
                    </div>
                  </div>
                  <div className="line w-50"></div>
                  <div
                    className="my-4"
                    style={
                      order.orderStatus === "Delivered"
                        ? { display: "none" }
                        : { display: "block" }
                    }
                  >
                    <h4 className="my-3 text-uppercase">Process Order</h4>

                    <div className="w-50 my-4">
                      <form onSubmit={updateOrderSubmitHandler}>
                        <select
                          name=""
                          id=""
                          className="form-control mb-4 shadow-none"
                          onChange={(e) => setStatus(e.target.value)}
                        >
                          <option value="">Choose Category</option>
                          {order.orderStatus === "Processing" ? (
                            <option value="Shipped">Shipped</option>
                          ) : (
                            ""
                          )}
                          {order.orderStatus === "Shipped" ? (
                            <option value="Delivered">Delivered</option>
                          ) : (
                            ""
                          )}
                        </select>
                        <button
                          className="w-100"
                          type="submit"
                          disabled={
                            loading
                              ? true
                              : false || status === ""
                              ? true
                              : false
                          }
                        >
                          Process
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
