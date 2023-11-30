import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { addItemsCard } from "../../actions/cartAction";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const addToCartHandler = (id, qtn) => {
    dispatch(addItemsCard(id, qtn));
  };
  return (
    <div className="productCard text-dark ">
      <div className="card" style={{ width: "16rem" }}>
        <Link to={`/product/${product._id}`}>
          <div className="text-center p-3 card-imgs ">
            <img
              src={product.image && product.image[0].url}
              alt={product.name}
            />
          </div>
          <div className="card-body">
            <p className="card-title m-0 fs-5 ">{product.name.slice(0, 25)}</p>
            <span className="card-text d-flex  align-items-center mb-1">
              <StarRatings
                rating={product.ratings}
                starRatedColor="#f7941d"
                starDimension="18px"
                starSpacing="1px"
                numberOfStars={5}
                name="rating"
              />
            </span>
            <div className="fw-bold">{`$${product.price}`}</div>
          </div>
        </Link>
        <button
          className=" mx-3 mb-3 fs-6"
          onClick={() => addToCartHandler(product._id, 1)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
