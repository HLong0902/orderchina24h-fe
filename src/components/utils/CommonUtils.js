class CommonUtils {
    static getUserDTO() {
        return JSON.parse(localStorage.getItem('userDto'));
    }
    static getStaffInfo() {
        return JSON.parse(localStorage.getItem('staffInfo'));
    }
}

export default CommonUtils;