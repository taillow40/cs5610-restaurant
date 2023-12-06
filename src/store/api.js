import axios from "axios";
import Cookies from "js-cookie";

export const BASE_API =
  process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost:4000";
export const USERS_API = `${BASE_API}/api/users`;

const request = axios.create({
  withCredentials: true,
  headers: {
    Authorization: Cookies.get("user") || "",
  },
});

console.log(Cookies.get("user"));

export const login = async (credentials) => {
  const response = await request.post(`${USERS_API}/signin`, credentials);
  return response?.data;
};
export const checkToken = async (token) => {
  try {
    const response = await request.post(`${USERS_API}/check-token`, token);
    return response?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const account = async () => {
  try {
    const response = await request.get(`${USERS_API}/account`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = async (user) => {
  try {
    const response = await request.put(`${USERS_API}/${user._id}`, user);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const findAllUsers = async () => {
  try {
    const response = await request.get(`${USERS_API}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const createUser = async (user) => {
  try {
    const response = await request.post(`${USERS_API}`, user);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const findUserById = async (id) => {
  try {
    const response = await request.get(`${USERS_API}/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteUser = async (user) => {
  try {
    const response = await request.delete(`${USERS_API}/${user._id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const register = async (user) => {
  const response = await request.post(`${USERS_API}/signup`, user);
  return response?.data;
};
export const logout = async () => {
  const response = await request.post(`${USERS_API}/signout`);
  return response?.data;
};
export const friends = async (id) => {
  try {
    const response = await request.post(`${USERS_API}/${id}/friends`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
