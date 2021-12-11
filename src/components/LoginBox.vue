<template>
  <div
    id="login-box"
    class="flex-column d-flex justify-content-center align-items-center"
  >
    <div id="login-section" class="section-style" v-show="toLogin">
      <div
        class="flex-column d-flex justify-content-centerr align-items-center box-style"
      >
        <img src="../assets/img/general_user.jpg" alt="user image" class="icon" />
        <form class="form-horizontal form-style">
          <div class="form-group flex-column input-container">
            <label for="user-id">Mã đăng nhập</label>
            <input
              type="text"
              v-model="user_id"
              id="user-id"
              class="form-control"
              placeholder="Enter id"
            />
            <span class="notification"></span>
          </div>
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
              <font-awesome-icon icon="eye" class="eye-style" v-show="hidePassword" @click="clickEye"/>
              <font-awesome-icon icon="eye-slash" class="eye-style" v-show="!hidePassword" @click="clickEye"/>
            </div>
            <span class="notification"></span>
            <div>
              <a id="forgot-pw-link" @click="clickLink">Quên mật khẩu</a>
            </div>
          </div>
          <button type="button" @click="login">Đăng nhập</button>
        </form>
      </div>
    </div>
    <div id="forgot-pw-section" class="section-style" v-show="!toLogin">
      <div
        class="flex-column d-flex justify-content-center align-items-center box-style"
      >
        <img src="../assets/img/mail.jpg" alt="user image" class="icon" />
        <form class="form-horizontal form-style">
          <h4>Quên mật khẩu?</h4>
          <div class="form-group flex-column input-container">
            <label for="user-id2">Mã đăng nhập</label>
            <input
              type="text"
              v-model="user_id"
              id="user-id2"
              class="form-control"
              placeholder="Enter id"
            />
            <span class="notification"></span>
          </div>
          <div class="form-group flex-column input-container">
            <label for="user-email">Email</label>
            <input
              type="text"
              v-model="user_email"
              id="user-email"
              class="form-control"
              placeholder="Enter email"
            />
            <span class="notification"></span>
          </div>
          <div>
            <a id="login-link"  @click="clickLink">Quay lại đăng nhập</a>
          </div>
          <button type="button" @click="sendMail">Send</button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
    name: "LoginBox",

    data() {
      return {
        toLogin: true,
        hidePassword: true,
        pw_input_type: 'password',

        user_id: '',
        user_email: '',
        password: ''
      }
    },

    methods: {
      clickLink: function() {
        this.toLogin = !this.toLogin
      },

      clickEye: function() {
        if (this.hidePassword) {
          this.pw_input_type = 'text'
        } else {
          this.pw_input_type = 'password'
        }
        this.hidePassword = !this.hidePassword
      },

      getLoginData: function() {
        return {
          user_id: this.user_id,
          password: this.password
        }
      },

      getForgotPwData: function() {
        return {
          user_id: this.user_id,
          user_email: this.user_email
        }
      },

      login: function() {
        console.log(this.getLoginData)
      },

      sendMail: function() {
        console.log("Send mail")
      }

    }
}
</script>




<style scoped>
#login-box {
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

.box-style .form-style .notification {
    color: red;
}


/* Responsive
------------------------- */

@media (min-width:1000px) {
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
        font-size:16px;
    }

    #login-section .form-style {
        margin: 20px 0 0px 0;
    }
}

@media (min-width:500px) and (max-width:1000px) {
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
        font-size:14px;
    }
}

@media (min-width:300px) and (max-width:500px) {
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
        font-size:12px;
    }
}

@media (max-width:300px) {
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
        font-size:12px;
    }
}

/* Log In Section
--------------------------------*/
#login-section>div {
    background: rgba(130, 212, 245, 0.753);
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
#forgot-pw-section>div {
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