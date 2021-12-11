<template>
  <div id="sidebar-wrapper" v-bind:class="{ 'toggled': isToggled }">
    <!-- Sidebar -->
    <nav class="navbar navbar-inverse" id="sidebar" role="navigation">
      <ul class="nav sidebar-nav">
        <div class="sidebar-header">
        </div>
        <li>
          <SidebarUserInfo username="Hà Nội" userid="01"/>
        </li>
        <li>
          <SidebarButton address="/access" icon="user-lock" text="Quản lý"></SidebarButton>
        </li>
        <li>
          <SidebarButton address="/view" icon="list-alt" text="Danh sách"></SidebarButton>
        </li>
        <li>
          <SidebarButton address="/access" icon="chart-bar" text="Phân tích"></SidebarButton>
        </li>
        <li>
          <SidebarButton address="/search" icon="search" text="Tra cứu"></SidebarButton>
        </li>
      </ul>
    </nav>
    <!-- /#sidebar -->
    <!-- Hamburger button -->
    <button
      type="button"
      id="hamburger"
      class="animated fadeInLeft"
      v-bind:class="{ 'is-closed': isClosed, 'is-open': !isClosed }"
      ref="hamburger"
      data-toggle="offcanvas"
      @click="openSidebar()"
    >
      <span class="hamb-top"></span>
      <span class="hamb-middle"></span>
      <span class="hamb-bottom"></span>
    </button>
    <!-- /Hamburger button -->
  </div>
</template>


<script>

import SidebarButton from "./sidebarbuttons/SidebarButton.vue"
import SidebarUserInfo from "./sidebarbuttons/UserInfo.vue"

export default {
  name: "Sidebar",
  components: {
    SidebarButton,
    SidebarUserInfo
  },
  data: function () {
    return {
      isClosed: true,
      isToggled: false,
    };
  },
  methods: {
    openSidebar: function () {
      console.log(this.isClosed);
      if (this.isClosed) {
        this.isClosed = false;
      } else {
        this.isClosed = true;
      }
      this.isToggled = !this.isToggled;
    },
  },
};
</script>

<style scoped>
#sidebar-wrapper {
  z-index: 50;
  padding-left: 0;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
  height: 100%;
}

#sidebar-wrapper.toggled {
  padding-left: 220px;
  height: 100%;
}

#sidebar {
  position: fixed;
  top: 50px;
  left: 220px;
  z-index: 50;
  width: 0px;
  height: 100%;
  margin-left: -220px;
  padding: 0;
  overflow-y: auto;
  overflow-x: hidden;
  background: #1a1a1a;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -o-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

#sidebar::-webkit-scrollbar {
  display: none;
}

#sidebar-wrapper.toggled #sidebar {
  width: 220px;
}

/*-------------------------------*/
/*     Sidebar nav styles        */
/*-------------------------------*/
#sidebar .sidebar-nav {
  position: absolute;
  top: 0;
  width: 220px;
  margin: 0;
  padding: 0;
  list-style: none;
}
#sidebar .sidebar-nav li {
  position: relative;
  line-height: 20px;
  display: inline-block;
  width: 100%;
  color: white;
}
#sidebar .sidebar-nav li:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  height: 100%;
  width: 0px;
  background-color: #04293a;
  -webkit-transition: width 0.2s ease-in;
  -moz-transition: width 0.2s ease-in;
  -ms-transition: width 0.2s ease-in;
  transition: width 0.2s ease-in;
}
#sidebar .sidebar-nav li:hover:before,
#sidebar .sidebar-nav li.open:hover:before {
  width: 100%;
  -webkit-transition: width 0.2s ease-in;
  -moz-transition: width 0.2s ease-in;
  -ms-transition: width 0.2s ease-in;
  transition: width 0.2s ease-in;
}

#sidebar .sidebar-header {
  text-align: center;
  font-size: 20px;
  position: relative;
  width: 100%;
  display: inline-block;
}
/*-------------------------------*/
/*       Hamburger-Cross         */
/*-------------------------------*/
#hamburger {
  position: fixed;
  top: 80px;
  z-index: 999;
  display: block;
  width: 32px;
  height: 32px;
  margin-left: 15px;
  background: transparent;
  border: none;
}
#hamburger:hover,
#hamburger:focus,
#hamburger:active {
  outline: none;
}
#hamburger.is-closed:before {
  content: "";
  display: block;
  width: 100px;
  font-size: 14px;
  color: #fff;
  line-height: 32px;
  text-align: center;
  opacity: 0;
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-transition: all 0.35s ease-in-out;
}
#hamburger.is-closed:hover:before {
  opacity: 1;
  display: block;
  -webkit-transform: translate3d(-100px, 0, 0);
  -webkit-transition: all 0.35s ease-in-out;
}
#hamburger.is-closed .hamb-top,
#hamburger.is-closed .hamb-middle,
#hamburger.is-closed .hamb-bottom,
#hamburger.is-open .hamb-top,
#hamburger.is-open .hamb-middle,
#hamburger.is-open .hamb-bottom {
  position: absolute;
  left: 0;
  height: 4px;
  width: 100%;
}
#hamburger.is-closed .hamb-top,
#hamburger.is-closed .hamb-middle,
#hamburger.is-closed .hamb-bottom {
  background-color: #1a1a1a;
}
#hamburger.is-closed .hamb-top {
  top: 5px;
  -webkit-transition: all 0.35s ease-in-out;
}
#hamburger.is-closed .hamb-middle {
  top: 50%;
  margin-top: -2px;
}
#hamburger.is-closed .hamb-bottom {
  bottom: 5px;
  -webkit-transition: all 0.35s ease-in-out;
}
#hamburger.is-closed:hover .hamb-top {
  top: 0;
  -webkit-transition: all 0.35s ease-in-out;
}
#hamburger.is-closed:hover .hamb-bottom {
  bottom: 0;
  -webkit-transition: all 0.35s ease-in-out;
}
#hamburger.is-open .hamb-top,
#hamburger.is-open .hamb-middle,
#hamburger.is-open .hamb-bottom {
  background-color: #1a1a1a;
}
#hamburger.is-open .hamb-top,
#hamburger.is-open .hamb-bottom {
  top: 50%;
  margin-top: -2px;
}
#hamburger.is-open .hamb-top {
  -webkit-transform: rotate(45deg);
  -webkit-transition: -webkit-transform 0.2s cubic-bezier(0.73, 1, 0.28, 0.08);
}
#hamburger.is-open .hamb-middle {
  display: none;
}
#hamburger.is-open .hamb-bottom {
  -webkit-transform: rotate(-45deg);
  -webkit-transition: -webkit-transform 0.2s cubic-bezier(0.73, 1, 0.28, 0.08);
}
#hamburger.is-open:before {
  content: "";
  display: block;
  width: 100px;
  font-size: 14px;
  color: #fff;
  line-height: 32px;
  text-align: center;
  opacity: 0;
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-transition: all 0.35s ease-in-out;
}
#hamburger.is-open:hover:before {
  opacity: 1;
  display: block;
  -webkit-transform: translate3d(-100px, 0, 0);
  -webkit-transition: all 0.35s ease-in-out;
}

</style>