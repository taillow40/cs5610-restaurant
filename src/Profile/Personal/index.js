import { Link, useNavigate } from "react-router-dom";
import * as client from "src/store/api";
import * as favoriteAPI from "src/store/favorites";
import * as follows from "src/store/follows";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import "./index.css";
import Cookies from "js-cookie";
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
function Personal() {
  const navigate = useNavigate();
  const cookieToken = Cookies.get("user");
  const [profile, setProfile] = useState(null);
  const [restaurants, setrestaurants] = useState([]);
  const [tabs] = useState([
    { text: "Favorite Restaurants", id: 1 },
    { text: "Followers", id: 2 },
    { text: "Followings", id: 3 },
    { text: "Reviews", id: 4 },
  ]);
  const [reviews, setReviews] = useState([]);

  const [selected, setSelected] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      const fetchedProfile = await client.account();
      if (fetchedProfile) {
        setProfile(fetchedProfile?.data);
        fetchUserFavs(fetchedProfile?.data?._id);
      } else {
        navigate("/login");
      }
    };
    fetchProfile();
    getFollowersOfUser();
    getFollowingsOfUser();
    fetchReviews();
  }, [cookieToken, navigate]);

  const fetchUserFavs = async (profileId) => {
    try {
      if (!profileId) return;
      const response = await favoriteAPI.onGetUserFavoritesFull(profileId);
      setrestaurants(response?.restaurants);
    } catch (error) {}
  };

  const fetchReviews = async (profileId) => {
    const fetchedProfile = await client.account();
    const reviews = await client.reviews(fetchedProfile.data._id);
    setReviews(reviews);
  };

  const getFollowersOfUser = async () => {
    const fetchedProfile = await client.account();
    const followersOfPerson = await follows.findUserFollowers(
      fetchedProfile.data._id
    );
    setFollowers(followersOfPerson?.map((f) => f.user));
  };
  const getFollowingsOfUser = async () => {
    const fetchedProfile = await client.account();
    const followersOfPerson = await follows.findUserFollowings(
      fetchedProfile.data._id
    );
    setFollowings(followersOfPerson?.map((f) => f.followings)[0]);
  };

  const detectFavUnFavButton = async (e, resId) => {
    e.preventDefault();
    e.stopPropagation();
    const fetchedProfile = await client.account();
    if (!fetchedProfile) return navigate("/login");
    const userId = fetchedProfile?.data?._id;
    const response = await favoriteAPI.onGetUserFavorites(userId);
    const restaurant = response.restaurants?.find((res) => res == resId);
    return restaurant ? onRemoveFromFav(e, resId) : onAddToFav(e, resId);
  };
  const onAddToFav = async (e, restaurantId) => {
    const fetchedProfile = await client.account();
    const userId = fetchedProfile?.data?._id;
    await favoriteAPI.onAddToFavorites({
      userId,
      restaurantId,
    });
    alert("Added to favorites");
  };
  const onRemoveFromFav = async (e, restaurantId) => {
    const fetchedProfile = await client.account();
    const userId = fetchedProfile?.data?._id;
    await favoriteAPI.onRemoveFromFavorites({
      userId,
      restaurantId,
    });
    alert("Removed from favorites");
  };

  const [p, setP] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    type: "USER",
  });

  const addModalRef = useRef(null);

  const [up, setUp] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    type: "USER",
  });
  const updateModalRef = useRef(null);
  const avgRating = (rating) => {
    let sum = 0;
    for (var i = 0; i < rating.length; i++) {
      sum += rating[i];
    }
    return sum / rating.length;
  };
  return (
    <div className="profile">
      {profile && (
        <div>
          <h1>Personal Profile</h1>
          <h3>
            Welcome, {profile?.first_name} {profile?.last_name}
          </h3>
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
              <button
                className="btn-edit"
                onClick={() => navigate(`/profile/edit`)}
              >
                Edit
              </button>
            </div>
          )}
        </div>
      )}
      {/* user */}
      <div
        className="modal fade "
        id="addModal"
        tabIndex="-1"
        aria-labelledby="addModalLabel"
        aria-hidden="true"
        ref={addModalRef}
      >
        <div
          className="modal-dialog fixed "
          style={{
            maxWidth: "50%",
          }}
        >
          <div className="modal-content w-100">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addModalLabel">
                Add An User
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                yes
              </button>
            </div>
            <div className="modal-body w-100">
              <div className="edit__grid">
                <div className="edit__first-name">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={p.first_name}
                    onChange={(e) =>
                      setP({
                        ...p,
                        first_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="edit__last-name">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={p.last_name}
                    onChange={(e) =>
                      setP({
                        ...p,
                        last_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mt-5">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Email"
                    value={p.email}
                    onChange={(e) =>
                      setP({
                        ...p,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mt-5">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={p.password}
                    onChange={(e) =>
                      setP({
                        ...p,
                        password: e.target.value,
                      })
                    }
                  />
                </div>

                <div
                  className=""
                  style={{
                    marginTop: "80px",
                  }}
                >
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={p.phone_number}
                    onChange={
                      (e) =>
                        setP({
                          ...p,
                          phone_number: e.target.value,
                        })
                      //   dispatch(setProfile({ ...profile, last_name: e.target.value }))
                    }
                  />
                </div>
                <div
                  className="form-group"
                  style={{
                    marginTop: "80px",
                  }}
                >
                  <label>User Type:</label>
                  <select
                    // value={fromData.type}
                    value={p?.type}
                    onChange={(e) => setP({ ...p, type: e.target.value })}
                  >
                    <option value="USER">User</option>
                    <option value="RESTAURANT">Restaurant</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>

                {/* <div></div> */}

                <div
                  className=""
                  style={{
                    display: " grid",

                    marginTop: "30px",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* update */}
      <div
        className="modal fade "
        id="updateModal"
        tabIndex="-1"
        aria-labelledby="updateModalLabel"
        aria-hidden="true"
        ref={updateModalRef}
      >
        <div
          className="modal-dialog fixed "
          style={{
            maxWidth: "50%",
          }}
        >
          <div className="modal-content w-100">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="updateModalLabel">
                Update An User
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                yes
              </button>
            </div>
            <div className="modal-body w-100">
              <div className="edit__grid">
                <div className="edit__first-name">
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={up.first_name}
                    onChange={(e) =>
                      setUp({
                        ...up,
                        first_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="edit__last-name">
                  <label>Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={up.last_name}
                    onChange={(e) =>
                      setUp({
                        ...up,
                        last_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mt-5">
                  <label>Email</label>
                  <input
                    type="text"
                    placeholder="Email"
                    value={up.email}
                    onChange={(e) =>
                      setUp({
                        ...up,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mt-5">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    value={up.password}
                    onChange={(e) =>
                      setUp({
                        ...up,
                        password: e.target.value,
                      })
                    }
                  />
                </div>

                <div
                  className=""
                  style={{
                    marginTop: "80px",
                  }}
                >
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={up.phone_number}
                    onChange={
                      (e) =>
                        setUp({
                          ...up,
                          phone_number: e.target.value,
                        })
                      //   dispatch(setProfile({ ...profile, last_name: e.target.value }))
                    }
                  />
                </div>
                <div
                  className="form-group"
                  style={{
                    marginTop: "80px",
                  }}
                >
                  <label>User Type:</label>
                  <select
                    // value={fromData.type}
                    value={up?.type}
                    onChange={(e) => setUp({ ...up, type: e.target.value })}
                  >
                    <option value="USER">User</option>
                    <option value="RESTAURANT">Restaurant</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
                {/* <div></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

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
          <ol>
            {restaurants?.map((result) => {
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
                      {result.streetAddress}, {result.City}, {result.zipCode}
                    </h5>
                    <h5>{result.cuisine}</h5>
                  </li>
                </Link>
              );
            })}
          </ol>
        )}
        {selected === 2 && (
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
        {selected === 3 && (
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
        {selected === 4 && (
          <ul className="profile__comments__list">
            {reviews &&
              reviews?.map((review) => (
                <li key={review._id}>{review.content}</li>
              ))}
          </ul>
        )}
      </section>
    </div>
  );
}
export default Personal;
