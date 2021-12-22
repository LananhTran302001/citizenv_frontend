<template>
  <div class="container-style">
    <b-modal
      size="lg"
      id="account-edit-modal"
      ref="modal"
      :title="title"
      ok-title="Cập nhật"
      cancel-title="Hủy"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      @hide="hide"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-row>
          <b-col lg="6">
            <!-- ID không được chỉnh sửa -->
            <b-form-group :label="titleId">
              <label> {{ accountId }} </label>
            </b-form-group>

            <!-- Password edit -->
            <b-form-group
              :label="titlePassword"
              label-for="account-password"
              :invalid-feedback="msg.password"
              :state="passwordState"
            >
              <b-form-input
                id="account-password"
                v-model="password"
                :state="passwordState"
                required
              ></b-form-input>
            </b-form-group>

            <!-- Email edit -->
            <b-form-group label="Email" label-for="email">
              <b-form-input id="email" v-model="email" required></b-form-input>
            </b-form-group>
          </b-col>

          <b-col lg="6">
            <!-- Cấp quyền -->
            <b-form-group label="Chức năng thêm/sửa/xóa">
              <b-button variant="danger" v-show="isLocked" @click="unLock">
                <font-awesome-icon icon="lock" size="sm" /> Đang khóa
              </b-button>
              <b-button variant="success" v-show="!isLocked" @click="lock">
                <font-awesome-icon icon="lock-open" size="sm" /> Đang mở
              </b-button>
            </b-form-group>

            <!-- Đặt ngày bắt đầu -->
            <b-form-group label="Ngày bắt đầu">
              <b-form-datepicker
                :date-format-options="{
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  weekday: 'short',
                }"
                v-model="startDate"
              ></b-form-datepicker>
            </b-form-group>

            <!-- Đặt ngày kết thúc -->
            <b-form-group label="Ngày kết thúc">
              <b-form-datepicker
                :date-format-options="{
                  year: 'numeric',
                  month: 'short',
                  day: '2-digit',
                  weekday: 'short',
                }"
                v-model="endDate"
              ></b-form-datepicker>
            </b-form-group>
          </b-col>
        </b-row>
      </form>
    </b-modal>
  </div>
</template>

<script>
import {
  validatePassword,
  validateEmail,
} from "../../../store/statics/validations";
import { mapActions } from "vuex";

export default {
  name: "AccountEditForm",

  data() {
    return {
      title: "Cấp tài khoản ",
      titleId: "Mã ",
      titlePassword: "Mật khẩu ",

      password: null,
      email: null,
      isLocked: true,
      startDate: null,
      endDate: null,

      passwordState: null,
      emailState: null,
      startDateState: null,
      endDateState: null,
      msg: {
        password: String,
        email: String,
        isLocked: String,
        startDate: String,
        endDate: String,
      },
    };
  },

  props: { role: Number, api: Object, accountId: String },

  mounted() {
    this.title = "Cấp tài khoản các " + this.api.type;
    this.titleName = "Tên " + this.api.type;
    this.titleId = "Mã " + this.api.type;
    this.$bvModal.show("account-edit-modal");
  },

  methods: {
    ...mapActions({ updateAccount: "Account/updateAccount" }),

    resetModal() {
      this.password = null;
      this.email = null;
      this.isLocked = true;
      this.startDate = null;
      this.endDate = null;

      this.passwordState = null;
      this.emailState = null;
      this.startDateState = null;
      this.endDateState = null;
      this.msg = {
        password: null,
        email: null,
        isLocked: null,
        startDate: null,
        endDate: null,
      };
    },

    lock() {
      this.isLocked = true;
    },

    unLock() {
      this.isLocked = false;
    },

    // Kiểm tra tên vùng và mã vùng trước khi submit
    checkFormValidity() {
      return this.passwordState && this.emailState;
    },

    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },

    handleSubmit() {
      // Không cho phép submit nếu chưa nhập thông tin hợp lệ
      if (!this.checkFormValidity()) {
        return;
      }
      // Gửi thông tin đã được nhập đi
      this.updateAccount({
        role: this.role,
        account: {
          id: this.accountId,
          password: this.password,
          email: this.email,
          isLocked: this.isLocked,
          startDate: this.startDate,
          endDate: this.endDate,
        },
      });

      // Khi ấn nút
      this.$nextTick(() => {
        this.hide();
      });
    },

    // Đóng modal
    hide() {
      this.$emit("updated", true);
    },
  },

  watch: {
    email: function (val) {
      this.msg.email = validateEmail(val);
      this.emailState = this.msg.email.length == 0;
    },

    password: function (val) {
      this.msg.password = validatePassword(val);
      this.passwordState = this.msg.password.length == 0;
    },
  },
};
</script>

<style scoped>
.container-style {
  max-width: 100px;
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>
