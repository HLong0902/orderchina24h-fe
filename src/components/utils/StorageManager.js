class StorageManager {
	static store(key, value, timeout = 600) {
		const jsonValue = JSON.stringify(value);

		localStorage.setItem(key, jsonValue);

		const expirationTime = Date.now() + timeout * 1000; // 600000 milliseconds = 30 minutes

		setTimeout(() => {
			localStorage.removeItem(key);
		}, expirationTime - Date.now());
	}

	static retrieve(key) {
		const item = localStorage.getItem(key);

		if (item && !StorageManager.isExpired(item)) {
			return JSON.parse(item);
		}

		return null;
	}

	static isExpired(item) {
		const expirationTimestamp = parseInt(
			localStorage.getItem(`${item}_expiration`),
			10
		);

		return Date.now() > expirationTimestamp;
	}

	static sessionStore(key, value, timeout = 600) {
		const jsonValue = JSON.stringify(value);

		localStorage.setItem(key, jsonValue);

		const expirationTime = Date.now() + timeout * 1000; // 600000 milliseconds = 10 minutes

		setTimeout(() => {
			localStorage.removeItem(key);
		}, expirationTime - Date.now());
	}
	static sessionRetrieve(key) {
		const item = localStorage.getItem(key);

		if (item && !StorageManager.isSessionExpired(item)) {
			return JSON.parse(item);
		}

		return null;
	}

	static isSessionExpired(item) {
		const expirationTimestamp = parseInt(
			localStorage.getItem(`${item}_expiration`),
			10
		);

		return Date.now() > expirationTimestamp;
	}
}

export default StorageManager;
