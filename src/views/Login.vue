<template>
  <div
    class="flex-column d-flex justify-content-center align-items-center container-style"
  >
    <!-- Phần đăng nhập -->
    <div id="login-section" class="section-style" v-show="toLogin">
      <div
        class="flex-column d-flex justify-content-centerr align-items-center box-style"
      >
        <!-- Hiện thông báo từ server -->
        <span class="notification server-msg" v-if="server_msg">
          {{ server_msg }}
        </span>
        <img
          src="../assets/img/general_user.jpg"
          alt="user image"
          class="icon"
        />
        <form class="form-horizontal form-style">
          <!-- User id -->
          <div class="form-group flex-column input-container">
            <label for="user-id">Mã đăng nhập</label>
            <input
              type="text"
              v-model="loginId"
              id="user-id"
              class="form-control"
              placeholder="Enter id"
            />
            <!-- Thông báo của user id đăng nhập-->
            <span class="notification" v-if="msg.loginId">
              {{ msg.loginId }}
            </span>
          </div>
          <!-- Password -->
          <div class="form-group flex-column input-container">
            <label for="password">Mật khẩu</label>
            <div class="flex-row d-flex password-row">
              <input
                :type="pw_input_type"
                v-model="password"
                id="password"
                class="form-control"
                placeholder="Enter password"
              />
              <font-awesome-icon
                icon="eye"
                class="eye-style"
                v-show="hidePassword"
                @click="clickEye"
              />
              <font-awesome-icon
                icon="eye-slash"
                class="eye-style"
                v-show="!hidePassword"
                @click="clickEye"
              />
            </div>
            <!-- Thông báo cho mật khẩu đăng nhập -->
            <span class="notification" v-if="msg.password">
              {{ msg.password }}
            </span>
            <!-- Link quên mật khẩu -->
            <div>
              <a id="forgot-pw-link" @click="clickLink">Quên mật khẩu</a>
            </div>
          </div>
          <!-- Nút đăng nhập -->
          <button
            type="button"
            @click="login({ user_id: loginId, password: password })"
            :disabled="msg.loginId != '' || msg.password != ''"
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
    <!-- Phần quên mật khẩu -->
    <div id="forgot-pw-section" class="section-style" v-show="!toLogin">
      <div
        class="flex-column d-flex justify-content-center align-items-center box-style"
      >
        <!-- Hiện thông báo từ server -->
        <span class="notification server-msg" v-if="server_msg">
          {{ server_msg }}
        </span>
        <img src="../assets/img/mail.jpg" alt="user image" class="icon" />
        <!-- User id -->
        <form class="form-horizontal form-style">
          <h4>Quên mật khẩu?</h4>
          <div class="form-group flex-column input-container">
            <label for="user-id2">Mã đăng nhập</label>
            <input
              type="text"
              v-model="forgotPwId"
              id="user-id2"
              class="form-control"
              placeholder="Enter id"
            />
            <!-- Thông báo của user id quên mật khẩu-->
            <span class="notification" v-if="msg.forgotPwId">
              {{ msg.forgotPwId }}
            </span>
          </div>
          <div class="form-group flex-column input-container">
            <label for="user-email">Email</label>
            <input
              type="text"
              v-model="email"
              id="user-email"
              class="form-control"
              placeholder="Enter email"
            />
            <!-- Thông báo của user email quên mật khẩu -->
            <span class="notification" v-if="msg.email"> {{ msg.email }} </span>
          </div>
          <!-- Link đến đăng nhập -->
          <div>
            <a id="login-link" @click="clickLink">Quay lại đăng nhập</a>
          </div>
          <!-- Nút gửi email quên mật khẩu -->
          <button
            type="button"
            @click="sendEmail({ user_id: forgotPwId, email: email })"
            :disabled="msg.forgotPwId != '' || msg.email != ''"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "Login",

  mounted: function () {
    this.resetLoginData();
    this.resetForgotPwData();
  },

  data: function () {
    return {
      toLogin: true,
      hidePassword: true,
      pw_input_type: "password",

      loginId: "",
      password: "",
      forgotPwId: "",
      email: "",
      msg: {
        loginId: null,
        password: null,
        forgotPwId: null,
        email: null,
      },
    };
  },

  computed: {
    ...mapGetters({
      server_msg: "getServerMsg"
    })
  },

  methods: {
    ...mapMutations(["resetLoginData", "resetForgotPwData", "resetServerMsg"]),
    ...mapActions(["login", "sendEmail"]),

    // Chuyển giữa section đăng nhập và section quên mật khẩu
    clickLink: function () {
      this.toLogin = !this.toLogin;
      this.resetServerMsg();
    },

    // Xem mật khẩu
    clickEye: function () {
      if (this.hidePassword) {
        this.pw_input_type = "text";
      } else {
        this.pw_input_type = "password";
      }
      this.hidePassword = !this.hidePassword;
    },

    // Kiểm tra nếu val rỗng
    isEmpty: function (val) {
      return val.length == 0;
    },

    // Kiểm tra nếu chuỗi val chỉ gồm số
    isValidId: function (val) {
      return /^[0-9]|(((0[1-9]|[1-9][0-9]))*)$/.test(val);
    },

    // Kiểm tra nếu độ dài chuỗi val trong khoảng [lower, upper]
    lengthInRange: function (val, lower, upper) {
      return val.length >= lower && val.length <= upper;
    },

    // Kiểm tra nếu val đúng format email: str@str.str
    isValidEmail: function (val) {
      return /\S+@\S+\.\S+/.test(val);
    },
  },

  watch: {
    // Kiểm tra mã đăng nhập
    // length: từ 2 đến 8 và là số chẵn
    // chỉ gồm các số
    loginId: function (val) {
      this.loginId = val;
      if (
        this.isEmpty(val) ||
        !this.lengthInRange(val, 1, 8) ||
        val.length % 2 == 1 &&
        val.length != 1
      ) {
        this.msg.loginId = "Id có độ dài chẵn trong khoảng 1-8 ký tự";
      } else if (!this.isValidId(val)) {
        this.msg.loginId = "Id chỉ gồm các số và có 2-8 ký tự";
      } else {
        this.msg.loginId = "";
      }
    },

    // Kiểm tra mật khẩu đăng nhập
    // length: từ 8 đến 25
    // chỉ gồm chữ và số
    // có ít nhất 1 số và 1 chữ
    password: function (val) {
      this.password = val;
      this.msg.password = "";
      // if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,25}$/.test(this.password)) {
      //   this.msg.password = "";
      // } else {
      //   this.msg.password =
      //     "Mật khẩu phải có độ dài 8-25 ký tự, chỉ gồm chữ và số tiếng anh, có cả chữ và số";
      // }
    },

    // Kiểm tra mã đăng nhập
    // length: từ 2 đến 8 và là số chẵn
    // chỉ gồm các số

    forgotPwId: function (val) {
      this.forgotPwId = val;
      if (
        this.isEmpty(val) ||
        !this.lengthInRange(val, 1, 8) ||
        val.length % 2 == 1 &&
        val.length != 1
      ) {
        this.msg.forgotPwId = "Id có độ dài chẵn trong khoảng 2-8 ký tự";
      } else if (!this.isValidId(val)) {
        this.msg.forgotPwId = "Id chỉ gồm các số và có 2-8 ký tự";
      } else {
        this.msg.forgotPwId = "";
      }
    },

    // Kiểm tra email
    // length: từ 10 đến 35
    // Đúng format: str@str.Str
    email: function (val) {
      this.email = val;
      if (this.isValidEmail(val) && this.lengthInRange(val, 5, 35)) {
        this.msg.email = "";
      } else {
        this.msg.email = "Email phải có độ dài từ 5-35 ký tự ";
      }
    },
  },
};
</script>

