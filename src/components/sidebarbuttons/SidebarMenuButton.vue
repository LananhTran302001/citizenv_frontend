<template>
  <div class="d-flex flex-column">
    
    <a @click="toggle" class="dropdown-toggle-style">
      <font-awesome-icon :icon="options.icon" size="lg" />
      <span> {{ options.text }} </span>
      <font-awesome-icon icon="caret-down" size="sm" />
    </a>
    
    <ul class="dropdown-menu-style" v-show="show">
      <li
        v-for="(option, index) in options.options"
        :key="index"
        class="dropdown-item-style"
      >
        <router-link 
        :to="option.address"
        class="link-style"
        >
          <span>{{ option.text }}</span>
        </router-link>
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: "SidebarMenuButton",
  props: {
    options: null,
  },
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

span {
  color: white;
  font-size: 20px;
  text-decoration: none;
}

.dropdown-toggle-style {
  display: block;
  cursor: pointer;
  color: white;
  text-decoration: none;
  padding: 15px 15px 15px 30px;
}

.dropdown-menu-style {
  list-style-type: none;
}

.dropdown-item-style {
  padding: 10px 5px 10px 5px;
}

.dropdown-toggle-style:hover,
.dropdown-item-style:hover,
.dropdown-item-style:active,
.dropdown-item-style:focus {
  outline: none;
  margin-left: 10px;
  background-color: transparent;
}

.link-style {
  margin: 10px;
  text-decoration: none;
}


</style>
