<template>
  <div
    class="flex-column d-flex justify-content-center align-items-center container-style"
  >
    <!-- Thông báo từ server -->
    <Message
      :id="serverMsg.id"
      :title="serverMsg.title"
      :content="serverMsg.content"
      :variant="serverMsg.variant"
    />
    <b-col lg="4" md="6" sm="8" xs="9" class="box-style">
      <h2>Đổi mật khẩu</h2>
      <b-form-group>
        <label for="oldpass">Mật khẩu hiện tại</label>
        <b-form-input
          id="oldpass"
          v-model="oldPass"
          :state="state.old"
          type="password"
        />
        <span class="notification" v-if="msg.old">
          {{ msg.old }}
        </span>
      </b-form-group>
      <b-form-group>
        <label for="newpass">Mật khẩu mới</label>
        <b-form-input
          id="newpass"
          v-model="newPass"
          :state="state.new"
          type="password"
        />
        <span class="notification" v-if="msg.new">
          {{ msg.new }}
        </span>
      </b-form-group>
      <b-form-group>
        <label for="confirmpass">Nhập lại mật khẩu mới</label>
        <b-form-input
          id="confirmpass"
          v-model="confirmPass"
          :state="state.confirm"
          type="password"
        />
        <span class="notification" v-if="msg.confirm">
          {{ msg.confirm }}
        </span>
      </b-form-group>
      <button
        @click="
          changePassword({
            old: oldPass,
            new: newPass,
          })
        "
        :disabled="!(state.old && state.new && state.confirm)"
      >
        Đổi mật khẩu
      </button>
    </b-col>
  </div>
</template>

<script>

import Message from "../components/Message.vue";
import { validatePassword } from "../store/statics/validations";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ChangePassword",
  components: { Message },
  data: function () {
    return {
      oldPass: null,
      newPass: null,
      confirmPass: null,
      state: {
        old: null,
        new: null,
        confirm: null,
      },
      msg: {
        old: null,
        new: null,
        confirm: null,
      },
    };
  },

  computed: {
    ...mapGetters({
      serverMsg: "User/getServerMsg",
    })
  },
  
  methods: {
    ...mapActions({
      changePassword: "User/changePassword"
    }),

    // Cần điều chỉnh đúng format
    isValidPassword: function (val) {
      return val.length > 2 ? true : false;
    },

    equal: function (val1, val2) {
      return val1 == val2;
    },
  },

  watch: {
    oldPass: function (val) {
      this.oldpass = val;
      this.msg.old = validatePassword(val);
      this.state.old = this.msg.old.length == 0;
    },
    newPass: function (val) {
      this.newPass = val;
      if (this.isValidPassword(val)) {
        this.msg.new = "";
        this.state.new = true;
      } else {
        this.msg.new = "Mật khẩu không hợp lệ";
        this.state.new = false;
      }
    },
    confirmPass: function (val) {
      this.confirmPass = val;
      if (this.isValidPassword(val)) {
        if (this.equal(this.newPass, this.confirmPass)) {
          this.msg.confirm = "";
          this.state.confirm = true;
        } else {
          this.msg.confirm = "Mật khẩu chưa khớp";
          this.state.confirm = false;
        }
      } else {
        this.msg.confirm = "Mật khẩu không hợp lệ";
        this.state.confirm = false;
      }
    },
  },
};
</script>

<style scoped>
.container-style {
  background-color: transparent;
  width: 100%;
  height: 100%;
}

.box-style {
  padding: 30px;
  background-color: skyblue;
  box-shadow: 0 10px 29px 0 rgba(68, 88, 144, 0.1);
  border-radius: 30px;
  transition: all 0.3s ease-in-out;
  text-align: center;
}

.box-style:hover {
  transform: scale(1.05);
}

.notification {
  color: red;
}

.box-style button {
  margin: 7px auto 5px auto;
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  color: white;
  background-color: rgba(4, 60, 92, 0.986);
  border: solid 1px skyblue;
  cursor: pointer;
}

.box-style button:disabled {
  cursor: auto;
  color: rgb(192, 192, 192);
  background-color: rgba(34, 87, 117, 0.986);
}
</style>
