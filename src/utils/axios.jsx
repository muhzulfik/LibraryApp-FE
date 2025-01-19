import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
	baseURL: "http://localhost:5116/api/", // Add your API base URL here
	headers: {
		"Content-Type": "application/json",
	},
});

// Axios request interceptor to add token to headers
axiosInstance.interceptors.request.use(
	(config) => {
		const token = Cookies.get("authToken"); // Retrieve the token on each request
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;
