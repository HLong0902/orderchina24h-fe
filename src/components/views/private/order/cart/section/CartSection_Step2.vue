<script setup>
import { useCartStore } from '../../../../../../store/CartStore';
import { useCommonStore } from '../../../../../../store/CommonStore';
import CONSTANT from '../../../../../../constants/constants';
import ApiCaller from '../../../../../utils/ApiCaller';
import ROUTES from '../../../../../../constants/routeDefine';
import CommonUtils from '../../../../../utils/CommonUtils';
import StorageManager from '../../../../../utils/StorageManager';
</script>

<!-- template section -->
<template>
    <div id="content">
        <div class="container">
            <main class="main" role="main">
                <div class="row main-row">
                    <div class="shoping_cart">
                        <div class="col-md-12">
                            <h2 class="page-title">Địa chỉ nhận hàng</h2>
                            <div class="container">
                                <ul class="progressbar">
                                    <li class="active">Chọn shop</li>
                                    <li class="active">Chọn địa chỉ nhận hàng</li>
                                    <li>Lên đơn</li>
                                </ul>
                            </div>



                            <div id="BookOrderAlert" class="alert-success custom_alert "></div>

                            <div id="checkout_step3" class="customer_shop" style="margin-top:30px; display:none;">
                                <div class="container">
                                    <div class="row">
                                        <h4><i class="fa fa-shopping-cart"></i> Danh sách đơn hàng đã cọc thành công
                                        </h4>
                                        <table class=" table table_cart" id="checkout_step3_table">
                                            <thead>
                                                <tr class="header-border">
                                                    <td style="width: 5%;">#</td>
                                                    <td style="width: 20%;">Mã đơn</td>
                                                    <td style="width: 30%;">Shop</td>
                                                    <td class="center" style="width:20%;">Số lượng</td>
                                                    <td class="left" style="width: 25%;">Tiền hàng</td>
                                                    <td class="left" style="width: 25%;">Tiền đã cọc</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div id="checkout_step2" style="margin-top: 30px;">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="customer_address row gray_box padding20">
                                                <h4><i class="fa fa-map-marker"></i> Địa chỉ nhận hàng</h4>
                                                <div id="list_address">
                                                    <div v-for="add in activeAddr" class="box_address"
                                                        :class="{ 'box_active': add.isActive }">
                                                        <input type="hidden" id="default_address" value="9908">
                                                        <div v-if="add.isActive" class="tool_box tool_box_active">
                                                            <a class="action-address">
                                                                <fa icon="map-marker-alt"></fa>
                                                            </a>
                                                        </div>
                                                        <p class="address_name">
                                                            <b>{{ add.name }} / {{ add.phoneNumber }}</b>
                                                        </p>
                                                        <p>Địa chỉ : {{ add.address }} </p>
                                                        <p>Kho hàng : <span class="bold black">{{
                                                            promptWarehouseById(add.inventoryId) }}</span> /
                                                            {{ promptWarehouseNameById(add.inventoryId) }}</p>
                                                    </div>
                                                    <div v-for="add in inactiveAddr" class="box_address">
                                                        <div class="tool_box">
                                                            <a class="action-address" @click="activeAddress(add.id)"
                                                                style="cursor: pointer; color: #0000ff;">
                                                                <fa icon="map-marker-alt"></fa> Sử dụng
                                                            </a>
                                                        </div>
                                                        <p class="address_name">
                                                            <b>{{ add.name }} / {{ add.phoneNumber }}</b>
                                                            <a class="bt_edit action-address"
                                                                @click="openModal('edit-address-modal', add)">
                                                                <fa icon="pencil"></fa> Sửa
                                                            </a>

                                                            <a class="bt_del" @click="delAddress(add.id)">
                                                                <fa icon="close"></fa> Xóa
                                                            </a>
                                                        </p>
                                                        <p>Địa chỉ : {{ add.address }} </p>
                                                        <p>Kho hàng : <span class="bold green">{{
                                                            promptWarehouseById(add.inventoryId) }}</span> / {{
                                                                    promptWarehouseNameById(add.inventoryId) }}</p>
                                                    </div>
                                                    <b-modal id="edit-address-modal" centered hide-header-close
                                                        hide-footer title="Chỉnh sửa thông tin địa chỉ nhận hàng">
                                                        <div rel="body" class="contentPopup" style="padding:20px;">
                                                            <form name="changesupport" action=""
                                                                @submit.prevent="handleSubmit"
                                                                class="align-center ajaxForm Support" method="POST">
                                                                <div class="form-group">
                                                                    <input type="text" class="form-control"
                                                                        name="receiver_name" v-model="receiverName"
                                                                        placeholder="Tên người nhận" value="">
                                                                </div>
                                                                <div v-if="errorsAddress.receiverName"
                                                                    class="bubble-message">{{
                                                                        errorsAddress.receiverName
                                                                    }}</div>
                                                                <div class="form-group">
                                                                    <input type="text" class="form-control"
                                                                        name="receiver_phone" v-model="receiverPhone"
                                                                        placeholder="Số ĐT người nhận" value="">
                                                                </div>
                                                                <div v-if="errorsAddress.receiverPhone"
                                                                    class="bubble-message">{{
                                                                        errorsAddress.receiverPhone }}</div>
                                                                <div class="form-group">
                                                                    <input type="text" class="form-control"
                                                                        name="fulladdress" v-model="receiverAddress"
                                                                        placeholder="Địa chỉ người nhận" value="">
                                                                </div>
                                                                <div v-if="errorsAddress.receiverAddress"
                                                                    class="bubble-message">{{
                                                                        errorsAddress.receiverAddress }}</div>
                                                                <div class="form-group">
                                                                    <select name="store" class="form-control"
                                                                        v-model="warehouseLocation"
                                                                        @change="loadSubStore">
                                                                        <option value="">Vị trí kho hàng việt
                                                                            nam
                                                                        </option>
                                                                        <option v-for="item in getLocation()"
                                                                            :key="item" :value="item">
                                                                            {{ item }}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                                <div v-if="errorsAddress.warehouseLocation"
                                                                    class="bubble-message">{{
                                                                        errorsAddress.warehouseLocation }}</div>

                                                                <div class="form-group">
                                                                    <select v-model="warehouseId" id="sub_store"
                                                                        name="sub_store" class="form-control">
                                                                        <option v-if="warehouseLocation == ''" value="">
                                                                            Bạn cần chọn Vị trí kho hàng
                                                                        </option>
                                                                        <option v-if="warehouseLocation != ''" value="">
                                                                            Danh sách kho hàng tại {{
                                                                                warehouseLocation
                                                                            }}
                                                                        </option>
                                                                        <option v-for="item in warehouseList"
                                                                            :key="item.id" :value="item.id">
                                                                            {{ item.name }}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                                <div v-if="errorsAddress.warehouseId"
                                                                    class="bubble-message">{{
                                                                        errorsAddress.warehouseId
                                                                    }}</div>

                                                                <div class="form-group">
                                                                    <input @click="editReceiverAddress" type="submit"
                                                                        class="btn btn-danger" name="save" value="Lưu">
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </b-modal>
                                                </div>
                                                <div class="">
                                                    <!-- <a onclick="openPopup('#/member/addAddress',{},600,500)"
                                                        class="btn bg_yellow popup_link">Thêm mới địa chỉ</a> -->
                                                    <b-button class="btn bg_yellow popup_link"
                                                        v-b-modal.add-address-modal>Thêm
                                                        mới địa chỉ</b-button>

                                                    <b-modal id="add-address-modal" centered hide-header-close
                                                        hide-footer title="Thêm mới địa chỉ nhận hàng">
                                                        <div rel="body" class="contentPopup" style="padding:20px;">
                                                            <form name="changesupport" action=""
                                                                @submit.prevent="handleSubmit"
                                                                class="align-center ajaxForm Support" method="POST">
                                                                <div class="form-group">
                                                                    <input type="text" class="form-control"
                                                                        name="receiver_name" v-model="receiverName"
                                                                        placeholder="Tên người nhận" value="">
                                                                </div>
                                                                <div v-if="errorsAddress.receiverName"
                                                                    class="bubble-message">{{ errorsAddress.receiverName
                                                                    }}</div>
                                                                <div class="form-group">
                                                                    <input type="text" class="form-control"
                                                                        name="receiver_phone" v-model="receiverPhone"
                                                                        placeholder="Số ĐT người nhận" value="">
                                                                </div>
                                                                <div v-if="errorsAddress.receiverPhone"
                                                                    class="bubble-message">{{
                                                                        errorsAddress.receiverPhone }}</div>
                                                                <div class="form-group">
                                                                    <input type="text" class="form-control"
                                                                        name="fulladdress" v-model="receiverAddress"
                                                                        placeholder="Địa chỉ người nhận" value="">
                                                                </div>
                                                                <div v-if="errorsAddress.receiverAddress"
                                                                    class="bubble-message">{{
                                                                        errorsAddress.receiverAddress }}</div>
                                                                <div class="form-group">
                                                                    <select name="store" class="form-control"
                                                                        v-model="warehouseLocation"
                                                                        @change="loadSubStore">
                                                                        <option value="">Vị trí kho hàng việt nam
                                                                        </option>
                                                                        <option v-for="item in getLocation()"
                                                                            :key="item" :value="item">
                                                                            {{ item }}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                                <div v-if="errorsAddress.warehouseLocation"
                                                                    class="bubble-message">{{
                                                                        errorsAddress.warehouseLocation }}</div>

                                                                <div class="form-group">
                                                                    <select v-model="warehouseId" id="sub_store"
                                                                        name="sub_store" class="form-control">
                                                                        <option v-if="warehouseLocation == ''" value="">
                                                                            Bạn cần chọn Vị trí kho hàng
                                                                        </option>
                                                                        <option v-if="warehouseLocation != ''" value="">
                                                                            Danh sách kho hàng tại {{ warehouseLocation
                                                                            }}
                                                                        </option>
                                                                        <option v-for="item in warehouseList"
                                                                            :key="item.id" :value="item.id">
                                                                            {{ item.name }}
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                                <div v-if="errorsAddress.warehouseId"
                                                                    class="bubble-message">{{ errorsAddress.warehouseId
                                                                    }}</div>

                                                                <div class="form-group">
                                                                    <input @click="saveReceiverAddress" type="submit"
                                                                        class="btn btn-danger" name="save" value="Lưu">
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </b-modal>
                                                </div>
                                            </div>

                                        </div>

                                        <div class="col-md-6">
                                            <div class="customer_shop">
                                                <h4><i class="fa fa-shopping-cart"></i> Danh sách shop kết đơn </h4>
                                                <table class=" table table_cart" id="cartTable">
                                                    <thead>
                                                        <tr class="header-border">
                                                            <td style="width: 5%;"><input type="checkbox" checked="true"
                                                                    readonly="true" disabled="disabled"></td>
                                                            <td style="width: 50%;">Shop</td>
                                                            <td class="center" style="width:20%;">Số lượng</td>
                                                            <td class="left" style="width: 25%;">Tiền hàng</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(item, idx) in getSelectedSellers()" :key="idx">
                                                            <td><input type="checkbox" checked="true" readonly=""
                                                                    disabled="disabled"></td>
                                                            <td>
                                                                <img style="width:30px;"
                                                                    :src="promptImageBySeller(item)">
                                                                {{ item }}
                                                            </td>
                                                            <td class="align-center">{{ promptQuantityMetrics(item) }}
                                                            </td>
                                                            <td><span class="bold green">{{
                                                                CommonUtils.formatNumber(calcFeeBySeller(item))
                                                                    }}</span> đ</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div class="shop_book_total">
                                                <p>Tổng tiền hàng : <span class="bold red">{{
                                                    CommonUtils.formatNumber(calcAllFee()) }}</span> đ</p>
                                                <p>Đặt cọc(70%) : <span class="bold blue">{{
                                                    CommonUtils.formatNumber(calcAllFee() * 0.7) }}</span> đ</p>
                                                <p>Số dư hiện tại : <span class="bold green">{{
                                                    CommonUtils.formatNumber(commonStore.user_balance) }}</span> đ
                                                </p>
                                                <button @click="bookAllSellerOrder3" class="btn bg_green bt_dathang">Gửi
                                                    đơn</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </main>
        </div>

    </div>
