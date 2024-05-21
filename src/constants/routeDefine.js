const ROUTES = {
	Auth: {
		register: `/auth/register`,
		registerStaff: `/auth/register-staff`,
		login: `/auth/login`,
		forgotPass: `/auth/forgot-password`,
		changePass: `/auth/change-password`,
	},
	User: {
		info: `/users/me`,
		infoOf: (id) => `/users/info/${id}`,
		staffs: `/users/staffs`,
		customerInfo: (id) => `/users/${id}`,
		getAll: `/users`,
	},
	Inventory: {
		findAll: `/inventory/find-all`,
	},
	BankAccount: {
		topup: `/bank-account/create-transaction`,
		filterTransaction: `/bank-account/find-transaction-by-option`,
		filterTransactionAdmin: `/bank-account/find-transaction-admin`,
		findBankRequestAdminFilter: `/bank-account/admin/find-transaction`,
		stats: `/bank-account/admin/stats`,
		updateTransaction: `/bank-account/update-transaction`,
	},
	Address: {
		saveAddress: `/address/create-receive-add`,
		getAddress: `/address/all`,
		updateAddress: `/address/update`,
		deleteAddress: `/address/delete`,
		selectAddress: `/address/select`,
		findByUsername: `/address/find-by-filter`,
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
		updateOrderIsVolume: `/order/update-order-check-volume`,
		updateItemCheck: `/order/update-item-check`,
		getDetail: (id) => `/order/detail/${id}`,
		adminCountStats: `/order/admin/stats`,
		adminSearchOrderInfo: `/order/admin/search-order-info`,
		orderWithoutCriteria: `/order/admin/order-without-criteria`,
		updateFee: `/order/admin/update-order-infomation`,
		createDepositOrder: `/order/create-order-send`,
		getDepositOrder: `/order/find-order-send`,
		createOrderOtherEcommerce: `/order/create-order-tmdt`,
	},
	OrderShopCode: {
		findByOrderId: (id) => `/shop-code/find-by-order-id/${id}`,
		create: `/shop-code/create`,
	},
	OtherFee: {
		create: `/other-fee/create`,
		update: `/other-fee/update`,
	},
	Package: {
		create: `/package/create`,
		update: `/package/update`,
		findByOrderId: (id) => `/package/find-by-order-id/${id}`,
		findByOption: `/package/find-by-option`,
		findPackageUnknown: `/package/admin/find-package-unknown`,
		checkProduct: `/package/admin/check-product-update-inventory`,
		packageNotProcessed: `/package/packages-not-processed`,
		packageForTicket: `/package/admin/package-for-ticket`,
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
	DeliverOrder: {
		create: `/delivery-slip/create`,
		update: `/delivery-slip/update`,
		findByOption: `/delivery-slip/admin/find-by-option`,
		getDetail: (id) => `/delivery-slip/admin/details/${id}`,
	},
	Customer: {
		filterCustomerData: `/customer/admin/find-customer-data`,
		customerData: `/customer/get-customer-data`,
		customerList: `/customer/admin/customer-list`,
		updateCustomerData: `/customer/admin/update-customer-data`,
	},
	Statistic: {
		getNegotiation: `/statis/statistics-negotiable-spreads`,
		getSales: `/statis/sales-statistics`,
		getOrders: `/statis/full-order-statistics`,
	},
	Article: {
		findAll: `/contents/find-all`,
		create: `/contents/create`,
		update: `/contents/update`,
		findById: `/contents/find-by-id`,
	},
	TRANSLATOR: {
		HOST: `https://translate.terraprint.co/translate`,
	},
};

export default ROUTES;
