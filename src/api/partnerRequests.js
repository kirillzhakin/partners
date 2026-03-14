import axios from "axios";

const API_URL = "https://career-app-copy-backend-hjcf.vercel.app";

const AXIOS = axios.create({
  baseURL: API_URL,
});

export const getRequests = async () => {
  try {
    return await AXIOS.get("/requests");
  } catch (error) {
    console.error(error);
  }
};
export const updateRequest = (id, data) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};
