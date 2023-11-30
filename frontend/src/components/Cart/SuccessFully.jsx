import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const SuccessFully = () => {
  return (
    <div style={{ height: "80vh" }}>
      <div className="d-flex justify-content-center align-items-center h-100 ">
        <div className="text-center">
          <FaCheckCircle className="fs-1 my-3" />
          <h3>You have Successfully place your order.</h3>

          <Link to="/orders">
            <button className="bg-dark w-25 my-2">View Order</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessFully;
