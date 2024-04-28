import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
	state: () => ({
		cart: {},
		selectedCart: [],
	}),
	getters: {
		getCart: (state) => state.cart,
		getSelectedCart: (state) => state.selectedCart,
	},
	actions: {
		setCart($) {
			Object.assign(this.cart, $);
		},
		setSelectedCart($) {
			Object.assign(this.selectedCart, $);
		},
	},
});
