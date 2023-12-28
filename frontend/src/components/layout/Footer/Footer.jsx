import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import AppStore from "../../../images/Appstore.png"
import PlayStore from "../../../images/playstore.png"
const Footer = () => {
  return (
    <div className="footer bg-dark ">
      <div className="container pt-5">
        <div className="row my-5 text-white">
          <div className="col-lg-3 col-md-6 col-12">
            <h3>Sajilo Store</h3>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, con sectetur adipiscing elit. Mauris
              temp us vestib ulum mauris.Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. <br />
            </p>
          </div>
          <div className="col-lg-3 col-md-6 col-12">
            <h5>Useful Links</h5>
            <div className="mt-3">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/products">Product</Link>
                </li>

                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12">
            <h5>Contact Us</h5>
            <div className="d-flex flex-column mt-3">
              <p>
                <FaPhoneAlt /> +977-9845632175
              </p>
              <p>
                <MdEmail /> office@gmail.com
              </p>
              <p>
                <MdLocationOn /> Baneshwor, Kathmandu, Nepal
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 col-12">
            <h5>Available On</h5>
            <img src={AppStore} alt="appstore" className="w-50 m-1"  />
            <img src={PlayStore} alt="appstore" className="w-50 m-1"  />
          </div>
        </div>
        <div className="text-white text-center pb-2">
          <hr />
          <p>Shlok Shrestha ©2023 All rights reserved</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
