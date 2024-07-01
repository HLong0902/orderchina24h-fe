import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
	state: () => ({
		cart: {},
		selectedCart: [],
		mapShopDescription: {},
		orderedCart: {},
	}),
	getters: {
		getCart: (state) => state.cart,
		getSelectedCart: (state) => state.selectedCart,
		getMapShopDescription: (state) => state.mapShopDescription,
		getOrderedCart: (state) => state.orderedCart,
	},
	actions: {
		setCart($) {
			Object.assign(this.cart, $);
		},
		setMapShopDescription($) {
			this.mapShopDescription = $;
		},
		setSelectedCart($) {
			Object.assign(this.selectedCart, $);
		},
		setOrderedCart($) {
			Object.assign(this.orderedCart, $);
		}
	},
});
