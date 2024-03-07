import axios from "axios";

const apiServices = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // Replace with your base URL
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`, // Replace with your authorization header
      'Content-Type': 'application/json',
    },
  });

export default apiServices