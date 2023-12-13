import React, { useEffect } from 'react';
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { useState } from 'react';
const StarRating = ({ rating }) => {
  const [ratingNumber, setRatingNumber] = useState(rating);
  useEffect(() => {
    setRatingNumber(rating);
}, [rating]);
  const totalStars = 5;
  const filledStars = Math.floor(ratingNumber);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      if (i <= filledStars) {
        // Fully filled star
        stars.push(<FaStar key={i} />);
      } else if (hasHalfStar && i === filledStars + 1) {
        // Half-filled star
        stars.push(<FaRegStarHalfStroke key={i} />);
      } else {
        // Empty star
        stars.push(<FaRegStar key={i} />);
      }
    }

    return stars;
  };

  return(<div>{renderStars()}</div>);
};

export default StarRating;