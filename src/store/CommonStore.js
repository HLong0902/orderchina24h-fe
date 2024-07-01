import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", {
	state: () => ({
		exchange_rate: 3200,
		user_balance: 0,
		charging_fee: 5000,
		fee_by_weight: 0,
		inventories: [],
		staffs: [],
		staffsBuy: [],
		lst_fee_by_weight: [],
		deposit_fee_by_weight: [],
		deposit_bulk_fee_by_weight: [],
		service_fee: [],
		batch_goods_volume: [],
	}),
	getters: {
		getExchangeRate: (state) => state.exchange_rate,
		getUserBalance: (state) => state.user_balance,
		getChargingFee: (state) => state.charging_fee,
		getFeeByWeight: (state) => state.fee_by_weight,
		getInventories: (state) => state.inventories,
		getStaffs: (state) => state.staffs,
		getStaffsBuy: (state) => state.staffsBuy,
		getLstFeeByWeight: (state) => state.lst_fee_by_weight,
		getDepositFeeByWeight: (state) => state.deposit_fee_by_weight,
		getBulkDepositFeeByWeight: (state) => state.deposit_bulk_fee_by_weight,
		getServiceFee: (state) => state.service_fee,
		getBatchGoodsVolume: (state) => state.batch_goods_volume,
	},
	actions: {
		setExchangeRate($) {
			this.exchange_rate = $;
		},
		setUserBalance($) {
			this.user_balance = $;
		},
		setChargingFee($) {
			this.charging_fee = $;
		},
		setFeeByWeight($) {
			this.fee_by_weight = $;
		},
		setInventories($) {
			this.inventories = $;
		},
		setStaffs($) {
			this.staffs = $;
		},
		setStaffsBuy($) {
			this.staffsBuy = $;
		},
		setLstFeeByWeight($) {
			this.lst_fee_by_weight = $;
		},
		setDepositFeeByWeight($) {
			this.deposit_fee_by_weight = $;
		},
		setBulkDepositFeeByWeight($) {
			this.deposit_bulk_fee_by_weight = $;
		},
		setServiceFee($) {
			this.service_fee = $;
		},
		setBatchGoodsVolume($) {
			this.batch_goods_volume = $;
		},
	},
});
