import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";
import { addItemsCard } from "../../actions/cartAction";
import { FaPlus, FaMinus } from "react-icons/fa6";
import StarRatings from "react-star-ratings";
import { TiTick } from "react-icons/ti";
import MetaData from "../layout/MetaData";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

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
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getProductDetails(id));
    dispatch(getProductDetails(id));
  }, [dispatch, id, error]);
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

          <h4 className="text-center mt-5 mb-2">Products Page</h4>
          <div className="line w-25 mx-auto my-3 "></div>
          <div className="row">
            <div className="col-lg-6">
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
            <div className="col-lg-6">
              <h5>Leave a review</h5>

              <div className="">
                <div className="my-3">
                  Your Rating * :{" "}
                  <StarRatings
                    rating={product.ratings}
                    starRatedColor="#f7941d"
                    starDimension="18px"
                    starSpacing="2px"
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
                
                <p>Your Review *</p>
                <textarea name="textbox" id="" cols="30" rows="10"></textarea>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
