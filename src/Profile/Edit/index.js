import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import * as client from "src/store/api";
import Cookies from "js-cookie";

function Edit() {
  const navigate = useNavigate();

  const updateUser = async () => {
    try {
      const fetchedProfile = await client.account();
      const u = await client.updateUser(p);
      if (fetchedProfile.data.type != "ADMIN" && u.type == "ADMIN") {
        Cookies.remove("user");
        navigate("/login");
        window.location.reload();
        return;
      } else {
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

  return (
    <div className="profile">
      <h1>Edit Profile</h1>
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
