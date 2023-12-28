import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProduct,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { addItemsCard } from "../../actions/cartAction";
import { FaPlus, FaMinus } from "react-icons/fa6";
import StarRatings from "react-star-ratings";
import { TiTick } from "react-icons/ti";
import MetaData from "../layout/MetaData";
import { NEW_REVIEW_RESET } from "../../contants/productConstants";
import ProductCard from "./ProductCard";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );
  const { products } = useSelector((state) => state.products);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [quantity, setQuantity] = useState(1);
  const increasequantity = () => {
    if (product.Stock <= quantity) return;
    setQuantity((qtn) => qtn + 1);
  };
  const decreasequantity = () => {
    if (1 >= quantity) return;
    setQuantity((qtn) => qtn - 1);
  };

  const addToCartHandler = () => {
    dispatch(addItemsCard(id, quantity));
    alert("Item is added to cart");
  };

  const reviewHandleSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("rating", rating);
    myForm.append("comment", comment);
    myForm.append("productId", id);
    dispatch(newReview(myForm));
    setRating(0);
  };

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      alert("Review submit successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
    dispatch(getProduct());
  }, [dispatch, id, error, reviewError, success, alert]);
  
  return (
    <>
      <MetaData title={product.name} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="ProductDetails">
            <div className="row ">
              <div className="col-lg-6 col-md-6 col-10 mx-auto my-2 product_img">
                {product.image && product.image.length > 0 && (
                  <img className=" w-75" src={product.image[0].url} alt="img" />
                )}
              </div>
              <div className="col-lg-6 col-md-6 my-2">
                <h2 className="fs-3 text-capitalize ">{product.name}</h2>
                <div className="d-flex align-items-center flex-wrap">
                  <span className="card-text d-flex align-items-center mb-1 me-2">
                    <StarRatings
                      rating={product.ratings}
                      starRatedColor="#f7941d"
                      starDimension="18px"
                      starSpacing="2px"
                      numberOfStars={5}
                      name="rating"
                    />
                  </span>
                  <span className="">({product.numOfReviews} Reviews)</span>
                </div>
                <h4 className="my-2">{`$${product.price}`}</h4>
                <div className="my-2">
                  <b>Description :</b>{" "}
                  <p className="my-2 text-secondary">{product.description}</p>
                </div>
                <div className="d-flex align-items-center my-2 flex-wrap">
                  <div className="my-auto me-3">
                    <span className="me-3">Quantity:</span>
                    <span
                      onClick={decreasequantity}
                      className="text-center fs-6 qtnBtn"
                    >
                      <FaMinus />
                    </span>
                    <span className="fs-5 cart-quantity ">{quantity}</span>
                    <span
                      onClick={increasequantity}
                      className="text-center fs-6 qtnBtn"
                    >
                      <FaPlus />
                    </span>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                    className="fs-6 my-2"
                  >
                    Add to Cart
                  </button>
                </div>

                <span className=" fs-5 d-flex my-2">
                  Status:{" "}
                  <div className="stock my-auto mb-1">
                    <span>
                      {product.Stock < 1 ? (
                        <div className="outStock">
                          <TiTick className="fs-5" />
                          Out Stock
                        </div>
                      ) : (
                        <div className="inStock">
                          <TiTick className="fs-5" />
                          In Stock
                        </div>
                      )}
                    </span>
                  </div>
                </span>
              </div>
            </div>
          </div>

          <div className="mb-5">
            <h4 className="text-center mt-5 mb-3">Review</h4>
            <div className="line w-25 mx-auto mb-5 "></div>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-10 mx-auto">
                  {product.reviews && product.reviews[0] ? (
                    <div className="reviews">
                      {product.reviews &&
                        product.reviews.map((review) => (
                          <ReviewCard key={review._id} review={review} />
                        ))}
                    </div>
                  ) : (
                    <p className="noReviews">No Reviews Yet</p>
                  )}
                </div>
                <div className="col-lg-6 col-md-10 mx-auto">
                  <h5>Leave a review</h5>

                  <form className="my-4" onSubmit={reviewHandleSubmit}>
                    <div className="my-2">
                      <input
                        type="text"
                        className="w-100 form-control shadow-none"
                        placeholder="Name*"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="my-3 d-flex align-items-center">
                      <h6 className="mb-0 me-2 fs-5">Your Rating:</h6>
                      <div className="mb-2">
                        <StarRatings
                          rating={rating}
                          starRatedColor="#f7941d"
                          starDimension="18px"
                          starSpacing="2px"
                          numberOfStars={5}
                          name="rating"
                          changeRating={(e) => setRating(e)}
                        />
                      </div>
                    </div>
                    <div className="my-2">
                      <textarea
                        name="textbox"
                        id=""
                        cols="30"
                        rows="20"
                        className="w-100 form-control shadow-none"
                        placeholder="Your Review"
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <button className="w-25 my-3 ">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-5">
            <h4 className="text-center mt-5 mb-3">Feature Product</h4>
            <div className="line w-25 mx-auto mb-5 "></div>
            <div className="d-flex flex-wrap justify-content-center ">
              {products &&
                products
                  .slice(0, 3)
                  .map((item) => <ProductCard key={item._id} product={item} />)}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
