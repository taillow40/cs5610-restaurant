/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as client from "src/store/api";
import Cookies from "js-cookie";
import logo from "../assets/logo.jpeg";
import "./nav.css"

function Navbar({ validUser }) {
  const navigate = useNavigate();

  const logOut = async () => {
    const logout = await client.logout();
    if (logout) {
      Cookies.remove("user");
      navigate("/login");
      window.location.reload();
    }
  };
  return (
    <nav id="navbar" className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" height="80" className="d-inline-block align-top" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav ms-auto">
            {!validUser ? (
              <div className="buttons">
                <button
                  className="btn btn-outline-light me-2"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </button>
                <button
                  className="btn btn-outline-light"
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  Register
                </button>
              </div>
            ) : (
              <div className="buttons">
                <button
                  className="btn btn-outline-light me-2"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                </button>
                <button
                  className="btn btn-outline-light me-2"
                  onClick={() => {
                    navigate("/admin");
                  }}
                >
                  Admin
                </button>
                <button className="btn btn-outline-light me-2" onClick={logOut}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
