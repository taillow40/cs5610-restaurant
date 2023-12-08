import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import * as client from "src/store/api";
import * as favorites from "src/store/favorites";
import * as likes from "src/store/albums";
import { useState, useEffect } from "react";
// Comment out for not getting used
// import {
//     addProfile,
//     deleteProfile,
//     updateProfile,
//     setProfile,
// } from "src/Profile/profilesReducer";
// import {
//     addComment,
//     deleteComment,
//     updateComment,
//     setComment,
// } from "src/Comment/commentsReducer";
import "./index.css";
import StarRating from "src/Home/Search/starRating";
function Public() {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [friends, setFriends] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [favs, setFavs] = useState([]);
  const [liked, setLiked] = useState([]);
  const [user, setUsr] = useState({});

  const fetchProfile = async () => {
    const fetchedProfile = await client.findUserById(profileId);
    if (!fetchedProfile) return;
    setProfile(fetchedProfile);
    fetchFriends(fetchedProfile._id);
    fetchReviews(fetchedProfile._id);
  };

  const fetchFriends = async (profileId) => {
    const friends = await client.friends(profileId);
    setFriends(friends);
  };
  const fetchReviews = async (profileId) => {
    const reviews = await client.reviews(profileId);
    setReviews(reviews);
  };

  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchLikeds();
    fetchUserFavs(profileId);
  }, [profileId]);

  const fetchUserFavs = async (profileId) => {
    try {
      if(!profileId) return;
      const response = await favorites.onGetUserFavoritesFull(profileId);
      setFavs(response?.restaurants || []);
    } catch (error) {}
  };

  const addFriend = async () => {
    const loggedInUser = await client.account();
    const loggedInId = loggedInUser?.data?._id;
    setUsr(loggedInUser?.data);
    await client.addFriend(loggedInId, profileId);
    fetchProfile();
  };

  const fetchLikeds = async () => {
    const likedAlbums = await likes.findAllAlbumsUserLiked(profileId);
    setLiked(likedAlbums);
  };
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
  const avgRating = (rating) => {
    let sum = 0;
    for (var i = 0; i < rating.length; i++) {
      sum += rating[i];
    }
    return sum / rating.length;
  };
  return (
    <div className="profile">
      <h1>Public Profile</h1>
      {profile && (
        <div className="profile-grid">
          <div className="profile__first-name">
            First Name: <strong>{profile.first_name}</strong>
          </div>
          <div className="profile__last-name">
            Last Name:<strong>{profile.last_name}</strong>
          </div>

          <div className="profile__some">
            Profile URL:<strong>{window.location.href}</strong>{" "}
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("URL Copied to Clipboard");
              }}
            >
              Copy URL
            </button>
          </div>
          <button
            onClick={() =>
              user
                ? addFriend()
                : () => {
                    navigate("/login");
                  }
            }
          >
            Add Friend
          </button>
          <div className="profile__friends">
            <h2>Friends</h2>
            <ul className="profile__friends__list">
              {friends &&
                friends.map((friend) => (
                  <li key={friend._id}>
                    <Link
                      to={`/profile/${friend._id}`}
                      className="profile__friends__text"
                    >
                      Friend: {friend.first_name} {friend.last_name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="profile__comments">
            <h2>Reviews</h2>
            <ul className="profile__comments__list">
              {reviews &&
                reviews.map((review) => (
                  <li key={review._id}>{review.content}</li>
                ))}
            </ul>
          </div>

          <div className="profile__comments" style={{ marginTop: "15rem" }}>
            <h2>Liked</h2>
            <ul className="profile__comments__list">
              {favs.length ? (
                <ol>
                  {favs.map((result) => {
                    return (
                      <Link key={result._id} to={`/restaurant/${result._id}`}>
                        <li
                          key={result._id}
                          className="restaurantList"
                          style={{
                            listStyle: "",
                          }}
                        >
                          <h3 style={{ color: "blue" }}>{result.name}</h3>
                          <button
                            onClick={(e) => detectFavUnFavButton(e, result._id)}
                          >
                            Toggle Favorite
                          </button>
                          <div className="d-flex">
                            <StarRating rating={avgRating(result.reviews)} />{" "}
                            <p>{result.reviews.length} reviews</p>
                          </div>
                          <h5>
                            {result.streetAddress}, {result.City},{" "}
                            {result.zipCode}
                          </h5>
                          <h5>{result.cuisine}</h5>
                        </li>
                      </Link>
                    );
                  })}
                </ol>
              ) : (
                <p>Users have no liked restaurants</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
export default Public;
