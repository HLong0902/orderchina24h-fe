class RouteGuard {
    static guard(to, from, next) {
        if(sessionStorage.getItem('jwtToken')) {
            next();
        } else {
            window.location.href = "/login";
        }
    }
}

export default RouteGuard;