<template>
  <div class="container-style">
    <b-modal
      id="area-detail-modal"
      :title="title"
      ok-only
      @ok="hide"
      @hide="hide"
      no-stacking
    >
      <b-form-group :label="titleId">
        <label> {{ data.id }} </label>
      </b-form-group>

      <b-form-group :label="titleName">
        <label> {{ data.name }} </label>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "AreaDetailsForm",
  props: {
    // Thông tin lấy dựa trên các trường fields trong file area_constants.js
    // Là thông tin mà backend trả về
    data: Object, // gồm id và name
    api: Object, //
  },

  data() {
    return {
      title: "Thông tin chi tiết",
      titleId: "Mã ",
      titleName: "Tên ",
    };
  },

  mounted() {
    this.title = "Thông tin chi tiết " + this.api.type;
    this.titleId = "Mã " + this.api.type;
    this.titleName = "Tên " + this.api.type;
    this.$bvModal.show("area-detail-modal");
  },

  methods: {
    hide() {
      this.$emit("detailed", true);
    },
  },
};
</script>

<style scoped>
.container-style {
  margin: 0;
}
</style>