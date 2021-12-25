<template>
  <div class="container-style">
    <b-button v-b-modal.account-add-modal size="sm" variant="secondary"> Cấp tài khoản </b-button>
    <b-modal
      id="account-add-modal"
      ref="modal"
      title="Cấp tài khoản A1"
      ok-title="Thêm"
      cancel-title="Hủy"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      :ok-disabled="!(idState && emailState)"
      @hide="hide"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <!-- ID k= id area lấy sẵn -->
        <b-form-group
          :label="titleId"
          label-for="account-id"
          :invalid-feedback="msg.id"
          :state="idState"
        >
          <b-form-input
            id="account-id"
            v-model="id"
            :state="idState"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Email -->
        <b-form-group
          :label="titleEmail"
          label-for="account-email"
          :invalid-feedback="msg.email"
          :state="emailState"
        >
          <b-form-input
            id="account-email"
            v-model="email"
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
import { validateEmail, validateIdWithLength } from "../../../store/statics/validations";
import { mapActions } from "vuex";

export default {
  name: "AccountAddForm",

  data() {
    return {
      title: "Cấp tài khoản ",
      titleId: "Mã ",
      titleEmail: "Địa chỉ email của ",

      id: null,
      idState: null,
      email: null,
      emailState: null,
      msg: {
        id: String,
        email: String,
      },
    };
  },

  props: { role: Number, api: Object },

  mounted() {
    this.title = "Cấp tài khoản các " + this.api.type;
    this.titleEmail = "Địa chỉ email của " + this.api.type;
    this.titleId = "Mã " + this.api.type;
  },

  methods: {
    ...mapActions({ addAccount: "Account/addAccount" }),

    resetModal() {
      this.id = null;
      this.idState = null;
      this.email = null;
      this.emailState = null;
      this.msg.id = null;
      this.msg.email = null;
    },

    // Kiểm tra id
    checkValidateId(val) {
      this.msg.id = validateIdWithLength(val, 1);
      this.idState = this.msg.id.length == 0;
    },

    // Kiểm tra email
    checkValidEmail(val) {
      this.msg.email = validateEmail(val);
      this.emailState = this.msg.email.length == 0;
    },

    // Kiểm tra form nhập
    checkFormValidity() {
      this.checkValidateId(this.id);
      this.checkValidEmail(this.email);
      return this.idState && this.emailState;
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
          id: this.id,
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
      this.$bvModal.hide("account-add-modal");
      this.$emit("added", true);
    },
  },

  watch: {
    id: function (val) {
      this.id = val;
      this.checkValidateId(val);
    },

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
