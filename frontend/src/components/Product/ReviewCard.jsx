import React from "react";

import StarRatings from "react-star-ratings";

const ReviewCard = ({ review }) => {
  const isoDate = new Date(review.createAt);
  const createDate = isoDate.toLocaleDateString();

  return (
    <div className="reviewCard row mb-2">
      <div className="col-md-2 col-sm-2 col-12 mb-3">
        <div className="profileImg">
          <img src={review.avatar} alt="user" />
        </div>
        <span className="m-0">
          <StarRatings
            rating={review.rating}
            starRatedColor="#f7941d"
            starDimension="13px"
            starSpacing="0px"
            numberOfStars={5}
          />
        </span>
      </div>
      <div className="col-md-10 col-sm-10 col-12 mx-auto">
        <div className="fs-6 mb-1 text-danger">{createDate}</div>
        <h6 className="mb-0">{review.name}</h6>

        <p>{review.comment}</p>
      </div>
    </div>
  );
};

export default ReviewCard;

{
  /* <div className="reviewCard row mb-2">
      <div className="col-md-2 col-sm-2 col-2">
        <img src={profilePng} alt="User" />
      </div>
      <div className="col-md-10 col-sm-10 col-10 ">
        <div className="fs-6 mb-1 text-danger">{createDate}</div>
        <h6 className="mb-0">{review.name}</h6>
        <span className="m-0">
          <StarRatings
            rating={review.rating}
            starRatedColor="#f7941d"
            starDimension="16px"
            starSpacing="0px"
            numberOfStars={5}
          />
        </span>
        <p>{review.comment}</p>
      </div>
    </div> */
}
