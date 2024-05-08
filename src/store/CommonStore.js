import { defineStore } from "pinia";

export const useCommonStore = defineStore("common", {
	state: () => ({
		exchange_rate: 3200,
        user_balance: 0,
		charging_fee: 5000,
		fee_by_weight: 0,
		inventories: [],
	}),
	getters: {
		getExchangeRate: (state) => state.exchange_rate,
        getUserBalance: (state) => state.user_balance,
		getChargingFee: (state) => state.charging_fee,
		getFeeByWeight: (state) => state.fee_by_weight,
		getInventories: (state) => state.inventories,
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
		}
	},
});
