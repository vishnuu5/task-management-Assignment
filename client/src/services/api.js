import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Helper methods
const apiService = {
  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
    }
  },

  get: async (url) => {
    try {
      const response = await api.get(url);
      return response;
    } catch (error) {
      throw error;
    }
  },

  post: async (url, data) => {
    try {
      const response = await api.post(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  put: async (url, data) => {
    try {
      const response = await api.put(url, data);
      return response;
    } catch (error) {
      throw error;
    }
  },

  delete: async (url) => {
    try {
      const response = await api.delete(url);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default apiService;
