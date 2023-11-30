import React, { useEffect, useState } from "react";
import "./profile.css";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { BiSmile } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../contants/userConstants";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");
  const updateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        setAvatarPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const updateProfileSubmit = async (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("avatar", avatar);

    dispatch(updateProfile(myForm));
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert("Profile Update Successfully");
      dispatch(loadUser());
      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate, user]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="Container">
            <div className="bg-white py-3 ">
              <h4 className="text-center my-3">Update Profile</h4>
              <div className="line w-50 mx-auto "></div>
              <form
                className="m-4 form "
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="my-2 position-relative form-icons">
                  <BiSmile  className="fs-5"/>
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    className="form-control shadow-none "
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="my-2 position-relative form-icons">
                  <MdEmail className="fs-5"/>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="form-control shadow-none "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className=" updateProfileImg d-flex mt-3">
                  <div className="prevImg me-2">
                    <img src={avatarPreview} alt="Avatar Preview" />
                  </div>
                  <input
                    type="file"
                    name="avatar"
                    id="img"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                    style={{ display: "none" }}
                  />
                  <label for="img">Upload Avatar</label>
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

export default UpdateProfile;
