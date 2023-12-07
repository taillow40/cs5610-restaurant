import React, { useState, useEffect } from 'react';

  const RestaurantCard = ({ name, cuisine, rating, image }) => {
    const [imgSrc, setImgSrc] = useState(null);
  
    const restaurantCard = {width: "200px", height: "225px", border: "1px solid black", margin: 10};

    const restaurantInfo = {padding: 5};

    const imageStyle = {
      width: '100%',
      height: '30%',
      objectFit: 'cover',
    };
  

    useEffect(() => {
      // Dynamically import the image using dynamic import
      import(`../Images/${image}`)
        .then((module) => {
          setImgSrc(module.default);
        })
        .catch((error) => {
          console.error(error);
        });
    }, [image]);
  
  return (
    <div style={restaurantCard}>
      {imgSrc && <img src={imgSrc} alt={name} style={imageStyle} />}
      <div style={restaurantInfo}>
        <h3>{name}</h3>
        <p>Cuisine: {cuisine}</p>
        <p>Rating: {rating}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;