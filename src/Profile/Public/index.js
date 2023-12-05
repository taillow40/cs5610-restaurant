import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as client from "src/store/api";
import { useState, useEffect } from "react";
import {
    addProfile,
    deleteProfile,
    updateProfile,
    setProfile,
} from "src/Profile/profilesReducer";
import {
    addComment,
    deleteComment,
    updateComment,
    setComment,
} from "src/Comment/commentsReducer";
import "./index.css";
function Public() {
    const { profileId } = useParams();
    const [profile, setProfile] = useState(null);
    const [friends, setFriends] = useState([]);
    const [reviews, setReviews] = useState([]);
    const fetchProfile = async () => {
        const fetchedProfile = await client.findUserById(profileId);
        setProfile(fetchedProfile);
        fetchFriends(fetchedProfile._id);
        fetchReviews(fetchedProfile._id)
    }
    
    const fetchFriends = async (profileId) => {
        const friends = await client.friends(profileId);
        setFriends(friends);
    }
    const fetchReviews = async (profileId) => {
        const reviews = await client.reviews(profileId);
        setReviews(reviews);
    }
    
    const navigate = useNavigate();
    
    useEffect(()=>{
        fetchProfile();
    }, [profileId]);

    const addFriend = async () => {
        const loggedInUser = await client.account();
        const loggedInId = loggedInUser.data._id;
        console.log('account:', loggedInId)
        const friend = profileId;
        const addFriend = await client.addFriend(loggedInId, friend);
    }


    return (
        <div className="profile">
            <h1>Public Profile</h1>
            {profile && <div className="profile-grid">
                <span className="profile__first-name">{profile.first_name}</span>
                <span className="profile__last-name">{profile.last_name}</span>
                <button onClick={addFriend}>Add Friend</button>
                <div className="profile__friends">
                    <h2>Friends</h2>
                    <ul className="profile__friends__list">
                        {friends && friends.map((friend) => (
                            <li key={friend._id}>
                                <Link to={`/profile/${friend._id}`} className="profile__friends__text">
                                    Friend: {friend.first_name} {friend.last_name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="profile__comments">
                    <h2>Reviews</h2>
                    <ul className="profile__comments__list">
                        {reviews && reviews.map((review) => (
                            <li key={review._id}>
                                {review.content}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>}
        </div>
    );
}
export default Public;