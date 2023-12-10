import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import * as client from "src/store/api";
import * as follows from "src/store/follows";
import * as favorites from "src/store/favorites";
import * as likes from "src/store/albums";
import { useState, useEffect } from "react";
import "./index.css";
import StarRating from "src/Home/Search/starRating";
const colors = [
  "blue",
  "red",
  "green",
  "lightblue",
  "darkyellow",
  "orange",
  "purple",
  "darkgreen",
  "maroon",
  "darkred",
];
function Public() {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [friends, setFriends] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [tabs] = useState([
    { text: "Reviews", id: 1 },
    { text: "Liked", id: 2 },
    { text: "Followers", id: 3 },
    { text: "Followings", id: 4 },
  ]);
  const [selected, setSelected] = useState(null);
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
    getFollowersOfUser();
    getFollowingsOfUser();
    setSelected(null);
  }, [profileId]);

  const fetchUserFavs = async (profileId) => {
    try {
      if (!profileId) return;
      const response = await favorites.onGetUserFavoritesFull(profileId);
      setFavs(response?.restaurants || []);
    } catch (error) {}
  };

  const followUser = async () => {
    const loggedInUser = await client.account();
    if (!loggedInUser) return navigate("/login");
    const loggedInId = loggedInUser?.data?._id;
    if (loggedInId === profileId) return alert("You cannot follow yourself");
    await follows.followUser({ userId: loggedInId, followingId: profileId });
    getFollowingsOfUser();
    getFollowersOfUser();
  };

  const getFollowersOfUser = async () => {
    const followersOfPerson = await follows.findUserFollowers(profileId);
    setFollowers(followersOfPerson?.map((f) => f.user));
  };
  const getFollowingsOfUser = async () => {
    const followersOfPerson = await follows.findUserFollowings(profileId);
    setFollowings(followersOfPerson?.map((f) => f.followings)[0]);
  };

  // const addFriend = async () => {
  //   const loggedInUser = await client.account();
  //   if (!loggedInUser) return navigate("/login");
  //   const loggedInId = loggedInUser?.data?._id;
  //   setUsr(loggedInUser?.data);
  //   await client.addFriend(loggedInId, profileId);
  //   fetchProfile();
  // };

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
        <div className="public-profile">
          <section>
            <div>First name</div>
            <div>{profile.first_name}</div>
          </section>
          <section>
            <div>Last name</div>
            <div>{profile.last_name}</div>
          </section>
          <section>
            <div>Email</div>
            <div>{profile.email}</div>
          </section>
          <section>
            <div>Phone number</div>
            <div>{profile.phone_number}</div>
          </section>
          <section>
            <div>User Type</div>
            <div>{profile.type}</div>
          </section>
          <section>
            <div>Favorite Cuisine</div>
            <div>{profile.cuisine}</div>
          </section>
          <section>
            <div>Profile URL:</div>
            <div style={{ display: "inline-flex", gap: "1rem" }}>
              <strong>{window.location.href}</strong>{" "}
              <button
                className="btn-copy"
                onClick={() => {
                  navigator.clipboard
                    .writeText(window.location.href)
                    .then(() => {
                      alert("URL Copied to Clipboard");
                    })
                    .catch((error) => {
                      console.info("Couldn't copy text to clipboard:", error);
                    });
                }}
              >
                Copy URL
              </button>
            </div>
          </section>
          <button
            className="btn-edit"
            onClick={() =>
              user
                ? followUser()
                : () => {
                    navigate("/login");
                  }
            }
          >
            Follow
          </button>
        </div>
      )}

      <section className="tabs">
        {React.Children.toArray(
          tabs.map((tab) => (
            <h3
              className={`tab ${selected === tab.id && "selected"}`}
              onClick={() => setSelected(tab.id)}
            >
              {tab.text}
            </h3>
          ))
        )}
      </section>

      <section>
        {selected === 1 && (
          <ul className="profile__comments__list">
            {reviews &&
              reviews.map((review) => (
                <li key={review._id}>{review.content}</li>
              ))}
          </ul>
        )}
        {selected === 2 && (
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
        )}

        {selected === 3 && (
          <ul className="profile__friends__list">
            {followers?.map((friend) => (
              <li key={friend._id}>
                <aside
                  className="profile-card"
                  onClick={() => navigate(`/profile/${friend._id}`)}
                >
                  <div
                    className="dp"
                    style={{
                      backgroundColor:
                        colors[Math.floor(Math.random() * colors.length)],
                    }}
                  >
                    {friend.first_name.slice(0, 1)}{" "}
                    {friend.last_name.slice(0, 1)}
                  </div>
                  <div className="name">
                    {friend.first_name} {friend.last_name}
                  </div>
                </aside>
              </li>
            ))}
          </ul>
        )}
        {selected === 4 && (
          <ul className="profile__friends__list">
            {followings?.map((friend) => (
              <li key={friend._id}>
                <aside
                  className="profile-card"
                  onClick={() => navigate(`/profile/${friend._id}`)}
                >
                  <div
                    className="dp"
                    style={{
                      backgroundColor:
                        colors[Math.floor(Math.random() * colors.length)],
                    }}
                  >
                    {friend.first_name.slice(0, 1)}{" "}
                    {friend.last_name.slice(0, 1)}
                  </div>
                  <div className="name">
                    {friend.first_name} {friend.last_name}
                  </div>
                </aside>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
export default Public;
