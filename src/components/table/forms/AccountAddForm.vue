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
      @hide="hide"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        
        <!-- ID k= id area lấy sẵn -->
        <b-form-group :label="titleId">
          <label> {{ accountId }} </label>
        </b-form-group>

        <!-- Name -->
        <b-form-group
          :label="titleName"
          label-for="account-name"
          :invalid-feedback="msg.name"
          :state="nameState"
        >
          <b-form-input
            id="account-name"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>

        <!-- Email -->
        <b-form-group label="Email" label-for="account-email">
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
import { mapActions } from "vuex";

export default {
  name: "AccountAddForm",

  data() {
    return {
      title: "Cấp tài khoản ",
      titleId: "Mã ",
      titleName: "Tên ",

      name: null,
      email: null,

      nameState: null,
      emailState: null,
      msg: {
        name: String,
        email: String,
      },
    };
  },

  props: { role: Number, api: Object, accountId: String },

  mounted() {
    if (this.api) {
      this.title = "Cấp tài khoản các " + this.api.type;
      this.titleName = "Tên " + this.api.type;
      this.titleId = "Mã " + this.api.type;
    }
    this.$bvModal.show("account-add-modal");
  },

  methods: {
    ...mapActions({ addAccount: "Account/addAccount" }),

    resetModal() {
      this.name = null;
      this.email = null;
      this.nameState = null;
      this.emailState = null;
      this.msg.name = null;
      this.msg.email = null;
    },
    
    // Tên vùng chỉ gồm các ký tự chữ cái và số
    checkValidName(val) {
      if (!val) {
        this.nameState = false;
        this.msg.name = "Bạn phải nhập tên";
      } else if (/[`~,.<>;':"/[\]|{}()=_+-]/.test(this.name)) {
        this.nameState = false;
        this.msg.name = "Trường này chỉ gồm các ký tự chữ cái và số";
      } else {
        this.nameState = true;
        this.msg.name = "";
      }
    },


    // Kiểm tra tên vùng và mã vùng trước khi submit
    checkFormValidity() {
      this.checkValidName(this.name);
      return this.nameState;
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
         id: this.accountId, email: this.email 
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
    name: function (val) {
      this.name = val;
      this.checkValidName(val);
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
