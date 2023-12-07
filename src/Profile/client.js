import axios from "axios";
import { user } from "fontawesome";
export const BASE_API = process.env.REACT_APP_BACKEND_URL;
export const USERS_API = `${BASE_API}/api/users`;
const request = axios.create({
  withCredentials: true,
});
export const signin = async (credentials) => {
<<<<<<< HEAD
    const response = await request.post(`${USERS_API}/signin`, credentials);
    return response.data; };

    export const account = async (headers) => {
      try {
        const response = await request.get(`${USERS_API}/account`, { headers });
        return response.data;
      } catch (error) {
        // Handle errors, e.g., token validation failure or network issues
        console.error("Error fetching account:", error);
        throw error; // Rethrow the error so that the calling code can handle it
      }
    };

  export const updateUser = async (user) => {
    const response = await request.put(`${USERS_API}/${user._id}`, user);
    return response.data; };

  export const findAllUsers = async () => {
    const response = await request.get(`${USERS_API}`);
    return response.data; };

  export const createUser = async (user) => {
    const response = await request.post(`${USERS_API}`, user);
    return response.data; };

  export const findUserById = async (id) => {
    const response = await request.get(`${USERS_API}/${id}`);
    return response.data; };

  export const deleteUser = async (user) => {
    const response = await request.delete(`${USERS_API}/${user._id}`);
    return response.data; };

  export const signup = async (user) => {
    const response = await request.post(`${USERS_API}/signup`, user);
    return response.data; };

  export const signout = async () => {
    const response = await request.post(`${USERS_API}/signout`);
    return response.data; };

  export const friends = async (id) => {
    const response = await request.post(`${USERS_API}/${id}/friends`);
    return response.data; 
  }

  
  
=======
  const response = await request.post(`${USERS_API}/signin`, credentials);
  return response.data;
};
export const account = async () => {
  const response = await request.post(`${USERS_API}/account`);
  return response.data;
};
export const updateUser = async (user) => {
  const response = await request.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};
export const findAllUsers = async () => {
  const response = await request.get(`${USERS_API}`);
  return response.data;
};
export const createUser = async (user) => {
  const response = await request.post(`${USERS_API}`, user);
  return response.data;
};
export const findUserById = async (id) => {
  const response = await request.get(`${USERS_API}/${id}`);
  return response.data;
};
export const deleteUser = async (user) => {
  const response = await request.delete(`${USERS_API}/${user._id}`);
  return response.data;
};
export const signup = async (user) => {
  const response = await request.post(`${USERS_API}/signup`, user);
  return response.data;
};
export const signout = async () => {
  const response = await request.post(`${USERS_API}/signout`);
  return response.data;
};
export const friends = async (id) => {
  const response = await request.post(`${USERS_API}/${id}/friends`);
  return response.data;
};
>>>>>>> dev-tt
