<template>
  <nav
    id="navbar"
    class="navbar flex-row navbar-style justify-content-between navbar-expand-md"
  >
    <a href="" class="logo nav">
      <img src="../assets/img/logo.png" alt="logo" class="logo-img" />
      <label class="logo-text">CitizenV</label>
    </a>
    <ul class="nav flex-row nav-pills justify-content-around">
      <li class="nav-item">
        <router-link to="/">Trang chủ</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about">Giới thiệu</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/contact">Liên hệ</router-link>
      </li>
    </ul>
    <div class="nav flex-row justify-content-around" id="user-nav">
      <NavbarUserInfo
        message="Xin chào "
        :userid="user.user_id"
        v-if="user.user_id && user.user_name"
      />
      <ToLoginButton v-if="!user.user_id && !user.user_name" />
      <AccountMenuButton
        text="Tài khoản"
        v-if="user.user_id && user.user_name"
      />
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

import NavbarUserInfo from "./navbarbuttons/UserInfo.vue";
import ToLoginButton from "./navbarbuttons/ToLoginButton.vue";
import AccountMenuButton from "./navbarbuttons/AccountMenuButton.vue";

export default {
  name: "Navbar",
  components: {
    NavbarUserInfo,
    ToLoginButton,
    AccountMenuButton,
  },
  computed: {
    ...mapGetters({
      user: "getUser",
    }),
  },
  methods: {
    toLogin: function () {
      this.$router.push("/login");
    },
  },
};
</script>

<style scope>
#navbar {
  z-index: 100;
  background-color: white;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
.navbar-style {
  justify-content: space-around;
  padding: 10px 50px 10px 20px;
}
#navbar a {
  text-decoration: none;
}
#navbar .logo {
  display: flex;
  flex-direction: row;
}
#navbar .logo-img {
  height: 40px;
  padding: 0;
  margin: 0 5px 0 0;
}
#navbar .logo-text {
  font-size: 28px;
  margin: 0;
  padding: 0;
  font-weight: 700;
  letter-spacing: 2px;
  color: green;
  text-decoration: none;
}

#navbar .nav-item {
  font-size: 18px;
  color: #413e66;
  font-weight: 500;
  padding: 0px 15px 0px 15px;
}

#navbar .nav-item:hover {
  color: rgb(0, 0, 194);
  cursor: pointer;
}

#navbar .user-dropdown {
  height: 80%;
  background-image: url("../assets/img/general_user.jpg");
  border-radius: 50px;
}

@media (max-width: 700px) {
  #navbar .logo-img {
    height: 25px;
    padding: 0;
    margin: 0 5px 0 0;
  }

  #navbar .logo-text {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 1px;
  }

  #navbar .nav-item {
    font-size: 12px;
    color: #413e66;
    font-weight: 500;
  }
}

@media (max-width: 400px) {
  #navbar .logo-img {
    height: 20px;
    padding: 0;
    margin: 5px;
  }

  #navbar .logo {
    display: none;
  }

  #navbar .nav-item {
    font-size: 11px;
    color: #413e66;
    font-weight: 500;
  }
}
</style>
