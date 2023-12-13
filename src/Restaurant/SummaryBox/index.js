import React from "react";
import { Link, useNavigate } from "react-router-dom";
import StarRating from "src/Home/Search/starRating";
import * as client from "src/store/api";
import * as favorites from "src/store/favorites";
import "./index.css";

const avgRating = (rating) => {
  let sum = 0;
  for (var i = 0; i < rating.length; i++) {
    sum += rating[i];
  }
  return sum / rating.length;
};

function SummaryBox({ restaurants, reviews }) {
  const navigate = useNavigate();

  // Can add preferences to users - will be able to add a ForYou section
  // List all 6 accomodations, stored as list [scoreSummary, validReviewCount]
  let gluten = sumReview(reviews, 'gluten_free');
  let nut = sumReview(reviews, 'nut_free');
  let dairy = sumReview(reviews, 'dairy_free');
  let shellfish = sumReview(reviews, 'shellfish');
  let vegetarian = sumReview(reviews, 'vegetarian');
  let vegan = sumReview(reviews, 'vegan');

  const detectFavUnFavButton = async (e, resId) => {
    e.preventDefault();
    e.stopPropagation();
    const fetchedProfile = await client.account();
    if (!fetchedProfile) return navigate("/login");
    const userId = fetchedProfile?.data?._id;
    const response = await favorites.onGetUserFavorites(userId);
    const restaurant = response.restaurants?.find((res) => res == resId);
    return restaurant ? onRemoveFromFav(e, resId) : onAddToFav(e, resId);
  };
  const onAddToFav = async (e, restaurantId) => {
    const fetchedProfile = await client.account();
    const userId = fetchedProfile?.data?._id;
    await favorites.onAddToFavorites({
      userId,
      restaurantId,
    });
    alert("Added to favorites");
  };
  const onRemoveFromFav = async (e, restaurantId) => {
    const fetchedProfile = await client.account();
    const userId = fetchedProfile?.data?._id;
    await favorites.onRemoveFromFavorites({
      userId,
      restaurantId,
    });
    alert("Removed from favorites");
  };
  return (
    <div className="foryou-wrapper">
      <h2>Accomodations:</h2>
          <p>Gluten free: {displayAccomodation(gluten)}</p>
          <p>Nuts: {displayAccomodation(nut)}</p>
          <p>Dairy: {displayAccomodation(dairy)}</p>
          <p>Shellfish: {displayAccomodation(shellfish)}</p>
          <p>Vegetarian: {displayAccomodation(vegetarian)}</p>
          <p>Vegan: {displayAccomodation(vegan)}</p>
      <aside className="foryou">
        {React.Children.toArray(
          restaurants?.map((result) => {
            return (
              <Link
                className=""
                key={result.id}
                onClick={() => {
                  // navigate(`restaurant/${result._id}`)
                  console.log(window.location);
                  window.location.href = `${window.location.protocol}//${window.location.host}/restaurant/${result._id}`
                }}
              >
                <li
                  key={result.id}
                  className="restaurantList"
                  style={{
                    listStyle: "",
                  }}
                >
                  <h3 style={{ color: "blue" }}>{result.name}</h3>
                  <button onClick={(e) => detectFavUnFavButton(e, result._id)}>
                    Toggle Favorite
                  </button>
                  <div className="d-flex">
                    <StarRating rating={avgRating(result.reviews)} />{" "}
                    <p>{result.reviews.length} reviews</p>
                  </div>

                  <h5>
                    {result.streetAddress}, {result.City}, {result.zipCode}
                  </h5>
                  <h5>{result.cuisine}</h5>
                </li>
              </Link>
            );
          })
        )}
      </aside>
    </div>
  );
}

function sumReview(reviews, index) {
  let sumAndCount = [0,0];
  reviews.forEach((review) => {
      let accomodationScore = review.accomodations[index];
      if (accomodationScore >= 0 && accomodationScore <= 5) {
          sumAndCount[0] += accomodationScore;
          sumAndCount[1] += 1;
      }
  })
  return sumAndCount;
}

function displayAccomodation(accomodation) {
  return(
      <div>
          {accomodation[1] === 0
          ? <div>{(accomodation[0]/accomodation[1]).toFixed(1)}/5. {accomodation[1]} people rated this.</div>
          : <div>No ratings so far.</div>}
      </div>
  )
}


export default SummaryBox;