<style scoped>
.container-style {
  height: 100%;
  background-image: url("../assets/img/vietnam.jpg");
  background-repeat: no-repeat;
}

/* Common section 
--------------------------------*/
.section-style {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.box-style {
  box-shadow: 0 10px 29px 0 rgba(68, 88, 144, 0.1);
  transition: all 0.3s ease-in-out;
  text-align: center;
}

.box-style .icon {
  display: inline-block;
  text-align: center;
  border-radius: 50%;
}

.box-style:hover {
  transform: scale(1.05);
}

.box-style .form-style {
  padding: 10px;
  width: 100%;
  text-align: center;
}

.box-style .form-style .input-container {
  text-align: left;
  margin: 0 0 10px 0;
}

.box-style .form-style a:hover {
  cursor: pointer;
}

.box-style .form-style button {
  margin: 7px auto 5px auto;
  padding: 5px 10px 5px 10px;
  font-weight: bold;
  border-radius: 5px;
}

.box-style .notification {
  color: rgb(173, 2, 2);
  font-size: 14px;
}

.box-style .server-msg {
  background-color: #f4e6cb;
  width: 100%;
  padding: 5px;
  margin: 10px auto 10px auto;
}

/* Responsive
------------------------- */

@media (min-width: 1000px) {
  .box-style {
    width: 400px;
    border-radius: 50px;
    font-size: 16px;
    padding: 30px 30px 10px 30px;
  }

  .box-style .icon {
    width: 80px;
    height: 80px;
  }

  .box-style .input-container input {
    padding-right: 50px;
    font-size: 16px;
  }

  #login-section .form-style {
    margin: 20px 0 0px 0;
  }

  .box-style .form-style .notification {
    font-size: 13px;
  }
}

