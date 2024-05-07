<script setup>
import CONSTANT from '../../../../../../constants/constants';
import ROUTES from '../../../../../../constants/routeDefine';
import ApiCaller from '../../../../../utils/ApiCaller';
import CommonUtils from '../../../../../utils/CommonUtils';
</script>

<!-- template section -->
<template>
	<div id="content" class="clearfix fullwidth">
		<h2 class="title">Danh sách giao dịch</h2>
		<div class="list_status clearfix">
			<ul>
				<li>
					<a
						href="https://ql.hangquangchau24h.vn/orders/lists"
						class="black"
					>
						Tòan bộ : <span>(278573)</span>
					</a>
				</li>
				<li>
					<a
						href="https://ql.hangquangchau24h.vn/orders/lists?filter_status=0"
						class="chuaduyet hidden"
					>
						Chưa duyệt : <span>(0)</span>
					</a>
				</li>
				<li>
					<a
						href="https://ql.hangquangchau24h.vn/orders/lists?filter_status=1"
						class="green"
					>
						Đã duyệt : <span>(1037)</span>
					</a>
				</li>
				<li>
					<a
						href="https://ql.hangquangchau24h.vn/orders/lists?filter_status=2"
						class="dathanhtoan"
					>
						Đã từ chối : <span>(196)</span>
					</a>
				</li>
			</ul>
		</div>
		<div class="filer_box">
			<form
				action="https://ql.hangquangchau24h.vn/orders/lists"
				method="GET"
			>
				Mã giao dịch:<input type="text" value="" name="filter_id" />
				Username:<input type="text" value="" name="filter_username" />
				Phone:<input type="text" value="" name="filter_phone" />
				Email:<input type="text" value="" name="filter_email" />
				<input class="button" type="submit" value="Tìm kiếm" />
			</form>
		</div>
		<div class="gridtable">
			<table>
				<tbody>
					<tr>
						<td>STT</td>
						<td width="10%">Ngày giao dịch</td>
						<td>Mã hoá đơn</td>
						<td width="20%">Thông tin khách hàng</td>
						<td>Số tiền nạp</td>
						<td>Ngân hàng</td>
						<td>Ghi chú</td>
						<td>Trạng thái</td>
						<td style="width: 170px">Thao tác</td>
					</tr>
					<tr v-for="(transaction, index) in transactionList">
						<td class="align-center">{{ index + 1 }}</td>
						<td>
							<p><b>{{ CommonUtils.formatDate(transaction.createDate) }}</b></p>
						</td>
						<td>
							<p>
                                <span class="blue">
                                    {{ transaction.transactionCode }}
                                </span>
							</p>
						</td>
						<td>
                            <p>
                                <span class="red">
                                    Tài khoản:
                                </span>
                                <b>{{ transaction.customer.username }}</b>
                            </p>
                            <p>
                                <span class="blue">
                                    Tên KH:
                                </span>
                                {{ transaction.customer.fullName }}
							</p>
                            <p>
                                <span class="green">
                                    Liên hệ:
                                </span>
                                {{ transaction.customer.phone }} / {{ transaction.customer.email }}
							</p>
                        </td>
						<td>
							<span class="bold green">{{ CommonUtils.formatNumber(transaction.amount) }}</span> VNĐ
						</td>
						<td>
							<b>{{ transaction.bankName }}</b>
						</td>
						<td> {{ transaction.description }} </td>
						<td>
							<span :class="promptClassFromValue(transaction.status)">{{ promptNameFromValue(transaction.status) }}</span>
						</td>
						<td v-if="transaction.status == 1">
                            <b-button v-b-modal:[`confirm-${transaction.id}`] style="font-size: 12px;" squared variant="outline-success">Duyệt</b-button>
                            <b-modal 
                                hide-header centered 
                                :id="`confirm-${transaction.id}`"
                                >
                                <p class="my-4">Bạn có muốn xác nhận giao dịch <span class="green">{{ transaction.transactionCode }}</span> của khách hàng <span class="blue">{{ transaction.customer.fullName }}</span> hay không</p>
                                <template #modal-footer>
                                    <b-button 
                                        variant="outline-primary"
                                        style="font-size: 12px;"
                                        squared
                                        class="squared-button"
                                        @click="handleApprove(transaction.id)"
                                    >
                                        Xác nhận
                                    </b-button>
                                    <b-button
                                        variant="outline-danger"
                                        style="font-size: 12px;"
                                        squared
                                        class="squared-button"
                                        @click="hideModal(`confirm-${transaction.id}`)"
                                    >
                                        Huỷ
                                    </b-button>
                                </template>
                            </b-modal>
                            &nbsp;
                            <b-button v-b-modal:[`reject-${transaction.id}`] style="font-size: 12px;" squared variant="outline-danger">Từ chối</b-button>
                            <b-modal 
                                hide-header centered 
                                :id="`reject-${transaction.id}`"
                                @hide="() => showDismissibleAlert = false"
                                >
                                <p class="my-4">Nhập lý do từ chối giao dịch <span class="green">{{ transaction.transactionCode }}</span> của khách hàng <span class="blue">{{ transaction.customer.fullName }}</span></p>
                                <form :id="`reject-form-${transaction.id}`" novalidate @submit.stop.prevent="handleSubmit">
                                    <b-form-group>
                                        <b-form-input :id="`reject-input-${transaction.id}`"
                                            v-model="rejectReason"
                                            required
                                        ></b-form-input>
                                        <b-alert v-model="showDismissibleAlert" variant="danger">
                                            Vui lòng nhập lý do từ chối
                                        </b-alert>
                                    </b-form-group>
                                </form>
                                <template #modal-footer>
                                    <b-button 
                                        variant="outline-primary"
                                        style="font-size: 12px;"
                                        squared
                                        class="squared-button"
                                        @click="handleReject(transaction.id)"
                                    >
                                        Xác nhận
                                    </b-button>
                                    <b-button
                                        variant="outline-danger"
                                        style="font-size: 12px;"
                                        squared
                                        class="squared-button"
                                        @click="hideModal(`reject-${transaction.id}`)"
                                    >
                                        Huỷ
                                    </b-button>
                                </template>
                            </b-modal>
                        </td>
                        <td v-if="transaction.status != 1">
                            <span v-if="transaction.status == 0" class="red">{{ transaction.rejectReason }}</span>
                            <span v-if="transaction.status == 2" class="green">Đã duyệt</span>
                        </td>
					</tr>
				</tbody>
			</table>
		</div>
		<p>
			<strong>Total: <span class="green">1037</span> (Items)</strong>
		</p>
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffTransactionListSection",
	data() {
		return {
            rejectReason: null,
            transactionList: [],

            showDismissibleAlert: false
        };
	},
    watch: {
        rejectReason($) {
            this.showDismissibleAlert = false;
        }
    },
	mounted() {
        this.getTransactions();
    },
	methods: {
        async getTransactions() {
            let loader = this.$loading.show();
            const params = {
                type: 1,
            }
            const res = await ApiCaller.get(ROUTES.BankAccount.filterTransactionAdmin, params);
            this.transactionList = res.data;
            loader.hide();
        },
        promptNameFromValue(value) {
            switch(value) {
                case CONSTANT.TRANSACTION_STATUS.REJECT:
                    return "Từ chối";
                case CONSTANT.TRANSACTION_STATUS.PENDING:
                    return "Chờ duyệt";
                case CONSTANT.TRANSACTION_STATUS.APPROVE:
                    return "Đã duyệt";
            }
        },
        promptClassFromValue(value) {
            switch(value) {
                case CONSTANT.TRANSACTION_STATUS.REJECT:
                    return "red";
                case CONSTANT.TRANSACTION_STATUS.PENDING:
                    return "orange";
                case CONSTANT.TRANSACTION_STATUS.APPROVE:
                    return "green";
            }
        },
        async handleReject(id) {
            try {
                const form = document.getElementById(`reject-form-${id}`);
                // Check if the form is valid
                if (form.checkValidity()) {
                    let loader = this.$loading.show();
                    let payload = this.transactionList.filter(el => el.id == id);
                    payload = {
                        ...payload[0],
                        status: CONSTANT.TRANSACTION_STATUS.REJECT,
                        rejectReason: this.rejectReason,
                    }
                    debugger
                    const res = await ApiCaller.post(ROUTES.BankAccount.updateTransaction, payload);
                    loader.hide();
                    this.$bvModal.hide(`reject-${id}`);
                    this.getTransactions();
                } else {
                    // Form is not valid, show an error message or handle the error
                    this.showDismissibleAlert = true;
                    const invalidField = document.getElementById(`reject-input-${id}`);
                    if (invalidField) {
                        invalidField.focus();
                    }
                }
            } finally {
                this.rejectReason = null;
            }
        },
        async handleApprove(id) {
            let loader = this.$loading.show();
            let payload = this.transactionList.filter(el => el.id == id);
            payload = {
                ...payload[0],
                status: CONSTANT.TRANSACTION_STATUS.APPROVE,
            }
            debugger
            const res = await ApiCaller.post(ROUTES.BankAccount.updateTransaction, payload);
            loader.hide();
            this.$bvModal.hide(`confirm-${id}`);
            this.getTransactions();
        },
        hideModal(id) {
            this.showDismissibleAlert = false;
            this.$bvModal.hide(id);
        }
    },
};
</script>

<!-- style custom -->
<style scoped></style>
