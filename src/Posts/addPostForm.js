import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import {useNavigate} from 'react-router-dom';
import './styling/posts.css'
import * as client from "src/store/api";
<<<<<<< HEAD
=======
import * as profileClient from "src/Profile/client";
>>>>>>> dev-js
import PostStars from "./postStars"
import * as restaurantClient from "src/store/restaurants";
import * as reviewClient from "src/store/reviews";
import { useParams } from 'react-router-dom';
<<<<<<< HEAD
=======

import db from "src/Database";
>>>>>>> dev-js

const AddPostForm = ({rest}) => {

<<<<<<< HEAD
    const [loggedInUser, setLoggedInUser] = useState({});
=======
    //const restaurants = db.restaurants;

    //console.log("Restaurants: ", {restaurants});
>>>>>>> dev-js

    const [loggedInUser, setLoggedInUser] = useState({});

    const [restaurant, setRestaurant] = useState({rest});
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
    

    const onRestaurantChanged = e => setRestaurant(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAccomContentChanged = e => setAccomContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)
    const onRatingChanged = (newRating) => setRating(newRating);
    

    const dispatch = useDispatch();
    const navigate = useNavigate();

<<<<<<< HEAD

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
=======
    console.log("Restaurant: ", rest);
    console.log("Restaurant ID: ", restaurant._id)


    useEffect(() => {
      const findUser = async () => {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `${token}` };
        console.log("TOKEN IN ADD REVIEW", token);
        const fetchedProfile = await profileClient.account(headers);
        console.log("Fetched profile in add review", fetchedProfile);
        if (fetchedProfile) {
          console.log("Fetched User Data", fetchedProfile?.data);
          setLoggedInUser(fetchedProfile?.data);
        } else {
          navigate("/login");
        }
      }
      findUser();

    }, []);

    console.log("Logged in user", loggedInUser);
    console.log("Logged in user", loggedInUser.first_name);

   /* useEffect(() => {
        // Find the restaurant based on restaurantId and set its name
        const selectedRestaurant = restaurants.find((r) => r.id == restaurantId);
        console.log("Selected Restaurant ", selectedRestaurant);
        if (selectedRestaurant) {
          setRestaurant(selectedRestaurant.name);
        }
      }, [restaurantId, restaurants]);
*/
>>>>>>> dev-js

      const onPostReview = () => {
        if (restaurant && content) {
          const reviewData = {
            id: nanoid(),
            restaurant_id: rest._id,
            content: content,
            user_id: loggedInUser._id,
            content_accomodations: accomContent,
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
    
        navigate(`/restaurant/${rest._id}`);
      };
    
      const [canPost, setCanPost] = useState(false);

<<<<<<< HEAD
      useEffect(() => {
        setCanPost(Boolean(restaurant) && Boolean(content) && Boolean(loggedInUser._id));
      }, [restaurant, content, loggedInUser]);
=======
     const [canPost, setCanPost] = useState(false);

      useEffect(() => {
        setCanPost(Boolean(restaurant) && Boolean(content) && Boolean(loggedInUser._id));
      }, [restaurant, content, loggedInUser]);

    const userOptions = users.map(user => (
        <option key={user._id} value={user._id}>
            {user.first_name + " " + user.last_name} 
        </option> 
    ))
>>>>>>> dev-js

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
<<<<<<< HEAD
            value={restaurant.name}
            onChange={() => {}}
            disabled='disabled'>
=======
            value={rest.name}
            onChange={() => {}}>
>>>>>>> dev-js
            </input>
            <label htmlFor="postAuthor">Author:</label>
            <input
            type="text"
            id="postAuthor"
            name="postAuthor"
            value={loggedInUser.first_name + " " + loggedInUser.last_name} 
            onChange={() => {}}>
            </input>
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
