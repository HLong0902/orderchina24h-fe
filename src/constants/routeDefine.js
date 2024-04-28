const ROUTES = {
	Auth: {
		register: `/auth/register`,
		login: `/auth/login`,
		forgotPass: `/auth/forgot-password`,
		changePass: `/auth/change-password`,
	},
	User: {
		info: `/users/me`,
	},
	Inventory: {
		findAll: `/inventory/find-all`,
	},
	BankAccount: {
		topup: `/bank-account/create-transaction`,
		filterTransaction: `/bank-account/find-transaction-by-option`,
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
	TRANSLATOR: {
		HOST: `https://translate.terraprint.co/translate`,
	},
};

export default ROUTES;
