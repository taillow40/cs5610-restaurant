import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
import * as client from "src/store/api";
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
function Public() {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [friends, setFriends] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [liked, setLiked] = useState([]);
  const [user, setUsr] = useState({});
  const fetchProfile = async () => {
    const fetchedProfile = await client.findUserById(profileId);
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
  }, [profileId]);

  const addFriend = async () => {
    const loggedInUser = await client.account();
    if (!loggedInUser) return alert("Please Provide Token");
    const loggedInId = loggedInUser?.data?._id;
    setUsr(loggedInUser?.data)
    console.log("account:", loggedInId);
    const friend = profileId;
   await client.addFriend(loggedInId, friend);
  };

  const fetchLikeds = async () => {
    const likedAlbums = await likes.findAllAlbumsUserLiked(profileId);
    setLiked(likedAlbums);
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
            Profile URL:<strong>{window.location.href}</strong> <button onClick={() => {
                 navigator.clipboard.writeText(window.location.href)
                 alert("URL Copied to Clipboard")
            }}>Copy  URL</button>
          </div>
          <button onClick={user?._id ? addFriend : () =>{
            navigate("/login")
          }}>Add Friend</button>
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
          
          <div className="profile__comments" style={{marginTop: "15rem"}}>
            <h2>Liked</h2>
            <ul className="profile__comments__list">
              {liked.length ?
                liked.map((review) => (
                  <li key={review._id}>{review.albumTitle}</li>
                )) : (
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
