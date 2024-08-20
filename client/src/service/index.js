import axios from "axios";

const URL = "";

export const signUpUser = async (credentials) => {
  try {
    const response = axios.post(`${URL}/sign-up`, credentials);
    return response;
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = axios.post(`${URL}/login`, credentials);
    return response;
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

export const uploadResult = async (result, userData) => {
  try {
    const response = axios.post(`${URL}/upload-result`, { result, userData });
    return response;
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

export const getStatsData = async (userId) => {
  try {
    // Await the axios.get call to ensure the promise is resolved before proceeding
    const response = await axios.get(`${URL}/stats`, {
      params: { userId },
    });
    return response;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const fetchAllResultApi = () => {
  try {
    // Await the axios.get call to ensure the promise is resolved before proceeding
    const response = axios.get(`${URL}/leaderboard`);
    return response;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

export const leaderboardAPI = (userId) => {
  try {
    // Await the axios.get call to ensure the promise is resolved before proceeding
    const response = axios.get(`${URL}/scores`, {
      params: { userId },
    });
    return response;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};
