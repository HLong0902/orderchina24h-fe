import ROUTES from "../../constants/routeDefine";
import ApiCaller from "./ApiCaller";

class CommonUtils {
	static getUserDTO() {
		return JSON.parse(localStorage.getItem("userDto"));
	}
	static getStaffInfo() {
		return JSON.parse(localStorage.getItem("staffInfo"));
	}
	static getCurrentDateTime() {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, "0");
		const day = String(now.getDate()).padStart(2, "0");
		const hours = String(now.getHours()).padStart(2, "0");
		const minutes = String(now.getMinutes()).padStart(2, "0");
		const seconds = String(now.getSeconds()).padStart(2, "0");

		return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
	}
	static getNextDate() {
		const now = new Date();
		const year = now.getFullYear();
		const month = String(now.getMonth() + 1).padStart(2, "0");
		const day = String(now.getDate() + 1).padStart(2, "0");

		return `${year}-${month}-${day}`;
	}
	static getNextDateOf(dateString) {
		if(dateString == '')
			return this.getNextDate();
		let currentDate = new Date(dateString);
		currentDate.setDate(currentDate.getDate() + 1);
		let nextDate = currentDate.toISOString().slice(0, 10);
		return nextDate;
	}
	static getDateBeforeDays(days) {
		const today = new Date();
		const thirtyDaysAgo = new Date(today);
		thirtyDaysAgo.setDate(today.getDate() - days);

		// Định dạng ngày theo yêu cầu: yyyy-MM-dd
		const year = thirtyDaysAgo.getFullYear();
		const month = String(thirtyDaysAgo.getMonth() + 1).padStart(2, "0"); // Thêm '0' vào đầu nếu cần
		const day = String(thirtyDaysAgo.getDate()).padStart(2, "0"); // Thêm '0' vào đầu nếu cần

		return `${year}-${month}-${day}`;
	}
	static async translateVietnameseToChinese(text) {
		const res = await fetch(ROUTES.TRANSLATOR.HOST, {
			method: "POST",
			body: JSON.stringify({
				q: `${text}`,
				source: "vi",
				target: "zh",
				format: "text",
			}),
			headers: { "Content-Type": "application/json" },
		});
        return await res.json();
	}
	static formatNumber(amount) {
		amount = amount ? Math.round(amount) : 0;
		return amount ? new Intl.NumberFormat().format(amount) : 0;
	}
	static formatNumberFloat(amount) {
		amount = amount ? amount.toFixed(2) : 0;
		return amount ? new Intl.NumberFormat().format(amount) : 0;
	}
}

export default CommonUtils;
