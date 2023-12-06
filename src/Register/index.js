import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "src/store/api";
import "./index.css";

function Signup() {
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [fromData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password: "",
    type: "USER", // Default value
  });

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      console.log("formmmmmmm",  fromData)
     await client.register(fromData);
      setSuccessMsg('Successfully signed up')
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };
  
  return (
    <div className="auth-container">
      <h1>Register</h1>
      {error && <div className="error-message">{error}</div>}
      {successMsg && <div>{successMsg}</div>}

      <form onSubmit={register}>
        <div className="form-group">
          <label>Email:</label>
          <input
            required
            type="email"
            value={fromData.email}
            onChange={(e) => setFormData({ ...fromData, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>First Name:</label>
          <input
            required
            type="text"
            value={fromData.first_name}
            onChange={(e) => setFormData({ ...fromData, first_name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            required
            type="text"
            value={fromData.last_name}
            onChange={(e) => setFormData({ ...fromData, last_name: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            required
            type="tel"
            value={fromData.phone_number}
            onChange={(e) => setFormData({ ...fromData, phone_number: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            required
            type="password"
            value={fromData.password}
            onChange={(e) => setFormData({ ...fromData, password: e.target.value })}
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
          </select>
        </div>

        <button className="auth-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Signup;
