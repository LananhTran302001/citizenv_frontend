<template>
  <div class="container-style">
    <b-modal
      size="lg"
      id="account-edit-modal"
      ref="modal"
      :title="title"
      ok-title="Cập nhật"
      cancel-title="Hủy"
      @hidden="resetModal"
      @ok="handleOk"
      :ok-disabled="!(emailState)"
      @hide="hide"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-row>
          <b-col lg="6">
            <!-- ID không được chỉnh sửa -->
            <b-form-group :label="titleId">
              <label> {{ account.id }} </label>
            </b-form-group>

            <!-- Email edit -->
            <b-form-group
              label="Email"
              label-for="email"
              :invalid-feedback="msg.email"
              :state="emailState"
            >
              <b-form-input
                id="email"
                v-model="email"
                :state="emailState"
                required
              ></b-form-input>
            </b-form-group>
          </b-col>

          <b-col lg="6">
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
  validateEmail,
} from "../../../store/statics/validations";
import { mapActions } from "vuex";

export default {
  name: "AccountEditForm",

  data() {
    return {
      title: "Cấp tài khoản ",
      titleId: "Mã ",

      email: null,
      startDate: null,
      endDate: null,

      emailState: null,
      startDateState: null,
      endDateState: null,

      msg: {
        email: null,
        startDate: null,
        endDate: null,
      },
    };
  },

  props: { role: Number, api: Object, account: Object },

  mounted() {
    this.title = "Cấp tài khoản các " + this.api.type;
    this.titleName = "Tên " + this.api.type;
    this.titleId = "Mã " + this.api.type;

    this.email = this.account.email;
    if (this.account.email == '') {
      this.email = null;
    }
    this.startDate = this.account.startDate;
    if (this.account.startDate == '') {
      this.startDate = null;
    }
    this.endDate = this.account.endDate;
    if (this.account.endDate == '') {
      this.endDate = null;
    }
    this.$bvModal.show("account-edit-modal");
  },

  methods: {
    ...mapActions({ updateAccount: "Account/updateAccount" }),

    resetModal() {
      this.email = null;
      this.startDate = null;
      this.endDate = null;

      this.emailState = null;
      this.startDateState = null;
      this.endDateState = null;

      this.msg.email = null;
      this.msg.startDate = null;
      this.msg.endDate = null;
    },

    // Kiểm tra tên vùng và mã vùng trước khi submit
    checkFormValidity() {
      return this.emailState;
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
        console.log("Các thông tin điền chưa hợp lệ");
        return;
      }
      // Gửi thông tin đã được nhập đi
      this.updateAccount({
        role: this.role,
        account: {
          id: this.account.id,
          email: this.email,
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
      this.email = val;
      this.msg.email = validateEmail(val);
      this.emailState = (this.msg.email.length == 0);
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
