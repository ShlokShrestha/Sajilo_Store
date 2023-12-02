import React, { useEffect } from "react";
import SiderBar from "./SiderBar";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { MdOutlineEditNote, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./admin.css";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../actions/orderAction";
import { DELETE_ORDERS_RESET } from "../../contants/orderConstants";
import Navbar from "./Navbar";
const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, orders } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector((state) => state.order);
  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      alert(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert("Order delete successfully");
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDERS_RESET });
    }
    dispatch(getAllOrders());
  }, [error, dispatch, deleteError, navigate, isDeleted]);
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };
  const columns = [
    {
      name: "Product ID",
      selector: (row) => row._id,
    },
    {
      name: "Status",
      selector: (row) => row.orderStatus,
      conditionalCellStyles: [
        {
          when: (row) =>
            row.orderStatus == "Processing" || row.orderStatus == "Shipped",
          style: {
            color: "red",
            fontWeight: "600",
          },
        },
        {
          when: (row) => row.orderStatus == "Delivered",
          style: {
            color: "green",
            fontWeight: "600",
          },
        },
      ],
    },
    {
      name: "Item Qty",
      selector: (row) => (row.orderItems ? row.orderItems.length : 0),
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.totalPrice,
      sortable: true,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <div className="icons">
          <MdOutlineEditNote
            size={25}
            className="mx-1"
            onClick={() => navigate(`/admin/order/${row._id}`)}
          />
          <MdDelete size={20} onClick={() => deleteOrderHandler(row._id)} />
        </div>
      ),
    },
  ];
  const customStyles = {
    headCells: {
      style: {
        fontSize: "17px",
        fontWeight: "600",
        backgroundColor: "rgb(25, 25, 25)",
        color: "#ffff",
      },
    },
    rows: {
      style: {
        fontSize: "15px",
      },
    },
    cells: {
      style: {
        padding: "10px",
      },
    },
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="bg-light">
            <div className="container-fluid row">
              <div className="col-lg-3">
                <Navbar />
              </div>

              <div className="col-lg-9 col-md-12 col-12 mt-5">
                <h3 className="my-4">All Order List</h3>
                <div className="line mb-4"></div>
                <div className="mt-2">
                  <DataTable
                    columns={columns}
                    data={orders}
                    pagination
                    fixedHeader
                    customStyles={customStyles}
                    responsive
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductList;
