import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const getLoggedinUser = () => {
  const user = Cookies.get("user");

  if (!user) {
    return "";
  } else {
    return user;
  }
};
const userProfile = getLoggedinUser();

const useProfile = () => {
  // const [userProfile, setUserProfile] = useState(userProfileSession);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (userProfile) {
      setUser(userProfile);
    }

    setLoading(false);
  }, []);
  return { loading, user };
};

export { useProfile };
