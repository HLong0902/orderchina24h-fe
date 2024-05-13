import ROUTES from "../../constants/routeDefine";

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
		if (dateString == "") return this.getNextDate();
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
	static formatDate(timestamp) {
		if (timestamp === null) return "";
		const date = new Date(timestamp);

		// Extract date components
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
		const day = date.getDate().toString().padStart(2, "0");
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		const seconds = date.getSeconds().toString().padStart(2, "0");

		// Construct the formatted date string
		const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

		return formattedDate;
	}
	static promptPackageStatusNameByValue(status) {
		switch (status) {
			case 0:
				return "Đã xoá";
			case 1:
				return "NB phát hành";
			case 2:
				return "Nhập kho TQ";
			case 3:
				return "Gửi bao TQ";
			case 4:
				return "Nhận bao VN";
			case 5:
				return "Đã kiểm";
			case 6:
				return "Nhập kho VN";
			case 7:
				return "Đã giao";
		}
	}
	static promptPackageStatusClassByValue(status) {
		switch (status) {
			case 0:
				return "Đã xoá";
			case 1:
				return "is_export";
			case 2:
				return "is_import_cn";
			case 5:
				return "is_check";
			case 6:
				return "is_import_vn";
			case 7:
				return "is_delivered";
			default:
				return "is_export";
		}
	}
	static promptTransactionNameByValue(status) {
		switch (status) {
			case 0:
				return "Rút tiền";
			case 1:
				return "Nạp tiền";
		}
	}
	static promptOrderStatusNameByValue(status) {
		switch (status) {
			case 1:
				return "Đang chờ cọc";
			case 2:
				return "Đã đặt cọc";
			case 3:
				return "Đã mua hàng";
			case 4:
				return "Hàng đã về kho TQ";
			case 5:
				return "Hàng đã về kho VN";
			case 6:
				return "Sẵn sàng giao hàng";
			case 7:
				return "Chờ xử lý khiếu nại";
			case 8:
				return "Đã kết thúc";
			case 9:
				return "Đã huỷ";
		}
	}
	static promptBagStatusNameByValue(value) {
		switch (value) {
			case 0:
				return "Đóng Bao";
			case 1:
				return "Mở";
			case 2:
				return "Gửi hàng";
			case 3:
				return "Nhận hàng";
		}
	}
}

export default CommonUtils;
