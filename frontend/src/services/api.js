import axios from "axios";

const API = axios.create({
  baseURL: "https://campuscare-ai.onrender.com"
});

export default API;