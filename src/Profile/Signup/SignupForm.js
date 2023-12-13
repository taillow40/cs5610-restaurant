import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as client from "src/store/api";

const SignupForm = ({
  setSuccessMsg = () => {},
  setError = () => {},
  error,
  success,
  style={},
  onClick,
  isAdmin = false
}) => {
  const [fromData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    cuisine: "",
    type: "USER", // Default value
  });
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const fetchedProfile = await client.account();
      if (fetchedProfile?.data) setUser(fetchedProfile?.data);
    } catch (error) {}
  };
  const register = async (e) => {
    e.preventDefault();
    const data = {
      ...fromData,
      cuisine: [fromData.cuisine],
    };

    try {
      const response = await client.register(data);
      if (response?.success) {
        setSuccessMsg("Successfully signed up");
        if(!isAdmin) {
            setTimeout(() => {
              navigate("/login");
            }, 750);
        }
        else onClick(true);
      }
    } catch (err) {
      setError(err?.response?.data?.message || "An Error Occurred");
    }
  };
  const getUserLocation = async (e) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const cityName = data.address?.city;
          console.log("City:", data);
          // You can use cityName or further process the data here
          setFormData((p) => {
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
    <form onSubmit={register} style={style}>
      <div className="form-group">
        <label>Email:</label>
        <input
          required
          type="email"
          value={fromData.email}
          onChange={(e) => setFormData({ ...fromData, email: e.target.value })}
        />
      </div>
      {fromData?.type === "RESTAURANT" ? (
        <div className="form-group">
          <label>Restaurant Name:</label>
          <input
            required
            type="text"
            value={fromData.first_name}
            onChange={(e) =>
              setFormData({ ...fromData, first_name: e.target.value })
            }
          />
        </div>
      ) : (
        <React.Fragment>
          <div className="form-group">
            <label>First Name:</label>
            <input
              required
              type="text"
              value={fromData.first_name}
              onChange={(e) =>
                setFormData({ ...fromData, first_name: e.target.value })
              }
            />
          </div>

          <div className="form-group">
            <label>Last Name:</label>
            <input
              required
              type="text"
              value={fromData.last_name}
              onChange={(e) =>
                setFormData({ ...fromData, last_name: e.target.value })
              }
            />
          </div>
        </React.Fragment>
      )}

      <div className="form-group">
        <label>Phone Number:</label>
        <input
          required
          type="tel"
          value={fromData.phone_number}
          onChange={(e) =>
            setFormData({ ...fromData, phone_number: e.target.value })
          }
        />
      </div>

      {fromData.type === "RESTAURANT" && (
        <React.Fragment>
          <div className="form-group">
            <label>Location:</label>
            <button type="button" onClick={getUserLocation}>
              Get Location
            </button>
          </div>
          <div className="form-group">
            <label>City:</label>
            <input
              required
              type="text"
              value={fromData?.City}
              onChange={(e) =>
                setFormData({ ...fromData, City: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Zip Code:</label>
            <input
              required
              type="text"
              value={fromData?.zipCode}
              onChange={(e) =>
                setFormData({ ...fromData, zipCode: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Street Address:</label>
            <input
              required
              type="text"
              value={fromData?.streetAddress}
              onChange={(e) =>
                setFormData({ ...fromData, streetAddress: e.target.value })
              }
            />
          </div>
        </React.Fragment>
      )}

      <div className="form-group">
        <label>Password:</label>
        <input
          required
          type="password"
          value={fromData.password}
          onChange={(e) =>
            setFormData({ ...fromData, password: e.target.value })
          }
        />
      </div>
      <div className="form-group">
        <label>Cuisine:</label>
        <select
          value={fromData.cuisine}
          onChange={(e) =>
            setFormData({ ...fromData, cuisine: e.target.value })
          }
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

      <div className="form-group">
        <label>User Type:</label>
        <select
          value={fromData.type}
          onChange={(e) => setFormData({ ...fromData, type: e.target.value })}
        >
          <option value="USER">User</option>
          <option value="RESTAURANT">Restaurant</option>
        </select>
      </div>

      <button className="auth-button" type="submit">
        Register
      </button>
    </form>
  );
};
export default SignupForm;
