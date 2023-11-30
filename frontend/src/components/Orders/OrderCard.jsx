import React from "react";
import "./order.css";
import { CgRedo } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { addItemsCard } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";
const OrderCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dateString = item.paidAt;
  const dateObject = new Date(dateString).toLocaleString();
  const address = `${item.shippingInfo.address}, ${item.shippingInfo.state}, ${item.shippingInfo.city}, ${item.shippingInfo.pinCode}`;

  const addToCartHandler = (id, quantity) => {
    dispatch(addItemsCard(id, quantity));
    navigate("/cart");
  };
  return (
    <>
      <div className="container-fluid ">
        <div className="row my-5 mx-2 ">
          <div className="border col-12 px-2  py-4 bg-white">
            <div className="title border-bottom p-3 d-flex flex-wrap justify-content-between">
              <div>
                <h5>Order Placed</h5>
                <span className="mb-3">{dateObject}</span>
                <h6 className="my-2">Order ID : #{item._id}</h6>
                <div>
                  <h6 className="">
                    Delivery Status:{" "}
                    <span
                      style={{
                        color:
                          item.orderStatus === "Processing" ? "red" : "green",
                      }}
                    >
                       {item.orderStatus}
                    </span>
                  </h6>
                </div>
              </div>
              <div>
                <h5>Total: ${item.totalPrice}</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 col-md-6">
                <div className="order-items">
                  {item.orderItems.map((item) => (
                    <div className="d-flex my-4 flex-column flex-md-row  ">
                      <div>
                        <img src={item.image} alt="avb" />
                      </div>

                      <div className="d-flex  flex-column my-auto">
                        <h6 className="fs-5 text-capitalize mb-0">
                          {item.name}
                        </h6>
                        <div>
                          <h6 className="my-1">QTN: {item.quantity}</h6>
                          <h6 className="my-1">Price: ${item.price}</h6>
                        </div>
                        <div className="my-2 d-flex ">
                          <button
                            className="bg-dark text-white fs-6 "
                            onClick={() => addToCartHandler(item.product, 1)}
                          >
                            <CgRedo size={25} className="icon me-1 my-auto" />
                            Buy Again
                          </button>
                          <button
                            className=" fs-6 ms-2 view-button"
                            onClick={() => navigate(`/product/${item.product}`)}
                          >
                            View items
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-4 col-md-6 my-4">
                <h6 className="my-1">Delivery Address:</h6>
                <span>{address}</span>
                <h6 className="my-1">Phone No:</h6>
                <span> +977-{item.shippingInfo.phoneNo}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderCard;
