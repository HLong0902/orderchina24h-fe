<template>
  <div id="content" class="fullwidth clearfix">
    <div class="align-center">
      <h2>Cấu hình biểu phí dịch vụ</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          Từ ngày: <input class="pickdate_from hasDatepicker" type="date" v-model="fromDate"
                             value="" name="filter_startdate_create_date" />
         -
          Đến ngày: <input class="pickdate_to hasDatepicker" type="date" v-model="toDate" value=""
                           name="filter_enddate_create_date" />
        </div>
        &nbsp;
        Phí dịch vụ mới:
        <input v-model="query" type="text" name="keyword" value="" autofocus v-focus/>
        &nbsp;
        <input @click="updateServiceFee" type="submit" name="" value="Lưu"/><br/>
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
  name: "StaffServiceFeeConfigSection",
  data() {
    return {
      query: "",
      commonStore: useCommonStore(),
      fromDate: "",
      toDate: "",
    };
  },
  mounted() {
  },
  methods: {
    async updateServiceFee() {
      if (this.fromDate === "") {
        this.$toast.error(`Vui lòng nhập ngày bắt đầu.`, {
          title: 'Thông báo',
          position: 'top-right',
          autoHideDelay: 7000,
        })
        return;
      }
      if (this.toDate === "") {
        this.$toast.error(`Vui lòng nhập ngày kết thúc.`, {
          title: 'Thông báo',
          position: 'top-right',
          autoHideDelay: 7000,
        })
        return;
      }
      if (this.query === "") {
        this.$toast.error(`Vui lòng nhập phí dịch vụ.`, {
          title: 'Thông báo',
          position: 'top-right',
          autoHideDelay: 7000,
        })
        return;
      }

      const loader = this.$loading.show();
      if(Number.isInteger(Number(this.query))) {
        const link = ROUTES.Information.updateService;
        console.log(link);
        let res = await ApiCaller.post(link+'?fromDate='+this.fromDate+'&toDate='+this.toDate+'&value='+this.query);

        if (res.status === 200) {
          this.$toast.success(
              `Cập nhập tỷ giá thành công`,
              {
                title: "Thông báo",
                position: "top-right",
                autoHideDelay: 7000,
              }
          );
        } else {
          this.$toast.error(`${res.data.message}`, {
            title: 'Thông báo',
            position: 'top-right',
            autoHideDelay: 7000,
          })
        }
      } else {
        this.$toast.error(`Phí dịch vụ mới không hợp lệ!`,
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
