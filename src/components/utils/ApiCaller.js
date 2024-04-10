// apiUtils.js

import axios from "axios";

class ApiCaller {
	BASE_URL = process.env.BASE_URL;

	headers = (token) => {
		return (
			token && {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			}
		);
	};

	static async get(url, params = {}, token) {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};
		try {
			const response = await axios.get(url, { params }, token ? { headers } : null);
			return response.data;
		} catch (error) {
			console.error("Error fetching data:", error);
			throw error;
		}
	}

	static async post(url, data = {}, token) {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		};
		try {
			const response = await axios.post(url, data, token ? { headers } : null);
			return response.data;
		} catch (error) {
			console.error("Error posting data:", error);
			throw error;
		}
	}
}

export default ApiCaller;