</template>

<!-- function defined -->
<script>
export default {
    name: 'CartSection_Step2',
    data() {
        return {
            listInventories: {},

            addresses: null,
            activeAddr: null,
            inactiveAddr: null,

            receiverName: '',
            receiverPhone: '',
            receiverAddress: '',
            warehouseLocation: '',
            warehouseList: '',
            warehouseId: '',
            addressId: '',

            selectedAdd: null,
            selectedCart: [],
            mapShopDescription: new Map(),

            errorsAddress: {},

            cartStore: useCartStore(),
            commonStore: useCommonStore(),
        }
    },
    mounted() {
        this.getListInventories();
        this.getAllAddress();
        if (Object.keys(this.cartStore.selectedCart).length == 0) {
            this.$router.push({ path: "/manage/cart" });
        } else {
            this.selectedCart = this.cartStore.selectedCart;
            this.mapShopDescription = this.cartStore.mapShopDescription;
        }
    },
    watch: {
        receiverName($) {
            this.validateFormAddress()
        },
        receiverPhone($) {
            this.validateFormAddress()
        },
        receiverAddress($) {
            this.validateFormAddress()
        },
        warehouseLocation($) {
            this.validateFormAddress()
        },
        warehouseId($) {
            this.validateFormAddress()
        },
    },
    computed: {
        hasErrorsAddress() {
            return Object.keys(this.errorsAddress).length > 0;
        }
    },
    methods: {
        async getListInventories() {
            let loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.Inventory.findAll);
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                return;
            }
            this.listInventories = res.data;
        },
        async getAllAddress() {
            let loader = this.$loading.show();
            const res = await ApiCaller.get(ROUTES.Address.getAddress);
            loader.hide();
            if (res.status != 200) {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                return;
            }
            this.addresses = res.data;
            this.activeAddr = this.addresses.filter($ => $.isActive);
            this.inactiveAddr = this.addresses.filter($ => !$.isActive);
        },
        getLocation() {
            return new Set(this.listInventories.map(warehouse => warehouse.location));
        },
        loadSubStore() {
            this.warehouseList = this.listInventories.filter($ => $.location == this.warehouseLocation)
        },
        promptWarehouseById(id) {
            return this.listInventories?.filter($ => $.id == id)[0]?.location;
        },
        promptWarehouseNameById(id) {
            return this.listInventories?.filter($ => $.id == id)[0]?.name;
        },
        async saveReceiverAddress() {
            this.validateFormAddress()
            if (!this.hasErrorsAddress) {
                let loader = this.$loading.show();
                const payload = {
                    inventoryId: this.warehouseId,
                    name: this.receiverName,
                    phoneNumber: this.receiverPhone,
                    address: this.receiverAddress,
                }
                const res = await ApiCaller.post(ROUTES.Address.saveAddress, payload);
                loader.hide();
                if (res.status == 200) {
                    this.$toast.success(`Thêm địa chỉ người nhận thành công`, {
                        title: 'Thông báo',
                        position: 'top-right',
                        autoHideDelay: 7000,
                    })
                    this.$bvModal.hide('add-address-modal')
                    this.getAllAddress();
                } else {
                    this.$toast.error(`${res.data.message}`, {
                        title: 'Thông báo',
                        position: 'top-right',
                        autoHideDelay: 7000,
                    })
                }
            }
        },
        async editReceiverAddress() {
            this.validateFormAddress()
            if (!this.hasErrorsAddress) {
                let loader = this.$loading.show();
                const payload = {
                    id: this.addressId,
                    inventoryId: this.warehouseId,
                    name: this.receiverName,
                    phoneNumber: this.receiverPhone,
                    address: this.receiverAddress,
                }
                const res = await ApiCaller.post(ROUTES.Address.updateAddress, payload);
                loader.hide();
                if (res.status == 200) {
                    this.$toast.success(`Chỉnh sửa địa chỉ người nhận thành công`, {
                        title: 'Thông báo',
                        position: 'top-right',
                        autoHideDelay: 7000,
                    })
                    this.$bvModal.hide('edit-address-modal')
                    this.getAllAddress();
                } else {
                    this.$toast.error(`${res.data.message}`, {
                        title: 'Thông báo',
                        position: 'top-right',
                        autoHideDelay: 7000,
                    })
                }
            }
        },
        validateFormAddress() {
            this.errorsAddress = {};

            if (!this.receiverName)
                this.errorsAddress.receiverName = 'Tên người nhận là bắt buộc';

            if (!this.receiverPhone) {
                this.errorsAddress.receiverPhone = 'Số ĐT người nhận là bắt buộc';
            }

            if (!this.receiverAddress) {
                this.errorsAddress.receiverAddress = 'Địa chỉ người nhận là bắt buộc';
            }

            if (!this.warehouseLocation) {
                this.errorsAddress.warehouseLocation = 'Vị trí kho hàng là bắt buộc';
            }

            if (this.warehouseLocation && !this.warehouseId) {
                this.errorsAddress.warehouseId = 'Danh sách kho hàng là bắt buộc';
            }
        },
        openModal(modal, selected) {
            this.$bvModal.show(modal);
            this.receiverName = selected.name;
            this.receiverPhone = selected.phoneNumber;
            this.receiverAddress = selected.address;
            this.addressId = selected.id;
            this.warehouseLocation = this.promptWarehouseById(selected.inventoryId);
            this.warehouseList = this.listInventories.filter($ => $.location == this.warehouseLocation)
            this.warehouseId = selected.inventoryId;
        },
        async delAddress(address_id) {
            let loader = this.$loading.show();
            const params = {
                id: address_id,
            }
            const res = await ApiCaller.postParams(ROUTES.Address.deleteAddress, params);
            loader.hide();
            if (res.status == 200) {
                this.$toast.success(`Xoá địa chỉ người nhận thành công`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                this.getAllAddress();
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            }
        },
        async activeAddress(address_id) {
            let loader = this.$loading.show();
            const params = {
                id: address_id,
            }
            const res = await ApiCaller.postParams(ROUTES.Address.selectAddress, params);
            loader.hide();
            if (res.status == 200) {
                this.$toast.success(`Lựa chọn địa chỉ người nhận thành công`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                this.getAllAddress();
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            }
        },
        getSelectedSellers() {
            let sellers = [];
            for (const sellerId in this.selectedCart) {
                sellers.push(sellerId)
            }
            return sellers;
        },
        promptImageBySeller(seller_id) {
            return this.selectedCart[seller_id][0].itemImage
        },
        promptQuantityMetrics(seller_id) {
            let quantity = this.selectedCart[seller_id]
                .reduce((sum, item) => sum + item.numberItem, 0);
            let items = this.selectedCart[seller_id].length;
            return quantity + ' / ' + items;
        },
        calcFeeBySeller(seller_id) {
            return this.selectedCart[seller_id]
                .reduce((sum, item) => sum + item.numberItem * item.itemPrice * this.commonStore.exchange_rate, 0);
        },
        calcAllFee() {
            let total = 0;
            for (let seller_id in this.selectedCart) {
                total += this.calcFeeBySeller(seller_id);
            }
            return total;
        },
        async bookAllSellerOrder3() {
            if(this.activeAddr[0]?.id == null || this.activeAddr[0]?.id.length == 0) {
                    this.$toast.error(`Bạn cần phải lựa chọn địa chỉ trước khi đặt cọc đơn hàng`, {
                        title: 'Thông báo',
                        position: 'top-right',
                        autoHideDelay: 7000,
                    })
                    return;
                }
            let loader = this.$loading.show()
            let payload = { orderDTOS: [] };
            for (let seller_id in this.selectedCart) {
                let orderDto = {};
                orderDto.sellerId = seller_id;
                orderDto.isWoodworkingFee = this.selectedCart[seller_id].some(item => item.woodWorkFee === true);
                orderDto.addressId = this.activeAddr[0].id;
                orderDto.isTallyFee = this.selectedCart[seller_id].some(item => item.tallyFee === true);
                orderDto.orderItems = this.selectedCart[seller_id];
                orderDto.description = this.mapShopDescription.get(seller_id)
                orderDto.orderItems.forEach($ => {
                    delete $.tallyFee
                    delete $.woodWorkFee
                })
                payload.orderDTOS.push(orderDto);
            }
            const res = await ApiCaller.post(ROUTES.Order.createOrder, payload);
            loader.hide();
            if (res.status == 200) {
                this.$toast.success(`Đặt hàng thành công`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
                this.cartStore.setOrderedCart(res.data)
                StorageManager.store('orderedCart', res.data);
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            }
            this.$router.push({ path: "/manage/cart/step3" });
        },
    }
}
</script>

<!-- style custom -->
<style scoped>
@import '../../../../../../assets/styles/bootstrap.min.css';
@import '../../../../../../assets/styles/w2-ui.min.css';
@import '../../../../../../assets/styles/private-styles.css';
</style>