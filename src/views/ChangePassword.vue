<template>
  <b-col lg="5" sm="8" xs="11" class="container-style">
    <b-form-group>
      <label for="oldpass">Mật khẩu hiện tại</label>
      <b-form-input
        id="oldpass"
        v-model="oldPass"
        :state="validOld"
        type="password"
      />
      <span v-if="!validOld">
        {{ msg.old }}
      </span>
    </b-form-group>
    <b-form-group>
      <label for="newpass">Mật khẩu mới</label>
      <b-form-input
        id="newpass"
        v-model="newPass"
        :state="validNew"
        type="password"
      />
      <span v-if="!validNew">
        {{ msg.new }}
      </span>
    </b-form-group>
    <b-form-group>
      <label for="confirmpass">Nhập lại mật khẩu mới</label>
      <b-form-input
        id="confirmpass"
        v-model="confirmPass"
        :state="validConfirm"
        type="password"
      />
      <span v-if="!validConfirm">
        {{ msg.confirm }}
      </span>
    </b-form-group>
    <button
      @click="
        changePassword({
          old: oldPass,
          new: newPass
        })
      "
    >
      Đổi mật khẩu
    </button>
  </b-col>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ChangePassword",
  data: function () {
    return {
      oldPass: "",
      newPass: "",
      confirmPass: "",

      validOld: null,
      validNew: null,
      validConfirm: null,

      msg: {
        old: null,
        new: null,
        confirm: null,
      },
    };
  },
  watch: {
    oldpass: function (val) {
      this.oldpass = val;
      if (this.isValidPassword(val)) {
        this.validOld = true;
        this.msg.old = "";
      } else {
        this.validOld = false;
        this.msg.old = "Mật khẩu không hợp lệ";
      }
    },
    newPass: function (val) {
      this.newPass = val;
      if (this.isValidPassword(val)) {
        this.validNew = true;
        this.msg.new = "";
      } else {
        this.validNew = false;
        this.msg.new = "Mật khẩu không hợp lệ";
      }
    },
    confirmPass: function (val) {
      this.confirmPass = val;
      this.msg.confirm = "";
      if (this.isValidPassword(val)) {
        this.validConfirm = true;
      } else {
        this.validConfirm = false;
        this.msg.confirm = "Mật khẩu không hợp lệ";
      }
    },
  },
  methods: {
    // Cần điều chỉnh đúng format
    isValidPassword(val) {
      return val.length < 3 ? true : false;
    },
    ...mapActions(["changePassword"]),
  },
};
</script>

<style scoped>
span {
  color: red;
}
</style>
