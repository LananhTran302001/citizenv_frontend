<template>
  <div class="dropdown">
    <button class="dropbtn"> <span>{{ text }}</span></button>
    <div class="dropdown-content">
      <ToChangePassButton class="dropdown-item-style" />
      <LogoutButton class="dropdown-item-style" />
    </div>
  </div>
</template>

<script>
import ToChangePassButton from "../navbarbuttons/ToChangePassButton.vue";
import LogoutButton from "../navbarbuttons/LogoutButton.vue";

export default {
  name: "AccountMenuButton",
  components: {
    ToChangePassButton,
    LogoutButton,
  },
  props: { text: String },
  data: function () {
    return {
      show: false,
    };
  },
  methods: {
    toggle: function () {
      this.show = !this.show;
    },
  },
};
</script>

<style scoped>
.dropbtn {
  font-size: 18px;
  z-index: 200px;
  padding: 5px 10px 5px 10px;
  background-color: transparent;
  border: solid 1px gainsboro;
  border-radius: 10px;
  color: mediumorchid;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 200;
}

.dropdown-content .dropdown-item-style {
  padding: 10px 20px 10px 20px;
  display: block;
  cursor: pointer;
}

.dropdown-content .dropdown-item-style:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropbtn {
  font-weight: 500;
}

.dropdown:hover .dropdown-content {
  display: block;
}

@media (max-width: 700px) {
  .dropbtn {
    padding: 5px
  }

  .dropdown-item-style {
    padding: 8px;
  }

  span {
    font-size: 14px;
  }
}

</style>
