<template>
  <b-form-group
    :label="text"
    label-for="filter-input"
    label-cols-xs="12"
    label-cols-sm="4"
    label-cols-md="3"
    label-cols-lg="2"
    label-align-sm="right"
    :label-size="label_size"
    class="mb-0"
  >
    <b-input-group size="sm">
      <b-form-input
        id="filter-input"
        v-model="filter"
        type="search"
        :placeholder="placeholder"
      ></b-form-input>

      <b-input-group-append>
        <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
      </b-input-group-append>
    </b-input-group>
  </b-form-group>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    text: null,
    label_size: null,
    placeholder: null,
    filter: null,
  },
  data: function () {
      return {
      search_filter: this.filter,
      }
  }
};
</script>
