import React, { useEffect, useState } from "react";
import "./profile.css";
import Loader from "../layout/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const resetPasswordSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("password", password);
    myForm.append("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, myForm));
  };
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (success) {
      alert("Password Update Successfully");
      navigate("/login");
    }
  }, [dispatch, error, navigate, success]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="Container">
            <div className="bg-white py-3 ">
              <h4 className="text-center my-3">Reset Password</h4>
              <div className="line w-50 mx-auto mb-4"></div>
              <form className="m-4 form " onSubmit={resetPasswordSubmit}>
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
                    placeholder="Password"
                    required
                    value={password}
                    className="form-control shadow-none"
                    onChange={(e) => setPassword(e.target.value)}
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
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    className="form-control  shadow-none"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="w-100 my-2">
                  Send
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
