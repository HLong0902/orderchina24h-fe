import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
	state: () => ({
		cart: {},
		selectedCart: [],
		orderedCart: {},
	}),
	getters: {
		getCart: (state) => state.cart,
		getSelectedCart: (state) => state.selectedCart,
		getOrderedCart: (state) => state.orderedCart,
	},
	actions: {
		setCart($) {
			Object.assign(this.cart, $);
		},
		setSelectedCart($) {
			Object.assign(this.selectedCart, $);
		},
		setOrderedCart($) {
			Object.assign(this.orderedCart, $);
		}
	},
});
