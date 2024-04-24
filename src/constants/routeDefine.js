const ROUTES = {
    Auth : {
        register: `/auth/register`,
        login: `/auth/login`,
        forgotPass: `/auth/forgot-password`,
        changePass: `/auth/change-password`,
    },
    Inventory : {
        findAll: `/inventory/find-all`,
    },
    BankAccount : {
        topup: `/bank-account/create-transaction`,
        filterTransaction: `/bank-account/find-transaction-by-option`,
    },
    Cart : {
        listAll: `/cart/items`,
    },
    TRANSLATOR: {
        HOST: `https://translate.terraprint.co/translate`,
    }
}

export default ROUTES;