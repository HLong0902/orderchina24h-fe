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
        if(sessionStorage.getItem('staffJwtToken') && localStorage.getItem('staffInfo')) {
            next();
        } else {
            window.location.href = '/staff/login'
        }
    }
}

export default RouteGuard;