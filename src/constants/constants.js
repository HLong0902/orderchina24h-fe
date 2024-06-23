const CONSTANT = {
  EXCHANGE_RATE: "TY_GIA",
  CHARGING_FEE: "CHARGING_FEE",
  FEE_BY_WEIGHT: "FEE_BY_WEIGHT",
  FEE_SHIP_WEIGHT: "FEE_SHIP_WEIGHT",
  BANK_SUPPORT: "BANK",
  OPTION_SET: {
    TY_GIA: "TY_GIA",
    HOTLINE: "HOTLINE",
    LIENHE: "LIENHE",
    NVHT: "NVHT",
    SERVICE_FEE: "SERVICE_FEE",
    DOWN_PAYMENT: "DOWN_PAYMENT",
    BANK: "BANK",
    KDSP: "KDSP",
    KDSP_1: "KDSP_1",
    FEE_SHIP_WEIGHT: "FEE_SHIP_WEIGHT",
    WOOD_FEE: "WOOD_FEE",
    BULKY_GOODS: "BULKY_GOODS",
    BATCH_GOODS: "BATCH_GOODS",
    BATCH_GOODS_VOLUME: "BATCH_GOODS_VOLUME",
    HEAVY_GOOD: "HEAVY_GOOD",
    DEPOSIT_SHIP_SINGLE: "DEPOSIT_SHIP_SINGLE",
    DEPOSIT_BATCH_GOODS: "DEPOSIT_BATCH_GOODS",
    DEPOSIT_HEAVY_GOODS: "DEPOSIT_HEAVY_GOODS",
    DEPOSIT_BULK_GOODS: "DEPOSIT_BULK_GOODS",
    DEPOSIT_WOOD_FEE: "DEPOSIT_WOOD_FEE",
    DELIVERY_METHOD: "SHIP_FORM",
  },
  ORDER_STATUS: {
    DA_DUYET: 1,
    DA_DAT_COC: 2,
    DA_MUA_HANG: 3,
    HANG_DA_VE_KHO_TQ: 4,
    HANG_DA_VE_KHO_VN: 5,
    SAN_SANG_GIAO_HANG: 6,
    DA_GIAO: 7,
    CHO_XU_LY_KHIEU_NAI: 8,
    DA_KET_THUC: 9,
    DA_HUY: 0,
  },
  DEPOSIT_ORDER_STATUS: {
    DA_DUYET: 1,
    HANG_DA_VE_KHO_TQ: 4,
    HANG_DA_VE_KHO_VN: 5,
    SAN_SANG_GIAO_HANG: 6,
    DA_GIAO: 7,
    DA_KET_THUC: 9,
    DA_HUY: 0,
  },
  BANK_TYPE: {
    NAP_TIEN: 1,
    RUT_TIEN: 0,
    DAT_COC: 2,
    TAT_TOAN: 3,
    HOAN_TIEN: 4,
    THANH_TOAN_DON_HANG: 5,
    THANH_TOAN_VAN_DON: 6,
  },
  TRANSACTION_STATUS: {
    REJECT: 0,
    PENDING: 1,
    APPROVE: 2,
  },
  PACKAGE_STATUS: {
    NB_PHAT_HANH: 1,
    NHAP_KHO_TQ: 2,
    GUI_BAO_TQ: 3,
    NHAN_BAO_VIETNAM: 4,
    DA_KIEM: 5,
    NHAP_KHO_VN: 6,
    DA_GIAO: 7,
    DETELE: 0,
  },
  BAG_STATUS: {
    MO: 1,
    GUI_HANG: 2,
    NHAN_HANG: 3,
    DONG: 0,
  },
  ORDER_QUERY_CRITERIA: {
    WITHOUT_SHOP: "WITHOUT_SHOP",
    WITHOUT_DOMESTIC_FEE: "WITHOUT_DOMESTIC_FEE",
    WITHOUT_SHIP_CODE: "WITHOUT_SHIP_CODE",
  },
  ORDER_LOGS_CODE: {
    GIA_VAN_CHUYEN: "GIA_VAN_CHUYEN",
    TY_GIA: "TY_GIA",
    DONG_GO: "DONG_GO",
    PHI_DICH_VU: "PHI_DICH_VU",
  },
  DELIVERY_METHOD_CODE: {
    GIAO_HANG_XE_KHACH: "GIAO_HANG_XE_KHACH",
    GIAO_NHAN_TAI_KHO: "GIAO_NHAN_TAI_KHO",
    GHTK: "GHTK",
    VIETTEL_POST: "VIETTEL_POST",
    GUI_NOI_THANH: "GUI_NOI_THANH",
  },
  DELIVERY_STATUS: {
    CHUA_GIAO: 1,
    DA_GIAO: 2,
  },
  COMPLAIN: {
    WAIT: 1,
    IN_PROCESS: 2,
    SUCCESS: 3,
    FAIL: 4,
    ORDER_PROCESSING: 5,
    REMOVE: 6,
  },
  ROLE: {
    KHACH_HANG: 0,
    ADMIN: 1,
    NHAN_VIEN_TU_VAN: 2,
    NHAN_VIEN_MUA_HANG: 3,
    NHAN_VIEN_KHO: 4,
    ALL: [1, 2, 3, 4],
  },
  ROLE_STAFF: {
    NHAN_VIEN_TU_VAN: 2,
    NHAN_VIEN_MUA_HANG: 3,
    NHAN_VIEN_KHO: 4,
  },
  ARTICLE: {
    INTRODUCTION: "INTRODUCTION",
    GUIDE_TOPUP: "GUIDE_TOPUP",
    GUIDE_ORDER: "GUIDE_ORDER",
    NEWS: "NEWS",
    POLICY: "POLICY",
  },
  DEFAULT_ARTICLE: [
    "INTRODUCTION",
    "GUIDE_ORDER",
    "GUIDE_TOPUP",
    "NEWS",
    "POLICY",
  ],
  DEFAULT_PAGESIZE: 20,
  CKEDITOR_DEFAULT_CONFIG: {
    height: 300,
    extraPlugins: [
      function (editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
          return new UploadAdapter(loader);
        };
      },
    ],
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "subscript",
        "superscript",
        "|",
        "fontSize",
        "fontFamily",
        "fontColor",
        "fontBackgroundColor",
        "highlight",
        "|",
        "link",
        "imageUpload",
        "mediaEmbed",
        "|",
        "bulletedList",
        "numberedList",
        "todoList",
        "|",
        "insertTable",
        "tableColumn",
        "tableRow",
        "mergeTableCells",
        "|",
        "blockQuote",
        "codeBlock",
        "horizontalLine",
        "pageBreak",
        "|",
        "htmlEmbed",
        "sourceEditing",
        "mathType",
        "specialCharacters",
        "|",
        "undo",
        "redo",
        "|",
        "cut",
        "copy",
        "paste",
        "pastePlainText",
        "|",
        "indent",
        "outdent",
        "|",
        "alignment",
        "|",
        "findAndReplace",
        "|",
        "removeFormat",
        "selectAll",
        "exportPdf",
      ],
    },
    fontSize: {
      options: ["tiny", "small", "default", "big", "huge"],
      supportAllValues: true,
    },
    fontFamily: {
      options: [
        "default",
        "Arial, Helvetica, sans-serif",
        "Courier New, Courier, monospace",
        "Georgia, serif",
        "Lucida Sans Unicode, Lucida Grande, sans-serif",
        "Tahoma, Geneva, sans-serif",
        "Times New Roman, Times, serif",
        "Trebuchet MS, Helvetica, sans-serif",
        "Verdana, Geneva, sans-serif",
      ],
      supportAllValues: true,
    },
    fontColor: {
      colors: [
        {
          color: "hsl(0, 0%, 0%)",
          label: "Black",
        },
        {
          color: "hsl(0, 0%, 30%)",
          label: "Dim grey",
        },
        {
          color: "hsl(0, 0%, 60%)",
          label: "Grey",
        },
        {
          color: "hsl(0, 0%, 90%)",
          label: "Light grey",
        },
        {
          color: "hsl(0, 0%, 100%)",
          label: "White",
          hasBorder: true,
        },
        // Add more colors as needed
      ],
    },
  },
};

export default CONSTANT;
