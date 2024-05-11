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

	static async get(url, params = {}) {
		const headers = {
			"Content-Type": "application/json",
		};
		if (sessionStorage.getItem("jwtToken"))
			headers.Authorization = `Bearer ${sessionStorage.getItem(
				"jwtToken"
			)}`;
		try {
			const response = await axios.get(process.env.BASE_URL + url, {
				params: params,
				headers: headers,
			});
			return response;
		} catch (error) {
			console.error("Error fetching data:", error);
			return error.response;
		}
	}

	static async post(url, data = {}) {
		const headers = {
			"Content-Type": "application/json",
		};
		if (sessionStorage.getItem("jwtToken"))
			headers.Authorization = `Bearer ${sessionStorage.getItem(
				"jwtToken"
			)}`;
		try {
			const response = await axios.post(
				process.env.BASE_URL + url,
				data,
				{ headers }
			);
			return response;
		} catch (error) {
			console.error("Error posting data:", error);
			return error.response;
		}
	}
	static async postParams(url, params) {
		const headers = {
			"Content-Type": "application/json",
		};
		if (sessionStorage.getItem("jwtToken"))
			headers.Authorization = `Bearer ${sessionStorage.getItem(
				"jwtToken"
			)}`;
		try {
			const response = await axios.post(
				process.env.BASE_URL + url,
				null,
				{ params: params, headers: headers }
			);
			return response;
		} catch (error) {
			console.error("Error posting data:", error);
			return error.response;
		}
	}
}

export default ApiCaller;
