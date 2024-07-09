import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
	state: () => ({
		cart: {},
		isCartReady: false,
		selectedCart: [],
		mapShopDescription: {},
		orderedCart: {},
	}),
	getters: {
		getCart: (state) => state.cart,
		getIsCartReadt: (state) => state.isCartReady,
		getSelectedCart: (state) => state.selectedCart,
		getMapShopDescription: (state) => state.mapShopDescription,
		getOrderedCart: (state) => state.orderedCart,
	},
	actions: {
		setCart($) {
			Object.assign(this.cart, $);
			this.setIsCartReady(true);
		},
		setIsCartReady($) {
			this.isCartReady = $;
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
