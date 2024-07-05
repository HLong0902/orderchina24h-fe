<script setup>
import VueCookie from 'vue-cookie';
import CommonUtils from '../../../../utils/CommonUtils';
import ApiCaller from '../../../../utils/ApiCaller';
import ROUTES from '../../../../../constants/routeDefine';
import CONSTANT from '../../../../../constants/constants';
import { useCartStore } from '../../../../../store/CartStore';
import { useCommonStore } from '../../../../../store/CommonStore';
</script>

<template>
    <div class="top_header">
        <div class="container">
            <div class="pull-left">
                <p>
                    <router-link to="/manage/member/profile">
                        <fa class="fa-icon" icon="user"></fa>
                        Xin chào,

                        <span class="red"><b>{{ promptUsername() }}</b></span>
                    </router-link>
                    &nbsp; | &nbsp;
                    <a style="cursor: pointer;" @click="handleLogout">Thoát</a>
                </p>

            </div>

            <div class="pull-left">
                <p class="ty_gia">
                    <router-link to="/manage/member/wallet">
                        <fa class="fa-icon" icon="credit-card" aria-hidden="true"></fa>
                        Số dư khả dụng: <span class="num_icon">{{ CommonUtils.formatNumber(commonStore.user_balance)
                            }}</span> VNĐ
                    </router-link>
                </p>
            </div>
            <div class="pull-left">
                <p class="ty_gia">Tỷ giá: 1¥ = {{ (commonStore.exchange_rate / 1000).toFixed(3).replace('.', ',') }}</p>
            </div>
            <div class="pull-right">

                <div class="pull-left">

                </div>

                <div class="pull-right">
                    <p>
                        <span class="text">
                            <fa class="fa-icon" icon="cart-shopping" aria-hidden="true"></fa>
                            <router-link to="/manage/cart"> Giỏ hàng <span class="num_icon">{{ totalItems
                                    }}</span></router-link>
                        </span>

                        <!-- <a class="popup_link" onclick="showNotificationOverLay(this)"><span>
                                <fa class="fa-icon" icon="bell" aria-hidden="true"></fa>
                                Thông báo <span class="num_icon">0</span>
                            </span></a> -->
                    </p>
                </div>

            </div>
        </div>
    </div>
    <header>
        <div class="container">
            <div class="row1">
                <div class="pull-left">
                    <a style="cursor: pointer; color: #0000ff;" @click="openMainPage"><img style="height: 100px;"
                            src="../../../../../assets/icons/logo.png" alt="orderchina24h.vn"></a>
                </div>

                <div class="pull-right">
                    <div id="topsearch">
                        <div class="frame">
                            <span class="store storehn">Kho hàng HN:</span>
                            <b>032.687.6636</b>
                            <br><br>
                            <span class="store storesg">Kho hàng TQ:</span>
                            <b>&nbsp;1731.040.0269</b>
                        </div>
                        <div class="hotline">
                            <div>
                                <b>Hotline:</b> <b style="color:#f26222;">032.687.6636</b><br><br>
                                <!--b>Hỗ trợ:</b>   <b style="color:#c1392b;">0964 733 811</b-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>

