import React, { Fragment, useEffect, useState } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import MetaData from "../layout/MetaData";
const categories = [
  "Electronic",
  "Clothing",
  "Bags",
  "Footwear",
  "Accessories",
];
const Product = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const { loading, error, products, productsCount, resultPerPage } =
    useSelector((state) => state.products);
  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHanlder = (selectedRange) => {
    setPrice(selectedRange);
  };

  const handleCategory = (category) => {
    console.log(category);
    setCategory(category);
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, error, keyword, currentPage, price, category, ratings]);
  const priceFilter = [
    { value: [0, 5000], label: "$0 - $5000" },
    { value: [5000, 10000], label: "$5000 - $10000" },
    { value: [10000, 15000], label: "$10000 - $15000" },
    { value: [15000, 20000], label: "$15000 - $20000" },
    { value: [20000, 100000], label: "$20000 and above" },
  ];
  const handleClearFilter = (e) => {
    e.preventDefault();
    setCategory("");
    setPrice([0, 25000]);
    setRatings(0);
  };
  return (
    <Fragment>
      <MetaData title="Product Page" />
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h4 className="text-center mt-5 mb-2">Products Page</h4>
          <div className="line w-25 mx-auto my-3 "></div>
          <div className="container-fluid">
            <div className=" row px-2">
              <div className="col-lg-2 col-md-4 col-10 p-3 mx-auto border h-75 shadow-sm mb-3 ">
                <h6>Price</h6>
                <div className="mb-2">
                  {priceFilter.map((item) => (
                    <div key={item.value}>
                      <label>
                        <input
                          type="checkbox"
                          value={item.value}
                          checked={
                            price[0] === item.value[0] &&
                            price[1] === item.value[1]
                          }
                          className="me-2"
                          onChange={() => priceHanlder(item.value)}
                        />
                        {item.label}
                      </label>
                    </div>
                  ))}
                </div>
                <h6>Categories</h6>
                <div className="mb-2">
                  {categories.map((item, index) => (
                    <div className="category-link" key={index}>
                      <label className="category-label">
                        <input
                          type="checkbox"
                          value={category}
                          className="me-2"
                          onChange={() => handleCategory(item)}
                          checked={item === category}
                        />

                        {item}
                      </label>
                    </div>
                  ))}
                </div>

                <fieldset>
                  <h6>Rating</h6>
                  <input
                    value={ratings}
                    onChange={(e) => {
                      setRatings(e.target.value);
                    }}
                    type="range"
                    min="0"
                    max="5"
                    id="customRange2"
                    className="border-none"
                  />
                </fieldset>
                <button className="mt-3 mb-2 fs-6" onClick={handleClearFilter}>
                  Clear Filter
                </button>
              </div>
              <div className="col-lg-10 col-md-8 col-12 ">
                <div className="d-flex flex-wrap justify-content-center ">
                  {products &&
                    products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                </div>
              </div>
            </div>
          </div>
          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Product;
