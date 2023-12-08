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
      <h2> For You:</h2>
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
      {/* To put here: <br />
            Anything that matches the user's preferences <br />
            Other restaurant detail that we can get, such as opening hours, map embed, etc <br />
            <br />
            <p>Other users say...: Gluten Free (80%)</p> */}
    </div>
  );
}

export default SummaryBox;