export default {
    name: "PrivateHeader",
    setup() {

    },
    data() {
        return {
            cartItems: {},
            totalItems: 0,

            cartStore: useCartStore(),
            commonStore: useCommonStore(),
        }
    },
    watch: {
        $route(to, from) {
            if (to.path == '/manage/cart' || to.path == '/manage/cart/step2' || to.path == '/manage/cart/step3') {
                this.getCartItems();
            }
        }
    },
    mounted() {
        this.getCartItems();
        this.getInfo();
        this.getListInventories();
        this.getExchangeRate();
        this.getChargingFee();
        this.getFeeByWeight();
        this.getPerWeightFee();
        this.getDepositPerWeightFee();
        this.getBulkDepositPerWeightFee();
        this.getBulkPerWeightFee();
    },
    methods: {
        async getListInventories() {
            const res = await ApiCaller.get(ROUTES.Inventory.findAll);
            const listInventories = res.data;
            this.commonStore.setInventories(listInventories);
        },
        async getPerWeightFee() {
            const link = ROUTES.Information.getValueByCode(CONSTANT.FEE_SHIP_WEIGHT);
            const res = await ApiCaller.post(link);
            this.commonStore.setLstFeeByWeight(res.data);
        },
        async getBulkPerWeightFee() {
            const link = ROUTES.Information.getValueByCode(CONSTANT.OPTION_SET.BULKY_GOODS);
            const res = await ApiCaller.post(link);
            this.commonStore.setLstBulkFeeByWeight(res.data);
        },
        async getDepositPerWeightFee() {
            const link = ROUTES.Information.getValueByCode(CONSTANT.OPTION_SET.DEPOSIT_SHIP_SINGLE);
            const res = await ApiCaller.post(link);
            this.commonStore.setDepositFeeByWeight(res.data);
        },
        async getBulkDepositPerWeightFee() {
            const link = ROUTES.Information.getValueByCode(CONSTANT.OPTION_SET.DEPOSIT_BULK_GOODS);
            const res = await ApiCaller.post(link);
            this.commonStore.setBulkDepositFeeByWeight(res.data);
        },
        async getInfo() {
            const loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.User.info);
            this.info = res.data;
            this.commonStore.setUserBalance(res?.data?.customerDTO?.availableBalance);
            loader.hide();
        },
        async getExchangeRate() {
            const link = ROUTES.Information.getValueByCode(CONSTANT.EXCHANGE_RATE);
            const res = await ApiCaller.post(link);
            try {
                const exchangeRate = parseInt(res?.data[0]?.value);
                this.commonStore.setExchangeRate(exchangeRate);
            } catch (e) { }
        },
        async getChargingFee() {
            const link = ROUTES.Information.getValueByCode(CONSTANT.CHARGING_FEE);
            const res = await ApiCaller.post(link);
            try {
                const chargingFee = parseInt(res?.data[0]?.value);
                this.commonStore.setChargingFee(chargingFee);
            } catch (e) { }
        },
        async getFeeByWeight() {
            const link = ROUTES.Information.getValueByCode(CONSTANT.FEE_BY_WEIGHT);
            const res = await ApiCaller.post(link);
            try {
                const feeByWeight = parseInt(res?.data[0]?.value);
                this.commonStore.setFeeByWeight(feeByWeight);
            } catch (e) { }
        },
        handleLogout() {
            localStorage.removeItem('userDto');
            localStorage.removeItem('jwtToken');
            VueCookie.delete("x-order-china24h");
            this.$router.push({ path: "/login" })
        },
        promptUsername() {
            return CommonUtils.getUserDTO()?.username ?
                CommonUtils.getUserDTO()?.username
                :
                CommonUtils.getUserDTO()?.email.split("@")[0];
        },
        openMainPage() {
            window.open('/');
        },
        async getCartItems() {
            let loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.Cart.listAll);
            this.cartItems = res?.data
            this.totalItems = 0;
            for (const key in this.cartItems) {
                if (this.cartItems.hasOwnProperty(key)) {
                    this.cartItems[key].forEach(item => {
                        this.totalItems += item.numberItem;
                    });
                }
            }
            loader.hide()
            this.cartStore.setCart(this.cartItems);
        }
    }
}
</script>

<style scoped>
@import '../../../../../assets/styles/bootstrap.min.css';

.top_header {
    background-color: #f2f2f2;
    box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.3);
    /* position: fixed; */
    width: 100%;
    z-index: 99999999999;
    font-size: 13px !important;
}

.wrapper .container {
    max-width: 1024px;
}

.top_header .pull-left {
    border-right: 2px solid #e0e0e0;
    padding-right: 10px;
    padding-left: 10px;
}

.pull-left {
    float: left !important;
}

.top_header p {
    line-height: 40px !important;
}

.top_header .fa-icon {
    color: #d75e29;
    border-radius: 50%;
    font-size: 16px;
    margin-left: 5px;
    margin-right: 5px;
}

.red,
.red:hover {
    color: red !important;
}

.top_header .ty_gia {
    line-height: 40px !important;
}

.num_icon {
    background: #87cf82;
    color: #fff;
    padding: 2px 6px;
    font-weight: bold;
}

.main_logo img {
    margin-top: 10px;
}

#topsearch {
    background: url(/bg-support-header.gif) no-repeat scroll right top transparent;
    border: 1px dashed #DDDDDD;
    float: right;
    margin-top: 10px;
    padding: 10px 50px 10px 10px;
}

#topsearch .frame {
    float: left;
    margin-right: 10px;
}

#topsearch .frame .storehn {
    float: left;
    margin-right: 18px;
    padding-top: 2px;
}

.skype_frame {
    width: 50px;
    display: inline-block;
}

#topsearch .frame b {
    color: #00a79c;
    margin-left: 17px;
    line-height: 22px;
}

#topsearch .frame .storesg {
    float: left;
    margin-left: 0px;
    margin-right: 17px;
    padding-top: 2px;
}

#topsearch .hotline {
    float: left;
    margin-top: 18px;
    margin-left: 30px;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
form,
input,
select,
ul,
p,
textarea {
    margin: 0px;
    padding: 0;
}

a {
    text-decoration: none;
    color: #434343;
    background: transparent;
    transition: color 0.15s ease-in-out 0s;
}

header {
    padding: 10px 0px !important;
}
</style>