import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_ERRORS } from "../../contants/orderConstants";
import { myOrder } from "../../actions/orderAction";
import OrderCard from "./OrderCard";
import Loader from "../layout/Loader/Loader";
import "./order.css";
import { MdRemoveShoppingCart } from "react-icons/md";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
const MyOrders = () => {
  const dispatch = useDispatch();
  const { loading, error, orders } = useSelector((state) => state.myOrder);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(CLEAR_ERRORS());
    }
    dispatch(myOrder());
  }, [dispatch, error]);

  return (
    <>
      <MetaData title="Your Order Page" />
      {loading ? (
        <Loader />
      ) : (
        <div>
          {orders.length === 0 ? (
            <div className="emptyCart">
              <MdRemoveShoppingCart size={70} />
              <p className="fs-3">No order has been placed</p>
              <Link to={"/products"}>
                <button>Shop Now</button>
              </Link>
            </div>
          ) : (
            <div className="orders">
              <h4 className="text-center pt-4 pb-2">My Orders</h4>
              <div className="border-bottom  mb-5 w-25 mx-auto "></div>
              {orders &&
                orders.map((item) => <OrderCard item={item} key={item._id} />)}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MyOrders;
