import React from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as client from "src/Profile/client";
import { useState, useEffect } from "react";
import "./index.css";
function Public() {
    const { profileId } = useParams();
    const [profile, setProfile] = useState(null);
    const [friends, setFriends] = useState([]);
    const fetchProfile = async () => {
        const fetchedProfile = await client.findUserById(profileId);
        setProfile(fetchedProfile);
        fetchFriends(fetchedProfile._id);
        
    }
    
    const fetchFriends = async (profileId) => {
        const friends = await client.friends(profileId);
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
            <h1>Public Profile</h1>
            {profile && <div className="profile-grid">
                <span className="profile__first-name">{profile.first_name}</span>
                <span className="profile__last-name">{profile.last_name}</span>
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
            </div>}
        </div>
    );
}
export default Public;