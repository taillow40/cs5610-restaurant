import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      if (i <= filledStars) {
        // Fully filled star
        stars.push(<FaStar key={i} />);
      } else if (hasHalfStar && i === filledStars + 1) {
        // Half-filled star
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        // Empty star
        stars.push(<FaStar key={i} style={{ opacity: 0.5 }} />);
      }
    }

    return stars;
  };

  return(<div>{renderStars()}</div>);
};

export default StarRating;