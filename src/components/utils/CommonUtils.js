import ROUTES from "../../constants/routeDefine";
import ApiCaller from "./ApiCaller";
import StorageManager from "./StorageManager";

class CommonUtils {
  static getUserDTO() {
    return JSON.parse(StorageManager.retrieve("userDto"));
  }
  static getStaffInfo() {
    return JSON.parse(StorageManager.retrieve("staffInfo"));
  }
  static getRole() {
    return this.getStaffInfo().role;
  }
  static genCode() {
    const userDTO = this.getUserDTO();
    return String(userDTO.id).padStart(6, "0");
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
  static formatNumber(amount) {
    amount = amount ? Math.round(amount) : 0;
    return amount ? (amount + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0;
  }
  static formatNumberFloat(amount) {
    amount = amount ? amount.toFixed(2) : "0";
    // amount = amount ? amount : 0;
    amount = amount.replace(/\.?0+$/, "");
    return amount ? amount : "0";
  }
  static formatNumberFloat6(amount) {
    amount = amount ? amount.toFixed(6) : "0";
    // amount = amount ? amount : 0;
    amount = amount.replace(/\.?0+$/, "");
    return amount ? amount : "0";
  }

  static formatNumberCustom(amount) {
    if (amount.toString().split('.')[1].length > 4) return amount.toExponential();

    amount = amount ? amount.toFixed(6) : "0";
    // amount = amount ? amount : 0;
    amount = amount.replace(/\.?0+$/, "");
    return amount ? amount : "0";
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
  static normalizeNumber(number, length = 6) {
    return number.toString().padStart(length, "0");
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
  static promptRoleNameByValue(status) {
    switch (status) {
      case 0:
        return "Khách hàng";
      case 1:
        return "Admin";
      case 2:
        return "Nhân viên tư vấn";
      case 3:
        return "Nhân viên mua hàng";
      case 4:
        return "Nhân viên kho";
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
        return "Đã giao";
      case 8:
        return "Chờ xử lý khiếu nại";
      case 9:
        return "Đã kết thúc";
      case 0:
        return "Đã huỷ";
    }
  }
  static promptOrderStatusNameByValueAdmin(status) {
    switch (status) {
      case 1:
        return "Đã duyệt";
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
        return "Đã giao";
      case 8:
        return "Chờ xử lý khiếu nại";
      case 9:
        return "Đã kết thúc";
      case 0:
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
  static promptComplainStatusNameByValue(value) {
    switch (value) {
      case 1:
        return "Chờ xử lý";
      case 2:
        return "Đang xử lý";
      case 3:
        return "Thành công";
      case 4:
        return "Thất bại";
      case 5:
        return "Đang xử lý đơn hàng";
      case 6:
        return "Đã huỷ";
    }
  }
  static promptDeliverOrderStatusNameByValue(value) {
    switch (value) {
      case 1:
        return "Chưa giao";
      case 2:
        return "Đã giao";
    }
  }
  static promptDeliverOrderStatusClassByValue(value) {
    switch (value) {
      case 1:
        return "button-link special-orange";
      case 2:
        return "button-link special-blue";
    }
  }
  static removeCommas(amount) {
    return (amount + "").replace(/,/g, "");
  }
  static getNextStateOfOrder(state) {
    switch (state) {
      case 1:
        return 2;
      case 2:
        return 3;
      case 3:
        return 4;
      case 4:
        return 5;
      case 5:
        return 6;
      case 6:
        return 7;
      case 7:
        return 9;
    }
  }
  static promptNotiNameByType(type) {
    switch(type) {
      case '1':
        return "Đơn hàng"
      case '2': 
        return "Vận đơn"
      case '3':
        return "Ví điện tử"
    }
  }
}

export default CommonUtils;
