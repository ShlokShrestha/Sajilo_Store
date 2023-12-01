import React, { useEffect } from "react";
import "./admin.css";
import SiderBar from "./SiderBar";
import DataTable from "react-data-table-component";
import Loader from "../layout/Loader/Loader";
import { MdOutlineEditNote, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteUser, getAllUsers, clearErrors } from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../contants/userConstants";
const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);
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
      alert(message);
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [error, dispatch, deleteError, navigate, isDeleted]);
  const deleteUserhandler = (id) => {
    dispatch(deleteUser(id));
  };
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },

    {
      name: "Role",
      selector: (row) => row.role,
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
            onClick={() => navigate(`/admin/user/${row._id}`)}
          />
          <MdDelete size={20} onClick={() => deleteUserhandler(row._id)} />
        </div>
      ),
    },
    {
      name: "User ID",
      selector: (row) => row._id,
      sortable: true,
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
                <SiderBar />
              </div>

              <div className="col-lg-9">
                <h3 className="my-4">All User List</h3>
                <div className="line mb-4"></div>
                <div className="mt-2">
                  <DataTable
                    columns={columns}
                    data={users}
                    pagination
                    fixedHeader
                    customStyles={customStyles}
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

export default UserList;
