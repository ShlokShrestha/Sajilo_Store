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
const Dashboard = () => {
  const dispatch = useDispatch();
  const { products, error } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    dispatch(getAdminProduct());
  }, [dispatch, error]);

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
            <SiderBar />
          </div>

          <div className="col-lg-9 ">
            <h3 className="my-4">All Product List</h3>
            <div className="line"></div>
            {/* Top_section */}
            <div className="d-flex mt-4">
              <div className="w-25 h-auto bg-danger text-white py-3 px-3 me-4">
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
              <div className="w-25 h-auto bg-success text-white py-3 px-3 me-4 ">
                <Link to="/admin/products" className="text-white">
                  <div className="d-flex">
                    <FaClipboardUser size={50} />

                    <div className="mx-4 ">
                      <h4 className="mb-0">User</h4>
                      <h5>1234</h5>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="w-25 h-auto bg-dark text-white py-3 px-3">
                <Link to="/admin/orders" className="text-white">
                  <div className="d-flex">
                    <CiDeliveryTruck size={50} />
                    <div className="mx-3 ">
                      <h4 className="mb-0">Total Order</h4>
                      <h5>1234</h5>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="d-flex">
              <div className="lineChart my-5">
                <Line data={lineState} />
              </div>
              <div className="doughnutChart my-5">
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
