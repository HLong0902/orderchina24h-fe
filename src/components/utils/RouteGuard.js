import CommonUtils from "./CommonUtils";

class RouteGuard {
    static guard(to, from, next) {
        if(sessionStorage.getItem('jwtToken')) {
            if(localStorage.getItem('userDto') && !localStorage.getItem('staffInfo'))
                next();
        } else {
            window.location.href = "/login";
        }
    }
    static staffGuard(to, from, next) {
        if(sessionStorage.getItem('jwtToken') && localStorage.getItem('staffInfo')) {
            if(CommonUtils.getStaffInfo().role) {
                next();
            }
        } else {
            window.location.href = '/staff/login'
        }
    }
}

export default RouteGuard;