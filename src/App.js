import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import Personal from "./Profile/Personal";
import Profile from "./Profile/Public";
import EditProfile from "src/Profile/Edit";
import SearchPage from "./Home/Search/searchPage";
import Login from "src/Login";
import store from "./store";
import * as client from "src/store/api";
import { Provider } from "react-redux";
import Home from "./Home";
import Navbar from "./Navbar";
import Register from "src/Register";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

import Restaurant from "./Restaurant";
// import SignIn from "src/Profile/Signin";
// import CreateProfile from "src/Profile/Signup";
import ReviewsPage from './Posts';
import Signup from "src/Profile/Signup"
import SignIn from "src/Profile/Signin"

function App() {
  const [validUser, setValidUser] = useState(false);
  const cookie = Cookies.get("user");

  console.log("cookieeeeeeeee", cookie)

  const checkValidToken = () => {
    const response = client.checkToken(cookie);
    if (response) {
      setValidUser(true);

    }
  };
  useEffect(() => {
    if (cookie) {
      checkValidToken();
    }
  }, []);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar validUser={validUser} />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element = {<Personal />} />
          <Route path="/profile/:profileId" element = {<Profile />} />
          <Route path="/profile/edit" element = {<EditProfile />} />
          <Route path="/restaurant/:rId" element = {<Restaurant />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          <Route path="/restaurant/:rId/review" element= {<ReviewsPage/>} />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
