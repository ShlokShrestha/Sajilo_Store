import React from "react";
import "./CartItem.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item }) => {
  return (
    <>
      <div className="CartItemCard">
        <img src={item.image} alt="sss" />
        <div className="d-flex flex-column">
          <Link to={`/product/${item.product}`} className="fs-5 my-1 text-dark">
            {item.name}
          </Link>
          <h5>{`$${item.price}`}</h5>
        </div>
      </div>
    </>
  );
};

export default CartItemCard;
