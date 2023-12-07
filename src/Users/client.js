import axios from "axios";
export const BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL;
export const USERS_API = `${BASE_URL}/api/users`;

const request = axios.create({
  withCredentials: true,
});

export const updateUser = async (user) => {
  const response = await request.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};
export const findAllUsers = async () => {
  const response = await request.get(USERS_API);
  return response.data;
};

export const createUser = async (user) => {
  console.log("hhhhhhhh")
  const response = await request.post(USERS_API, user);
  return response.data;
};
export const findUserById = async (user) => {
  const response = await request.get(`${USERS_API}/${user._id}`);

  return response.data;
};
export const deleteUser = async (userId) => {
  const response = await request.delete(`${USERS_API}/${userId}`);
  return response.data;
};
