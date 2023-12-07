import "./App.css";
import {
  BrowserRouter,
  HashRouter,
  Link,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Personal from "./Profile/Personal";
import Profile from "./Profile/Public";
import EditProfile from "src/Profile/Edit";
import SearchPage from "./Home/Search/searchPage";
import CreateProfile from "../src/Profile/Signup";
import SignIn from "../src/Profile/Signin/index";
import AdminProfile from "../src/AdminProfile";
import store from "./store";
import { Provider } from "react-redux";
import Home from "./Home";
import Restaurant from "./Restaurant";
import ReviewsPage from "./Posts";
import Navbar from "./components/Navbar";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import * as client from "src/store/api";
import AuthProtected from "./AuthGuard/PrivateRoute";

function App() {
  const [validUser, setValidUser] = useState(false);
  const cookie = Cookies.get("user");

  useEffect(() => {
    if (cookie) {
      const checkValidToken = () => {
        const response = client.checkToken(cookie);
        if (response) {
          setValidUser(true);
        }
      };
      checkValidToken();
    }
  }, [cookie]);
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Navbar validUser={validUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/profile" element={<Personal />} />
          <Route path="/admin" element={<AdminProfile />} />
          <Route path="/profile/:profileId" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/restaurant/:rId" element={<Restaurant />} />
          <Route path="/signup" element={<CreateProfile />} />
          <Route path="/login" element={<SignIn />} />
          <Route
            path="/restaurant/:rId/review"
            element={
              <AuthProtected>
                <ReviewsPage />
              </AuthProtected>
            }
          />
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
