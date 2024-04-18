class CommonUtils {
    static getUserDTO() {
        return JSON.parse(localStorage.getItem('userDto'));
    }
}

export default CommonUtils;