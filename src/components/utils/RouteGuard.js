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
	static staffGuard(to, from, next) {
		if (
			StorageManager.sessionRetrieve("jwtToken") &&
			StorageManager.retrieve("staffInfo")
		) {
			if (CommonUtils.getStaffInfo().role) {
				next();
			}
		} else {
			window.location.href = "/staff/login";
		}
	}
}

export default RouteGuard;
