import React, { useState } from "react";
import * as client from "src/store/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
 
function Login() {
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    type: "USER", // Default value
  });
  const navigate = useNavigate();
 
  const LogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await client.signin(formData);
      console.log(response);
      if (response) {
        setSuccessMsg("Successfully logged in");
        Cookies.set("user", response?.data);
        if (response.success) {
          navigate("/");
          window.location.reload();
        }
      }
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message || "Something went wrong!");
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
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
 
        <div className="form-group">
          <label>Password:</label>
          <input
            required
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
 
        <div className="form-group">
          <label>User Type:</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
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