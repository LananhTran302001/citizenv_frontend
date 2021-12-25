<template>
  <div class="container-style">
    <b-modal
      id="account-add-modal"
      ref="modal"
      :title="title"
      ok-title="Thêm"
      cancel-title="Hủy"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      :ok-disabled="!emailState"
      @hide="hide"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <!-- ID k= id area lấy sẵn -->
        <b-form-group :label="titleId">
          <label> {{ accountId }} </label>
        </b-form-group>

        <!-- Email -->
        <b-form-group :label="titleEmail" label-for="account-email">
          <b-form-input
            id="account-email"
            v-model="email"
            :invalid-feedback="msg.email"
            :state="emailState"
            required
          >
          </b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { validateEmail } from "../../../store/statics/validations";
import { mapActions } from "vuex";

export default {
  name: "AccountAddForm",

  data() {
    return {
      title: "Cấp tài khoản ",
      titleId: "Mã ",
      titleEmail: "Địa chỉ email của ",

      email: null,
      emailState: null,
      msg: {
        email: String,
      },
    };
  },

  props: { role: Number, api: Object, accountId: String },

  mounted() {
    this.title = "Cấp tài khoản các " + this.api.type;
    this.titleEmail = "Địa chỉ email của " + this.api.type;
    this.titleId = "Mã " + this.api.type;
    this.$bvModal.show("account-add-modal");
  },

  methods: {
    ...mapActions({ addAccount: "Account/addAccount" }),

    resetModal() {
      this.email = null;
      this.emailState = null;
      this.msg.email = null;
    },

    // Kiểm tra email
    checkValidEmail(val) {
      this.msg.email = validateEmail(val);
      this.emailState = (this.msg.email.length == 0);
    },

    // Kiểm tra form nhập
    checkFormValidity() {
      this.checkValidEmail(this.email);
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
        return;
      }
      // Gửi thông tin đã được nhập đi
      this.addAccount({
        role: this.role,
        account: {
          id: this.accountId,
          email: this.email,
        },
      });

      // Khi ấn nút
      this.$nextTick(() => {
        this.hide();
      });
    },

    // Đóng modal
    hide() {
      this.$emit("added", true);
    },
  },

  watch: {
    email: function (val) {
      this.email = val;
      this.checkValidEmail(val);
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
