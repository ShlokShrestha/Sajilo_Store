import React, { Fragment, useEffect } from "react";

import "./Home.css";
import ProductCard from "../Product/ProductCard.jsx";
import MetaData from "../layout/MetaData.jsx";
import { clearErrors, getProduct } from "../../actions/productAction.jsx";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader.jsx";

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
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
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
