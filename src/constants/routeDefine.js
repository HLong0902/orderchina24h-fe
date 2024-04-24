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
        topup: `/bank-account/create-transaction`,
        filterTransaction: `/bank-account/find-transaction-by-option`,
    }
}

export default ROUTES;