@media (min-width: 500px) and (max-width: 1000px) {
  .box-style {
    width: 400px;
    border-radius: 50px;
    font-size: 14px;
    padding: 25px 25px 10px 25px;
  }

  .box-style .icon {
    width: 70px;
    height: 70px;
    margin: 0 auto 30px auto;
  }

  .box-style .input-container input {
    padding-right: 50px;
    font-size: 14px;
  }

  .box-style .form-style .notification {
    font-size: 12px;
  }
}

@media (min-width: 300px) and (max-width: 500px) {
  .box-style {
    width: 300px;
    border-radius: 20px;
    font-size: 12px;
    padding: 15px 15px 10px 15px;
  }

  .box-style .icon {
    width: 50px;
    height: 50px;
    margin: 0 auto 5px auto;
  }

  .box-style .input-container input {
    padding-right: 35px;
    font-size: 12px;
  }

  .box-style .form-style .notification {
    font-size: 11px;
  }
}

@media (max-width: 300px) {
  .box-style {
    width: 250px;
    border-radius: 20px;
    font-size: 12px;
    padding: 15px 15px 10px 15px;
  }

  .box-style .icon {
    width: 50px;
    height: 50px;
    margin: 0 auto 5px auto;
  }

  .box-style .input-container input {
    padding-right: 35px;
    font-size: 12px;
  }

  .box-style .form-style .notification {
    font-size: 10px;
  }
}

/* Log In Section
--------------------------------*/
#login-section > div {
  background: rgba(130, 212, 245, 0.884);
}

#login-section button {
  background-color: rgba(3, 213, 250, 0.986);
  border: solid 1px skyblue;
}

#login-section #forgot-pw-link {
  color: blue;
  text-decoration: none;
}

#login-section #forgot-pw-link:hover {
  text-decoration: underline;
}

#login-section .form-style .password-row {
  position: relative;
}

#login-section .form-style .password-row .eye-style {
  position: absolute;
  right: 15px;
  bottom: 12px;
  color: rgb(11, 111, 168);
  cursor: pointer;
}

/* Forgot password section 
------------------------------------*/
#forgot-pw-section > div {
  background: rgba(255, 218, 185, 0.877);
}

#forgot-pw-section #login-link {
  color: rgb(81, 81, 90);
  text-decoration: none;
}

#forgot-pw-section #login-link:hover {
  text-decoration: underline;
}

#forgot-pw-section button {
  background-color: #ff9999;
  border: solid 1px white;
}
</style>
