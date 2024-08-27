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
    staffsBuy: `/users/staff-buy`,
    customerInfo: (id) => `/users/${id}`,
    getAll: `/users`,
    update: `/users/update`,
    updateInfo: (id) => `/users/${id}`,
  },
  Inventory: {
    findAll: `/inventory/find-all`,
  },
  BankAccount: {
    topup: `/bank-account/create-transaction`,
    adminTopup: `/bank-account/admin/create-transaction`,
    filterTransaction: `/bank-account/find-transaction-by-option`,
    filterTransactionAdmin: `/bank-account/find-transaction-admin`,
    findBankRequestAdminFilter: `/bank-account/admin/find-transaction`,
    stats: `/bank-account/admin/stats`,
    updateTransaction: `/bank-account/update-transaction`,
    findAll: `/bank-account`,
    getUserTransaction: (id) =>
      `/bank-account/admin/get-user-transactions/${id}`,
  },
  Address: {
    saveAddress: `/address/create-receive-add`,
    getAddress: `/address/all`,
    updateAddress: `/address/update`,
    deleteAddress: `/address/delete`,
    selectAddress: `/address/select`,
    findByUsername: `/address/find-by-filter`,
    createOrUpdateDeliveryUpdate: `/address/create-or-update-address-delivery`,
  },
  Cart: {
    listAll: `/cart/items`,
    removeShop: '/cart/remove-shop',
    updateOrderItem: `/cart/update-order-item`,
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
    adminCountSendStats: `/order/admin/send-stats`,
    userCountSendStats: `/order/send-stats`,
    adminSearchOrderInfo: `/order/admin/search-order-info`,
    orderWithoutCriteria: `/order/admin/order-without-criteria`,
    updateFee: `/order/admin/update-order-infomation`,
    createDepositOrder: `/order/create-order-send`,
    getDepositOrder: `/order/find-order-send`,
    createOrderOtherEcommerce: `/order/create-order-tmdt`,
    outOfProduct: `/order/admin/out-of-product`,
    findOrderNeedGrant: `/order/find-order-approve-payment-company`,
    findOrderNeedPurchase: `/order/find-order-not-buy`,
    getTotalAmountOrder: `/order/get-total-amount-order`,
    saveCompanyPayment: `/order/admin/create-company-payment`,
    getOrderChinaWithCode: `/order/find-order`,
    getOrderList: `/order/search-order-list`,
  },
  OrderNote: {
    create: `/order-note/create`,
  },
  OrderShopCode: {
    findByOrderId: (id) => `/shop-code/find-by-order-id/${id}`,
    findByOrderIdCustom: (id) => `/shop-code/find-by-order-id?id=${id}`,
    create: `/shop-code/create`,
    createShopId: (shopId, orderId) =>
      `/shop-code/createShopId?shopId=${shopId}&orderId=${orderId}`,
    updateShopId: (shopId, id, orderId) =>
      `/shop-code/updateShopId?shopId=${shopId}&id=${id}&orderId=${orderId}`,
    createDomesticFees: (domesticFees, orderId) =>
      `/shop-code/updateDomesticFees?domesticFees=${domesticFees}&orderId=${orderId}`,
    updateDomesticFeesReal: (domesticFeesReal, orderId) =>
      `/shop-code/updateDomesticFeesReal?domesticFeesReal=${domesticFeesReal}&orderId=${orderId}`,
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
    deletePackageById: (id) => `/package/delete/${id}`,
    checkProduct: `/package/admin/check-product-update-inventory`,
    packageNotProcessed: `/package/packages-not-processed`,
    packageForTicket: `/package/admin/package-for-ticket`,
    updateListPackage: `/package/update-list-package`,
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
    updateItem: `/information/update-by-id`,
    updateService: `/information/update-config-service-fee`,
    findTransaction:(type) => `/information/get-last-transactions/${type}`,
  },
  DeliverOrder: {
    create: `/delivery-slip/create`,
    update: `/delivery-slip/update`,
    findByOption: `/delivery-slip/admin/find-by-option`,
    getDetail: (id) => `/delivery-slip/admin/details/${id}`,
    updateDelivery: `/delivery-slip/update-delivery`,
    updateStatus: `/delivery-slip/update-delivery-inven-status`,
    removeDelivery: (id) => `/delivery-slip/admin/remove-delivery/${id}`,
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
  Complain: {
    uploadFile: `/complain/upload-file`,
    getFile: `/complain/get-file`,
    create: `/complain/create`,
    update: `/complain/update`,
  },
  Article: {
    findAll: `/contents/find-all`,
    homePage: `/contents/homepage`,
    create: `/contents/create`,
    update: `/contents/update`,
    findById: `/contents/find-by-id`,
    delete: `/contents/delete`,
    findByCode: `/contents/find-by-code`,
  },
  Common: {
    translate: `/common/translate`,
  },
  Notification: {
    getAll: `/noti/get-all-noti`,
    markAsRead: (ids) => `/noti/seen-noti?ids=${ids}`
  }
};

export default ROUTES;
