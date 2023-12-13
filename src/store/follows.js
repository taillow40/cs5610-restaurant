import axios from "axios";
import Cookies from "js-cookie";

export const BASE_API =
  process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost:4000";
export const FOLLOWS_API = `${BASE_API}/api/follows`;

const request = axios.create({
  withCredentials: true,
  headers: {
    Authorization: Cookies.get("user") || "",
  },
});

export const followUser = async (data) => {
  try {
    const response = await request.post(`${FOLLOWS_API}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const findUserFollowers = async (userId) => {
  try {
    const response = await request.get(`${FOLLOWS_API}/${userId}/following`);
    return response?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const findUserFollowings = async (userId) => {
  try {
    const response = await request.get(`${FOLLOWS_API}/${userId}/followers`);
    return response?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
