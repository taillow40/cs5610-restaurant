import axios from "axios";

export const BASE_API = process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:4000';
export const USER_LIKES_API = `${BASE_API}/api/users`;

export const findAllAlbumsUserLiked = async (userId) => {
    try {
      const response = await axios.get(`${USER_LIKES_API}/${userId}/likes`);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  
  };