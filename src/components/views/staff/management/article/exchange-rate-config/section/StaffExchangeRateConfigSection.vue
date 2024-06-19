<template>
  <div id="content" class="fullwidth clearfix">
    <div class="align-center">
      <h2>Cấu hình tỷ giá</h2>
      <form @submit.prevent="handleSubmit">
        Tỷ giá mới:
        <input v-model="query" type="text" name="keyword" value="" autofocus/>
        &nbsp;
        <input @click="updateExchangePrice" type="submit" name="" value="Lưu"/><br/>
      </form>
    </div>
  </div>
</template>

<!-- function defined -->
<script>

import {useCommonStore} from "../../../../../../../store/CommonStore.js";
import ApiCaller from "../../../../../../utils/ApiCaller.js";
import CONSTANT from "../../../../../../../constants/constants.js";
import ROUTES from "../../../../../../../constants/routeDefine.js";

export default {
  name: "StaffExchangeRateConfigSection",
  data() {
    return {
      query: "",
      commonStore: useCommonStore(),
    };
  },
  mounted() {
  },
  methods: {
    async updateExchangePrice() {
      const loader = this.$loading.show();
      if(Number.isInteger(Number(this.query))) {
        const link = ROUTES.Information.getValueByCode(CONSTANT.EXCHANGE_RATE);
        let res = await ApiCaller.post(link);

        if (res.status === 200) {
          const payload = {
            id: res.data[0].id,
            value: this.query,
          }
          res = await ApiCaller.post(ROUTES.Information.updateItem, payload);
          if (res.status === 200) {
            this.$toast.success(
                `Cập nhập tỷ giá thành công`,
                {
                  title: "Thông báo",
                  position: "top-right",
                  autoHideDelay: 7000,
                }
            );
            this.commonStore.setExchangeRate(this.query);
          } else {
            this.$toast.error(`${res.data.message}`, {
              title: "Thông báo",
              position: "top-right",
              autoHideDelay: 7000,
            });
          }
        } else {
          this.$toast.error(`${res.data.message}`, {
            title: 'Thông báo',
            position: 'top-right',
            autoHideDelay: 7000,
          })
        }
      } else {
        this.$toast.error(`Tỷ giá mới không hợp lệ!`,
            {
              title: "Thông báo",
              position: "top-right",
              autoHideDelay: 7000,
            }
        );
      }
      loader.hide();
    },
  },
};
</script>
