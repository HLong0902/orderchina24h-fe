<template>
  <div>
    <button @click="addToCart">Test</button>
  </div>
</template>

<script>
import axios from 'axios';
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'AddToCart',
  props: {
    type: {
      type: String,
      required: true
    },
    item_id: {
      type: Number,
      required: true
    },
    item_title: {
      type: String,
      required: true
    },
    item_image: {
      type: String,
      required: true
    },
    item_link: {
      type: String,
      required: true
    },
    item_price: {
      type: Number,
      required: true
    },
    price_table: {
      type: String,
      required: true
    },
    color_size_name: {
      type: String,
      required: true
    },
    skus: {
      type: Number,
      required: true
    },
    seller_id: {
      type: Number,
      required: true
    },
    item_quantity: {
      type: Number,
      required: true
    },
    version: {
      type: Number,
      required: true
    }
  },
  methods: {
    async addToCart() {
      console.log(this.type);
      console.log(this.item_id);
      console.log(this.item_title);
      console.log(this.item_image);
      console.log(this.item_link);
      console.log(this.item_price);
      console.log(this.price_table);
      console.log(this.color_size_name);
      console.log(this.skus);
      console.log(this.seller_id);
      console.log(this.item_quantity);
      console.log(this.version);
      console.log(sessionStorage.getItem("iconify-count"));
      await axios.create({
        baseURL: `http://localhost:8080/api/`,
        timeout: 1000,
        headers: {'Content-Type': 'application/json'}
      }).get('/add-cart').then((response) => {
        console.log("ok");
      }).catch((error) => {
        console.log(error);
      });
    }
  },
  mounted() {
    this.addToCart();
  }
});
</script>