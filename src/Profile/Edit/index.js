import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import * as client from "src/store/api";
import * as restaurantAPI from "src/store/restaurants";
import Cookies from "js-cookie";

function Edit() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const fetchedProfile = await client.account();
      if (fetchedProfile?.data) setUser(fetchedProfile?.data);
      if (fetchedProfile?.data?.restaurant) {
        const fetchedRestaurant = await restaurantAPI.findRestaurantById(
          fetchedProfile?.data?.restaurant
        );
        setRestaurant(fetchedRestaurant);
      }
    } catch (error) {
      console.log("error in profile get :: ", error);
    }
  };
  const updateUser = async () => {
    try {
      const fetchedProfile = await client.account();
      const u = await client.updateUser(p);
      await restaurantAPI.updateRestaurant(restaurant);
      if (
        (user.type !== "USER" && u.type === "ADMIN") ||
        (u.type !== "ADMIN" && user.type === "USER")
      ) {
        Cookies.remove("user");
        window.location.reload();
        navigate("/login");
        return;
      } else {
        console.log("u :: ", u);
        console.log("user :: ", user);
        navigate(`/profile`);
        window.location.reload();
      }
    } catch (error) {}
  };

  const [p, setP] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    type: "USER",
    cuisine: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const fetchedProfile = await client.account();
      if (fetchedProfile) {
        setP(fetchedProfile?.data);
      } else {
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  const getUserLocation = async (e) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log("City:", data);
          // You can use cityName or further process the data here
          setRestaurant((p) => {
            return {
              ...p,
              Long: longitude,
              Lat: latitude,
              streetAddress: data.display_name,
              City: data?.address.district,
            };
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    });
  };

  return (
    <div className="profile">
      <h1>Edit Profile</h1>
      {user?.type === "RESTAURANT" ? (
        <React.Fragment>
          <div className="profile-flex">
            <div className="w-1-2">
              <label>Restaurant Name</label>
              <input
                type="text"
                placeholder="Restaurant Name"
                value={p.first_name}
                onChange={(e) =>
                  setP({
                    ...p,
                    first_name: e.target.value,
                  })
                }
              />
            </div>
            <div className="w-1-2">
              <label>Location:</label>
              <button type="button" onClick={getUserLocation}>
                Get Location
              </button>
            </div>
          </div>
          <div className="profile-flex">
            <div className="w-1-2">
              <label>City:</label>
              <input
                required
                type="text"
                value={restaurant?.City}
                onChange={(e) =>
                  setRestaurant({ ...restaurant, City: e.target.value })
                }
              />
            </div>
            <div className="w-1-2">
              <label>Zip Code:</label>
              <input
                required
                type="text"
                value={restaurant?.zipCode}
                onChange={(e) =>
                  setRestaurant({ ...restaurant, zipCode: e.target.value })
                }
              />
            </div>
          </div>
          <div className="profile-flex">
            <div className="w-1-2">
              <label>Street Address:</label>
              <input
                required
                type="text"
                value={restaurant?.streetAddress}
                onChange={(e) =>
                  setRestaurant({
                    ...restaurant,
                    streetAddress: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </React.Fragment>
      ) : (
        <div className="profile-flex">
          <div className="w-1-2">
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              value={p.first_name}
              onChange={
                (e) =>
                  setP({
                    ...p,
                    first_name: e.target.value,
                  })
                //   dispatch(setProfile({ ...profile, first_name: e.target.value }))
              }
            />
          </div>
          <div className="w-1-2">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              value={p.last_name}
              onChange={
                (e) =>
                  setP({
                    ...p,
                    last_name: e.target.value,
                  })
                //   dispatch(setProfile({ ...profile, last_name: e.target.value }))
              }
            />
          </div>
        </div>
      )}

      <div className="profile-flex">
        <div className="w-1-2">
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            value={p.email}
            onChange={
              (e) =>
                setP({
                  ...p,
                  email: e.target.value,
                })
              //   dispatch(setProfile({ ...profile, last_name: e.target.value }))
            }
          />
        </div>
        <div className="w-1-2">
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
      </div>
      <div className="profile-flex">
        <div className="w-1-2">
          <label>User Type</label>
          <select
            value={p.type}
            onChange={(e) => setP({ ...p, type: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="RESTAURANT">Restaurant</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <div className="w-1-2">
          <label>Cuisine:</label>
          <select
            value={p.cuisine}
            onChange={(e) => {
              console.log(e.target.value);
              setP({ ...p, cuisine: e.target.value });
            }}
          >
            <option value="">Choose your favourite cuisine</option>
            <option value="Italian">Italian</option>
            <option value="Japanese">Japanese</option>
            <option value="Mexican">Mexican</option>
            <option value="American">American</option>
            <option value="Indian">Indian</option>
            <option value="Mediterranean">Mediterranean</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Barbecue">Barbecue</option>
            <option value="Seafood">Seafood</option>
            <option value="Desserts">Desserts</option>
            <option value="Breakfast">Breakfast</option>
            <option value="French">French</option>
            <option value="Snacks">Snacks</option>
          </select>
        </div>
      </div>
      <div className="profile-flex">
        <div
          className=""
          style={{
            display: "block",
            columnSpan: "100%",
            marginTop: "30px",
          }}
        >
          <button
            className="edit__save mt-5 "
            onClick={() => {
              updateUser();
            }}
          >
            Save
          </button>

          <button
            className="edit__cancel "
            onClick={() => {
              navigate(`/profile`);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
