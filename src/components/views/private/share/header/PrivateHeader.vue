<script setup>
import CommonUtils from '../../../../utils/CommonUtils';
import ApiCaller from '../../../../utils/ApiCaller';
import ROUTES from '../../../../../constants/routeDefine';
import CONSTANT from '../../../../../constants/constants';
import { useCartStore } from '../../../../../store/CartStore';
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
                        Số dư khả dụng: <span class="num_icon">0</span> VNĐ
                    </router-link>
                </p>
            </div>
            <div class="pull-left">
                <p class="ty_gia">Tỷ giá: 1¥ = {{ (CONSTANT.EXCHANGE_RATE / 1000).toFixed(3).replace('.', ',') }}</p>
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
                        </span> <span class="text">
                            <fa class="fa-icon" icon="bus" aria-hidden="true"></fa>
                            <a href="https://giaodich.hangquangchau24h.vn/ShipOrder"> Giỏ hàng ký gửi</a>
                        </span>

                        <a class="popup_link" onclick="showNotificationOverLay(this)"><span>
                                <fa class="fa-icon" icon="bell" aria-hidden="true"></fa>
                                Thông báo <span class="num_icon">0</span>
                            </span></a>
                    </p>
                </div>

            </div>
        </div>
    </div>
    <header>
        <div class="container">
            <div class="row1">
                <div class="pull-left">
                    <router-link to="/"><img style="height: 100px;" src="../../../../../assets/icons/logo.png"
                            alt="Hangquangchau24h.vn"></router-link>
                </div>

                <div class="pull-right">
                    <div id="topsearch">
                        <div class="frame">
                            <span class="store storehn">Kho hàng HN:</span>
                            <b>096.232.1688</b>
                            <br><br>
                            <span class="store storesg">Kho hàng SG:</span>
                            <b>&nbsp;096.232.1688</b>
                        </div>
                        <div class="hotline">
                            <div>
                                <b>Hotline:</b> <b style="color:#f26222;">096.232.1688</b><br><br>
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
import CommonUtils from '../../../../utils/CommonUtils';

export default {
    name: "PrivateHeader",
    setup() {

    },
    data() {
        return {
            cartItems: {},
            totalItems: 0,

            cartStore: useCartStore(),
        }
    },
    mounted() {
        this.getCartItems();
    },
    methods: {
        handleLogout() {
            localStorage.removeItem('userDto');
            sessionStorage.removeItem('jwtToken');
            this.$router.push({ path: "/login" })
        },
        promptUsername() {
            return CommonUtils.getUserDTO().username ?
                CommonUtils.getUserDTO().username
                :
                CommonUtils.getUserDTO().email.split("@")[0];
        },
        async getCartItems() {
            let loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.Cart.listAll);
            this.cartItems = res.data
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
    background: url(https://giaodich.hangquangchau24h.vn/static/images/bg-support-header.gif) no-repeat scroll right top transparent;
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