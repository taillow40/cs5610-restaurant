import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as client from "src/Profile/client";
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
function Personal() {
    const [profile, setProfile] = useState(null);
    const [friends, setFriends] = useState([]);

    const fetchProfile = async () => {
        try {
          const token = localStorage.getItem("token");
          console.log("Token in profile", token);
          if (!token) {
            // Handle the case where the token is missing
            console.error("Token is missing");
            return;
          }
    
          // Include the token in the request headers
          const headers = { Authorization: `${token}` };
          const fetchedProfile = await client.account(headers);
    
          setProfile(fetchedProfile);
          console.log("Fetched Profile:", fetchedProfile);
          //fetchFriends(fetchedProfile._id);
        } catch (error) {
          // Handle errors, e.g., token validation failure or network issues
          console.error("Error fetching profile:", error);
        }
      };
    
    const fetchFriends = async (profileId) => {
        const friends = await client.friends(profileId);
        console.log(profile);
        setFriends(friends);
    }
    
    const navigate = useNavigate();
    
    useEffect(()=>{
        fetchProfile();
    }, []);

    //const comments = useSelector((state) => state.commentsReducer.comments).filter((comment) => comment.user_id == profile._id);;
    const comments = [];

    return (
        <div className="profile">
            <h1>Personal Profile</h1>
            {profile && <div className="profile-grid">
                <span className="profile__first-name">{profile.data.first_name}</span>
                <span className="profile__last-name">{profile.data.last_name}</span>
                <span className="profile__phone">{profile.data.email}</span>
                <span className="profile__email">{profile.data.phone}</span>
                <div className="profile__friends">
                    <h2>Friends</h2>
                    <ul className="profile__friends__list">
                        {friends.map((friend) => (
                            <li key={friend}>
                                <Link to={`/profile/${friend}`} className="profile__friends__text">
                                    Friend: {friend.first_name} {friend.last_name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="profile__comments">
                    <h2>Comments</h2>
                    <ul className="profile__comments__list">
                        {comments.map((comment) => (
                            <li key={comment._id}>
                                {comment.text}
                            </li>
                        ))}
                    </ul>
                </div>
                <button className="profile__edit"
                    onClick={() => navigate(`/profile/edit`)}>
                    Edit</button>
            </div>}
        </div>
    );
}
export default Personal;