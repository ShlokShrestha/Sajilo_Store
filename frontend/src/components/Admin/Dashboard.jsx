import React, { useEffect } from "react";
import SiderBar from "./SiderBar";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaClipboardUser } from "react-icons/fa6";
import { CiDeliveryTruck } from "react-icons/ci";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  ArcElement,
} from "chart.js";

ChartJs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  ArcElement
);
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct, clearErrors } from "../../actions/productAction";
import { getAllUsers } from "../../actions/userAction";
import { getAllOrders } from "../../actions/orderAction";
import Navbar from "./Navbar";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.products);
  const { users, error: userError } = useSelector((state) => state.allUsers);
  const { orders, error: orderError } = useSelector((state) => state.allOrders);
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (userError) {
      alert(userError);
      dispatch(clearErrors());
    }
    if (orderError) {
      alert(orderError);
      dispatch(clearErrors());
    }
    dispatch(getAdminProduct());
    dispatch(getAllUsers());
    dispatch(getAllOrders());
  }, [dispatch, error, userError, orderError]);

  let outOfStock = 0;
  products &&
    products.find((item) => {
      if (item.Stock == 0) {
        outOfStock += 1;
      }
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: "blak",
        hoverBackgroundColor: "red",
        data: [0, 25000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <>
      <div className="bg-light">
        <div className="container-fluid row">
          <div className="col-lg-3 ">
            <Navbar />
          </div>
          <div className="col-lg-9 col-md-12 col-12 mt-5">
            <h3 className="my-4">All Product List</h3>
            <div className="line"></div>
            {/* Top_section */}
            <div className="d-flex flex-wrap mt-4 ">
              <div className=" bg-danger text-white mt-2 p-2 me-2">
                <Link to="/admin/products" className="text-white">
                  <div className="d-flex">
                    <IoCartOutline size={50} />
                    <div className="mx-4 ">
                      <h4 className="mb-0">Product</h4>
                      <h5>{products && products.length}</h5>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="  bg-success text-white mt-2 p-2 me-2 ">
                <Link to="/admin/users" className="text-white">
                  <div className="d-flex">
                    <FaClipboardUser size={50} />

                    <div className="mx-4 ">
                      <h4 className="mb-0">User</h4>
                      <h5>{users && users.length}</h5>
                    </div>
                  </div>
                </Link>
              </div>
              <div className=" bg-dark text-white mt-2 p-2 me-2">
                <Link to="/admin/orders" className="text-white">
                  <div className="d-flex">
                    <CiDeliveryTruck size={50} />
                    <div className="mx-3 ">
                      <h4 className="mb-0">Total Order</h4>
                      <h5>{orders && orders.length}</h5>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="d-flex flex-wrap mt-5">
              <div className="lineChart ">
                <Line data={lineState} />
              </div>
              <div className="doughnutChart ">
                <Doughnut data={doughnutState} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
