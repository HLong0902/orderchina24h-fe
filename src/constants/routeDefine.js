const ROUTES = {
	Auth: {
		register: `/auth/register`,
		login: `/auth/login`,
		forgotPass: `/auth/forgot-password`,
		changePass: `/auth/change-password`,
	},
	User: {
		info: `/users/me`,
		infoOf: (id) => `/users/info/${id}`,
		customerInfo: (id) => `/users/${id}`,
	},
	Inventory: {
		findAll: `/inventory/find-all`,
	},
	BankAccount: {
		topup: `/bank-account/create-transaction`,
		filterTransaction: `/bank-account/find-transaction-by-option`,
		filterTransactionAdmin: `/bank-account/find-transaction-admin`,
		findBankRequestAdminFilter: `/bank-account/admin/find-transaction`,
		updateTransaction: `/bank-account/update-transaction`,
	},
	Address: {
		saveAddress: `/address/create-receive-add`,
		getAddress: `/address/all`,
		updateAddress: `/address/update`,
		deleteAddress: `/address/delete`,
		selectAddress: `/address/select`,
	},
	Cart: {
		listAll: `/cart/items`,
	},
	Order: {
		createOrder: `/order/create`,
		searchOrder: `/order/search-order`,
		adminSearchOrder: `/order/admin/search-order`,
		updateOrderList: `/order/update-order-status-list`,
		updateOrderStatus: `/order/update-order-status`,
		updateOrderItem: `/order/update-order-item`,
		getDetail: (id) => `/order/detail/${id}`,
		adminCountStats: `/order/admin/stats`,
		adminSearchOrderInfo: `/order/admin/search-order-info`,
		orderWithoutCriteria: `/order/admin/order-without-criteria`,
	},
	OrderShopCode: {
		findByOrderId: (id) => `/shop-code/find-by-order-id/${id}`,
		create: `/shop-code/create`,
	},
	Package: {
		create: `/package/create`,
		update: `/package/update`,
		findByOrderId: (id) => `/package/find-by-order-id/${id}`,
		findByOption: `/package/find-by-option`,
		findPackageUnknown: `/package/admin/find-package-unknown`,
		checkProduct: `/package/admin/check-product-update-inventory`,
		packageNotProcessed: `/package/packages-not-processed`,
	},
	Bag: {
		create: `/bag-order/create`,
		update: `/bag-order/update`,
		findByOption: `/bag-order/find-by-option`,
		findById: (id) => `/bag-order/${id}`,
	},
	Information: {
		getValueByCode: (code) =>
			`/information/find-option-set-value-by-code/${code}`,
	},
	TRANSLATOR: {
		HOST: `https://translate.terraprint.co/translate`,
	},
};

export default ROUTES;
