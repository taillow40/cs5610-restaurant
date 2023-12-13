import axios from "axios";

export const BASE_API =
  process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost:4000";
export const RESTAURANTS_API = `${BASE_API}/api/restaurants`;

export const updateRestaurant = async (restaurant) => {
  try {
    const response = await axios.put(
      `${RESTAURANTS_API}/${restaurant._id}`,
      restaurant
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const findAllRestaurants = async () => {
  try {
    const response = await axios.get(`${RESTAURANTS_API}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const findAllRestaurantsByCousine = async (cousines) => {
  try {
    const response = await axios.post(
      `${RESTAURANTS_API}/restaurantsByCousine`,
      cousines
    );
    return response?.data;
  } catch (error) {
    console.log("error in cuisine", error);
  }
};
export const createRestaurant = async (restaurant) => {
  try {
    const response = await axios.post(`${RESTAURANTS_API}`, restaurant);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const createRestaurantFromYelp = async (id) => {
  try {
    const response = await axios.post(`${RESTAURANTS_API}/createFromYelp`, {
      id: id,
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const findRestaurantById = async (id) => {
  try {
    const response = await axios.get(`${RESTAURANTS_API}/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteRestaurant = async (restaurant) => {
  try {
    const response = await axios.delete(`${RESTAURANTS_API}/${restaurant._id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

export const reviews = async (id) => {
  try {
    const response = await axios.post(`${RESTAURANTS_API}/${id}/reviews`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};
