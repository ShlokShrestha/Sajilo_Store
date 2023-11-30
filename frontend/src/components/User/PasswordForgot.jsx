import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader/Loader";
import { MdEmail } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import "./profile.css";

const PasswordForgot = () => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState("");
  const forgotPasswordSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("email", email);
    dispatch(forgotPassword(myForm));
  };
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
      alert(error);
    }
    if (message) {
      alert(message);
    }
  }, [dispatch, error, message]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="Container">
          <div className="bg-white py-3 ">
            <h4 className="text-center my-3">Forgot Password</h4>
            <div className="line w-50 mx-auto"></div>
            <form className="mx-5 form " onSubmit={forgotPasswordSubmit}>
              <div className="my-3 form-email">
                <MdEmail className="position-absolute m-2 fs-5" />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control ps-5 shadow-none"
                />
              </div>

              <button type="submit" value="Send" className="w-100 mb-3">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PasswordForgot;
