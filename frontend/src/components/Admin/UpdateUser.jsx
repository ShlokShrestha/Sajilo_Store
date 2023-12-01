import React, { useEffect, useState } from "react";
import SiderBar from "./SiderBar";
import "./admin.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUserDetails,
  clearErrors,
  updateUser,
} from "../../actions/userAction";
import { UPDATE_USER_RESET } from "../../contants/userConstants";
import Loader from "../layout/Loader/Loader";

const UpdateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, user, error } = useSelector((state) => state.userDetails);
  const { isUpdated, error: updateError } = useSelector(
    (state) => state.profile
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(getUserDetails(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert("Update User is Successfully");
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, navigate, isUpdated, updateError, id, user]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("role", role);
    dispatch(updateUser(id, myForm));
  };

  return (
    <>
      <div className="bg-light">
        <div className="container-fluid row">
          <div className="col-lg-3">
            <SiderBar />
          </div>

          {loading ? (
            <Loader />
          ) : (
            <div className="col-lg-9">
              <h3 className="my-4">Update User Profile</h3>
              <div className="line mb-4"></div>

              <form
                className=" w-50 mx-auto bg-white p-4 shadow-sm my-3"
                onSubmit={createProductSubmitHandler}
              >
                <div className="mb-3">
                  <label className="form-label" encType="multipart/form-data">
                    User Name
                  </label>
                  <input
                    type="Text"
                    className="form-control shadow-none"
                    placeholder="User Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control shadow-none"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select shadow-none"
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                  >
                    <option disabled>Choose Category</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-100"
                  disabled={loading ? true : false}
                >
                  Update User
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
