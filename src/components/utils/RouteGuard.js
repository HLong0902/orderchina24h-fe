import CommonUtils from "./CommonUtils";
import StorageManager from "./StorageManager";

class RouteGuard {
	static guard(to, from, next) {
		if (StorageManager.sessionRetrieve("jwtToken")) {
			if (
				StorageManager.retrieve("userDto") &&
				!StorageManager.retrieve("staffInfo")
			)
				next();
		} else {
			window.location.href = "/login";
		}
	}
	static staffGuard(to, from, next, allow) {
		if (
			StorageManager.sessionRetrieve("jwtToken") &&
			StorageManager.retrieve("staffInfo")
		) {
			const role = CommonUtils.getRole();
			if (role && allow.includes(role)) {
				next();
			} else {
				next("/staff/dashboard");
			}
		} else {
			window.location.href = "/staff/login";
		}
	}
}

export default RouteGuard;
