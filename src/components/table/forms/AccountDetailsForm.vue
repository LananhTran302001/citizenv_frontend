// Xem lại việc hiện ngày
// ------------------------------------
<template>
  <div class="container-style">
    <b-modal
      id="area-detail-modal"
      :title="title"
      ok-only
      @ok="hide"
      @hide="hide"
      no-stacking
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-row>
          <b-col lg="6">
            <!-- Hiện id -->
            <b-form-group :label="titleId">
              <label> {{ data.id }} </label>
            </b-form-group>

            <!-- Hiện password -->
            <b-form-group
              :label="titlePassword"
            >
              <label> {{ data.password }} </label>
            </b-form-group>

            <!-- Hiện email -->
            <b-form-group :label="titleEmail">
              <label> {{ data.email }} </label>
            </b-form-group>
          </b-col>

          <b-col lg="6">
            <!-- Cấp quyền -->
            <b-form-group label="Chức năng thêm/sửa/xóa">
              <b-button variant="danger" v-show="data.isLocked" disabled>
                <font-awesome-icon icon="lock" size="sm" /> Đang khóa
              </b-button>
              <b-button variant="success" v-show="!data.isLocked" disabled>
                <font-awesome-icon icon="lock-open" size="sm" /> Đang mở
              </b-button>
            </b-form-group>

            <!-- Hiện ngày bắt đầu -->
            <b-form-group label="Ngày bắt đầu">
              <label> {{ data.startDate }} </label>
            </b-form-group>

            <!-- Hiện ngày kết thúc -->
            <b-form-group label="Ngày kết thúc">
              <label> {{ data.endDate }} </label>
            </b-form-group>
          </b-col>
        </b-row>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "AccountDetailsForm",
  props: {
    // Thông tin lấy dựa trên các trường fields trong file account_constants.js
    // Là thông tin mà backend trả về
    data: Object, // gồm thông tin của account
    api: Object, //
  },

  data() {
    return {
      title: "Thông tin chi tiết",
      titleId: "Mã ",
      titlePassword: "Mật khẩu ",
      titleEmail: "Emaill"
    };
  },

  mounted() {
    this.title = "Thông tin chi tiết " + this.api.type;
    this.titleId = "Mã " + this.api.type;
    this.titlePassword = "Mật khẩu " + this.api.type;
    this.titleEmail = "Email " + this.api.type;
    this.$bvModal.show("area-detail-modal");
  },

  methods: {
    hide() {
      this.$emit("detailed", true);
    },
  },
};
</script>

<style scoped>
.container-style {
  margin: 0;
}
</style>