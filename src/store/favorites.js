import axios from "axios";
import Cookies from "js-cookie";

export const BASE_API =
  process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost:4000";
export const FAV_API = `${BASE_API}/api/favorites`;

const request = axios.create({
  withCredentials: true,
  headers: {
    Authorization: Cookies.get("user") || "",
  },
});


export const onAddToFavorites = async (data) => {
  try {
    const response = await request.post(`${FAV_API}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const onRemoveFromFavorites = async (data) => {
  try {
    const response = await request.put(`${FAV_API}`, data);
    return response?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const onGetUserFavorites = async (userId) => {
  try {
    const response = await request.get(`${FAV_API}/user-favorites/${userId}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const onGetUserFavoritesFull = async (userId) => {
  try {
    const response = await request.get(`${FAV_API}/user-favorites-full/${userId}`);
    return response?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};