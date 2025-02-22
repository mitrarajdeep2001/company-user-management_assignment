import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Replace with your backend URL

export const createUser = (user) => axios.post(`${API_URL}/users`, user);
export const createCompany = (company) =>
  axios.post(`${API_URL}/companies`, company);
export const search = (query) => axios.get(`${API_URL}/search?query=${query}`);
