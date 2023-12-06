import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { postAdd } from './postsSlice';
import { selectAllUsers } from '../Home/Users/usersSlice';
import {useNavigate} from 'react-router-dom';
import './styling/posts.css'
import PostStars from "./postStars"

import db from "src/Database";

const AddPostForm = ({restaurantId}) => {

    const restaurants = db.restaurants;

    console.log("Restaurants: ", {restaurants});

    const [restaurant, setRestaurant] = useState('');
    const [content, setContent] = useState('');
    const [accomContent, setAccomContent] = useState('');
    const [userId, setUserId] = useState('');
    const [rating, setRating] = useState(0);
    const [selectedAllergy, setSelectedAllergy] = useState('');
    const [allergyRating, setAllergyRating] = useState(0);
    const [allergyRatings, setAllergyRatings] = useState({
        "gluten_free": 0,
        "nut_free": 0,
        "dairy_free": 0,
        "shellfish": 0,
        "vegetarian": 0,
        "vegan": 0
    });

    const [selectedAllergies, setSelectedAllergies] = useState([]);
    const [showAllergyRating, setShowAllergyRating] = useState(false);

    const allergies = ['gluten-Free', 'nut-Free', 'dairy-Free', 'shellfish', 'vegetarian', 'vegan'];
    
    const users = useSelector(selectAllUsers);

    const onRestaurantChanged = e => setRestaurant(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAccomContentChanged = e => setAccomContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)
    const onRatingChanged = (newRating) => setRating(newRating);
    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("Restaurant ID: ", restaurantId)

    useEffect(() => {
        // Find the restaurant based on restaurantId and set its name
        const selectedRestaurant = restaurants.find((r) => r.id == restaurantId);
        console.log("Selected Restaurant ", selectedRestaurant);
        if (selectedRestaurant) {
          setRestaurant(selectedRestaurant.name);
        }
      }, [restaurantId, restaurants]);

      const onPostReview = () => {
        if (restaurant && content) {
          const reviewData = {
            id: nanoid(),
            restaurant_id: restaurantId,
            content: content,
            user_id: userId,
            content_accomodations: accomContent,
            accomodations: allergyRatings,
            rating: rating,
          };

          dispatch(postAdd(reviewData));
    
          setRestaurant('');
          setContent('');
          setSelectedAllergy('');
          setAllergyRating(0);
        }
    
        navigate(`/restaurant/${restaurantId}`);
      };

    const canPost = Boolean(restaurant) && Boolean(content) && Boolean(userId)

    const userOptions = users.map(user => (
        <option key={user._id} value={user._id}>
            {user.first_name + " " + user.last_name} 
        </option> 
    ))

    const allergyOptions = allergies.map((allergy) => (
        <option key={allergy} value={allergy}>
          {allergy}
        </option>
      ));

      const onAllergyChanged = (allergy) => {
        // When the allergy dropdown changes, dynamically set the allergy rating
        setSelectedAllergy(allergy);
        setAllergyRatings((prevRatings) => ({
          ...prevRatings,
          [allergy.toLowerCase().replace('-', '_')]: 0, // Initial rating set to 0
        }));
        setShowAllergyRating(true);
      };

      console.log("Selected Allergies:", selectedAllergies);
      console.log("Allergy Ratings:", allergyRatings);

  return (
    <div>
        <form className="postForm">
            <label htmlFor='postRestaurant'>Restaurant:</label>
            <input
            type="text"
            id="postRestaurant"
            name="postRestaurant"
            value={restaurant}
            onChange={() => {}}>
            </input>
            <label htmlFor="postAuthor">Author:</label>
            <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
                <option value=""></option>
                {userOptions}
            </select>
            <label htmlFor='postContent'>Restaurant Review:</label>
            <textarea
                id="postContent"
                name="postContent"
                value={content}
                onChange={onContentChanged}
                />
             <label htmlFor="rating">Rating:</label>
             <PostStars value={rating} onClick={setRating} />
             <label htmlFor='accomContent'>Accommodation Review:</label>
            <textarea
                id="accomContent"
                name="accomContent"
                value={accomContent}
                onChange={onAccomContentChanged}
                />
             <label htmlFor="allergyDropdown">Choose Allergy:</label>
             <select id="allergyDropdown" value={selectedAllergy} onChange={(e) => onAllergyChanged(e.target.value)}>
          <option value=""></option>
          {allergyOptions}
        </select>
        <button
            className="btn btn-primary"
            type="button"
            disabled={selectedAllergies.includes(selectedAllergy)}
            onClick={() => {
                setShowAllergyRating(true);
                setSelectedAllergies((prevSelectedAllergies) => [
                ...prevSelectedAllergies,
                selectedAllergy,
                ]);           
            }}>
            Add Allergy Rating
        </button>

        {selectedAllergies.map((allergy) => (
            <div key={allergy}>
                <label>Rate {allergy}:</label>
                <PostStars
                value={allergyRatings[allergy.toLowerCase().replace('-', '_')]}
                onClick={(rating) =>
                    setAllergyRatings((prevRatings) => ({
                    ...prevRatings,
                    [allergy.toLowerCase().replace('-', '_')]: rating,
                    }))
                }
                />
            </div>
            ))}
            <button className="btn btn-primary postButton" type="button"
            onClick={onPostReview} disabled={!canPost}>Post Review</button>
        </form>
    </div>
  )
}

export default AddPostForm