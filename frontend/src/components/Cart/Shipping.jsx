import React, { useState } from "react";
import "./shipping.css";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction.jsx";
import MetaData from "../layout/MetaData.jsx";
import { State } from "country-state-city";
import { IoMdHome } from "react-icons/io";
import {
  MdLocationCity,
  MdLocationOn,
  MdOutlinePhoneIphone,
  MdRealEstateAgent,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert("Phone number should be 10 digits long");
      return;
    }
    dispatch(saveShippingInfo({ address, city, state, pinCode, phoneNo }));
    navigate("/order/confirm");
  };

  return (
    <>
      <MetaData title="Shipping Details" />
      <div className="d-flex justify-content-center align-items-center my-4">
        <div className="w-50 ">
          <h4 className="text-center mt-5 mb-2">Products Page</h4>
          <div className="line w-50 mx-auto my-3 "></div>
          <form
            className="d-flex flex-column align-items-center justify-content-evenly my-2 shippingForm"
            encType="multiPart/Form-data"
            onSubmit={shippingSubmit}
          >
            <div className="d-flex w-100 align-items-center">
              <IoMdHome className="position-absolute mx-2 fs-5 text-dark" />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="d-flex w-100 align-items-center">
              <MdLocationCity className="position-absolute mx-2 fs-5 text-dark" />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="d-flex w-100 align-items-center">
              <MdLocationOn className="position-absolute mx-1 fs-5 text-dark" />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div className="d-flex w-100 align-items-center">
              <MdOutlinePhoneIphone className="position-absolute mx-2 fs-5 text-dark" />
              <input
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            {State && (
              <div className="d-flex w-100 align-items-center">
                <MdRealEstateAgent className="position-absolute mx-2 fs-5 text-dark" />
                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry("NP").map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <button value="Continue" className="bg-dark my-3 w-50">
              Process to continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
