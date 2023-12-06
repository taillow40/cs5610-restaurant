import axios from "axios";

export const BASE_API = process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:4000';
export const REVIEWS_API = `${BASE_API}/api/reviews`;

export const updateReview = async (review) => {
  try {
    const response = await axios.put(`${REVIEWS_API}/${review._id}`, review);
    return response?.data;
  } catch (error) {
    console.log(error);
  }

};
export const findAllReviews = async () => {
  try {
    const response = await axios.get(`${REVIEWS_API}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }

};
export const createReview = async (review) => {
  try {
    const response = await axios.post(`${REVIEWS_API}`, review);
    return response?.data;
  } catch (error) {
    console.log(error);
  }

};
export const findReviewById = async (id) => {
  try {
    const response = await axios.get(`${REVIEWS_API}/${id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }

};
export const deleteReview = async (review) => {
  try {
    const response = await axios.delete(`${REVIEWS_API}/${review._id}`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }

};

export const reviews = async (id) => {
  try {
    const response = await axios.post(`${REVIEWS_API}/${id}/reviews`);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}




