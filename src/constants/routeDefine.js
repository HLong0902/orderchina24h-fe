const ROUTES = {
    Auth : {
        register: `/auth/register`,
        login: `/auth/login`,
        forgotPass: `/auth/forgot-password`,
    },
    Inventory : {
        findAll: `/inventory/find-all`,
    },
    BankAccount : {
        topup: `/bank-account/create-transaction`
    }
}

export default ROUTES;