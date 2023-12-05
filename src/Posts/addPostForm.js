import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import {useNavigate} from 'react-router-dom';
import './styling/posts.css'
import * as client from "src/store/api";
import PostStars from "./postStars"
import * as restaurantClient from "src/store/restaurants";
import * as reviewClient from "src/store/reviews";
import { useParams } from 'react-router-dom';

const AddPostForm = ({restaurantId}) => {

    const [loggedInUser, setLoggedInUser] = useState({});

    const [restaurant, setRestaurant] = useState('');
    const [content, setContent] = useState('');
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
    

    const onRestaurantChanged = e => setRestaurant(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onRatingChanged = (newRating) => setRating(newRating);
    

    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {
      const findRestaurant = async () => {
        console.log(restaurantId);
        const restaurant = await restaurantClient.findRestaurantById(restaurantId);
        setRestaurant(restaurant);
      };
      const findUser = async () => {
        const fetchedProfile = await client.account();
        if (fetchedProfile) {
          setLoggedInUser(fetchedProfile?.data);
        } else {
          navigate("/login");
        }
      }
      findUser();
      findRestaurant();
    }, []);

      const onPostReview = () => {
        if (restaurant && content) {
          const reviewData = {
            id: nanoid(),
            restaurant_id: restaurantId,
            content: content,
            user_id: loggedInUser._id,
            content_accomodations: '',
            accomodations: allergyRatings,
            rating: rating,
          };

          //dispatch(postAdd(reviewData));
          reviewClient.createReview(reviewData);

          setRestaurant('');
          setContent('');
          setSelectedAllergy('');
          setAllergyRating(0);
        }
    
        navigate(`/restaurant/${restaurantId}`);
      };
    
      const [canPost, setCanPost] = useState(false);

      useEffect(() => {
        setCanPost(Boolean(restaurant) && Boolean(content) && Boolean(loggedInUser._id));
      }, [restaurant, content, loggedInUser]);

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


  return (
    <div>
        <form className="postForm">
            <label htmlFor='postRestaurant'>Restaurant:</label>
            <input
            type="text"
            id="postRestaurant"
            name="postRestaurant"
            value={restaurant.name}
            onChange={() => {}}
            disabled='disabled'>
            </input>
            <label htmlFor="postAuthor">Author:</label>
            <input
              type="text"
              id="postAuthor"
              name="postAuthor"
              value={loggedInUser.first_name + " " + loggedInUser.last_name}
              onChange={() => {}}
              disabled='disabled'>
            </input>
            <label htmlFor='postContent'>Content:</label>
            <textarea
                id="postContent"
                name="postContent"
                value={content}
                onChange={onContentChanged}
                />
             <label htmlFor="rating">Rating:</label>
             <PostStars value={rating} onClick={setRating} />
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