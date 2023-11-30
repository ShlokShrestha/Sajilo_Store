import React, { useEffect, useState } from "react";
import "./profile.css";
import Loader from "../layout/Loader/Loader.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction.jsx";
import { UPDATE_PASSWORD_RESET } from "../../contants/userConstants.jsx";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const updatePasswordSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("oldPassword", oldPassword);
    myForm.append("newPassword", newPassword);
    myForm.append("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert("Password Update Successfully");
      navigate("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="Container">
            <div className="bg-white py-3 ">
              <h4 className="text-center my-3">Update Password</h4>
              <div className="line w-50 mx-auto "></div>
              <form
                className="m-4 form "
                encType="multipart/form-data"
                onSubmit={updatePasswordSubmit}
              >
                <div className="my-2 position-relative form-pw">
                  {show ? (
                    <IoIosEyeOff
                      className=" fs-5"
                      onClick={() => setShow(!show)}
                    />
                  ) : (
                    <IoMdEye className=" fs-5" onClick={() => setShow(!show)} />
                  )}
                  <input
                    type={show ? "text" : "password"}
                    className="form-control shadow-none"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="my-2 position-relative form-pw">
                  {show ? (
                    <IoIosEyeOff
                      className=" fs-5"
                      onClick={() => setShow(!show)}
                    />
                  ) : (
                    <IoMdEye className=" fs-5" onClick={() => setShow(!show)} />
                  )}
                  <input
                    type={show ? "text" : "password"}
                    className="form-control shadow-none"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="my-2 position-relative form-pw">
                  {show ? (
                    <IoIosEyeOff
                      className=" fs-5"
                      onClick={() => setShow(!show)}
                    />
                  ) : (
                    <IoMdEye className=" fs-5" onClick={() => setShow(!show)} />
                  )}
                  <input
                    type={show ? "text" : "password"}
                    className="form-control shadow-none"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="w-100 mt-3">
                  Update New Password
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassword;
