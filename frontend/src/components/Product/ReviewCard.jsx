import React from "react";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>

      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
