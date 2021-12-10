<template>
  <div
    id="login-box"
    class="flex-column d-flex justify-content-center align-items-center"
  >
    <div id="login-section" class="section-style">
      <div
        class="flex-column d-flex justify-content-centerr align-items-center box-style"
      >
        <img src="asset/img/general_user.jpg" alt="user image" class="icon" />
        <form class="form-horizontal form-style">
          <div class="form-group flex-column input-container">
            <label for="user-name">Mã đăng nhập</label>
            <input
              type="text"
              id="user-name"
              class="form-control"
              placeholder="Enter id"
            />
            <span class="notification" id="user-name-noti"></span>
          </div>
          <div class="form-group flex-column input-container">
            <label for="user-password">Mật khẩu</label>
            <div class="flex-row d-flex password-row">
              <input
                type="password"
                id="user-password"
                class="form-control"
                placeholder="Enter password"
              />
              <a href="#" id="eye-open">
                <i class="far fa-eye" aria-hidden="true"></i>
              </a>
              <a href="#" id="eye-slash">
                <i class="far fa-eye-slash" aria-hidden="true"></i>
              </a>
            </div>
            <span class="notification"></span>
            <div>
              <a id="forgot-pw-link" href="">Quên mật khẩu</a>
            </div>
          </div>
          <button type="button" id="log-in-btn">Đăng nhập</button>
        </form>
      </div>
    </div>
    <div id="forgot-pw-section" class="section-style">
      <div
        class="flex-column d-flex justify-content-center align-items-center box-style"
      >
        <img src="asset/img/mail.jpg" alt="user image" class="icon" />
        <form class="form-horizontal form-style">
          <h4>Quên mật khẩu?</h4>
          <div class="form-group flex-column input-container">
            <label for="user-name2">Mã đăng nhập</label>
            <input
              type="text"
              id="user-name2"
              class="form-control"
              placeholder="Enter id"
            />
            <span class="notification"></span>
          </div>
          <div class="form-group flex-column input-container">
            <label for="user-email">Email</label>
            <input
              type="text"
              id="user-email"
              class="form-control"
              placeholder="Enter email"
            />
            <span class="notification"></span>
          </div>
          <div>
            <a id="login-link" href="">Quay lại đăng nhập</a>
          </div>
          <button type="button" id="send-email-btn">Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "LoginBox"
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

#login-section #log-in-btn {
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

#login-section .form-style .password-row #eye-open,
#login-section .form-style .password-row #eye-slash {
    position: absolute;
    right: 15px;
    bottom: 7px;
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

#forgot-pw-section #send-email-btn {
    background-color: #ff9999;
    border: solid 1px white;
}
</style>