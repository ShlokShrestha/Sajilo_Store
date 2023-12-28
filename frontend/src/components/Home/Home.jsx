import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import ProductCard from "../Product/ProductCard.jsx";
import MetaData from "../layout/MetaData.jsx";
import { clearErrors, getProduct } from "../../actions/productAction.jsx";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader.jsx";
import { FaArrowRightLong } from "react-icons/fa6";
const Home = () => {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="E-commerce Website" />

          <div className="banner">
            <div className="container">
              <h4>Welcome to Sajilo Store</h4>
              <h1 className="mb-3 text-danger">FIND AMAZING PRODUCTS BELOW</h1>
              <Link to="/products">
                <button>Shop Now <FaArrowRightLong className="ms-1 mb-1"/></button>
              </Link>
            </div>
          </div>

          <h4 className="text-center mt-5 mb-2">Featured Products</h4>
          <div className="line w-25 mx-auto my-3 "></div>

          <div className="container d-flex justify-content-evenly flex-wrap mb-3">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
