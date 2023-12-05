import React, { useState } from "react";
import * as client from "src/store/api";
import Cookies from "js-cookie";

function Login() {
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [fromData, setFormData] = useState({
    email: "",
    password: "",
    type: "USER",
  });

   const LogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await client.login(fromData);
      
      if (response && response.data) {
        var { token, user } = response;
        user = response.data;
        // Check if user is defined before destructuring its properties
        if (user) {
          const { _id, email, type } = user;
          setSuccessMsg("Successfully logged in");
          Cookies.set("user", response.data);
          Cookies.set("userType", type);
          setTimeout(() => {
            window.location.href = "/";
          }, 3000);
        } else {
          setError("User information not available");
        }
      } else {
        setError("Invalid response format");
      }
    } catch (err) {
      console.log(err);
      setError(err?.response ? err?.response?.data?.message : "Internal Server Error");
    }
  };
  
  
  return (
    <div className="auth-container">
      <h1>Log in</h1>
      {error && <div className="error-message">{error}</div>}
      {successMsg && <div>{successMsg}</div>}

      <form onSubmit={LogIn}>
        <div className="form-group">
          <label>Email:</label>
          <input
            required
            type="email"
            value={fromData.email}
            onChange={(e) =>
              setFormData({ ...fromData, email: e.target.value })
            }
          />
        </div>

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
          <label>User Type:</label>
          <select
            value={fromData.type}
            onChange={(e) => setFormData({ ...fromData, type: e.target.value })}
          >
            <option value="USER">User</option>
            <option value="RESTAURANT">Restaurant</option>
            <option value="ADMIN">Admin</option>\
          </select>
        </div>

        <button className="auth-button" type="submit">
          LogIn
        </button>
      </form>
    </div>
  );
}

export default Login;
