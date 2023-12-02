import React, { useEffect } from "react";
import SiderBar from "./SiderBar";
import DataTable from "react-data-table-component";
import { useSelector, useDispatch } from "react-redux";
import {
  getAdminProduct,
  clearErrors,
  deleteProduct,
} from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { MdOutlineEditNote, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../contants/productConstants";
import "./admin.css";
import Navbar from "./Navbar";
const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
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
      alert("Product delete successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [error, dispatch, deleteError, navigate, isDeleted]);
  const deleteProducthandler = (id) => {
    dispatch(deleteProduct(id));
  };
  const columns = [
    {
      name: "Product ID",
      selector: (row) => row._id,
      style: {
        width: "10px",
      },
    },
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Image",
      selector: (row) => (
        <img src={row.image && row.image[0].url} alt={row.name} width={100} />
      ),
    },
    {
      name: "Stock",
      selector: (row) => row.Stock,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
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
            onClick={() => navigate(`/admin/product/${row._id}`)}
          />
          <MdDelete size={20} onClick={() => deleteProducthandler(row._id)} />
        </div>
      ),
    },
  ];
  const customStyles = {
    headCells: {
      style: {
        fontSize: "18px",
        fontWeight: "600",
        backgroundColor: "rgb(25, 25, 25)",
        color: "#ffff",
      },
    },
    rows: {
      style: {
        fontSize: "17px",
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
                <h3 className="my-4">All Product List</h3>
                <div className="line mb-4"></div>
                <div className="mt-2">
                  <DataTable
                    columns={columns}
                    data={products}
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
