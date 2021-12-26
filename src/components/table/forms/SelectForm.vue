<template>
  <b-modal
    id="select-form-modal"
    :title="title"
    ok-only
    ok-title="Lọc"
    cancel-title="Hủy"
    @show="resetModal"
    @hidden="resetModal"
    @ok="handleOk"
    :ok-disabled="!selectAreas"
    @hide="hide"
    no-stacking
  >
    <b-row align-h="center">
      <h4>Danh sách các {{ type }}</h4>
      <b-col cols="10">
        <CheckboxButton
          v-for="(area, i) in options"
          :key="i"
          :label="area.Name"
          @isChecked="checkRow(area)"
          @isNonChecked="nonCheckRow(area)"
        />
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import CheckboxButton from "../buttons/CheckboxButton.vue";
export default {
  name: "SelectForm",

  components: { CheckboxButton },

  props: { options: Array, type: String },
  data() {
    return {
      title: "Chọn nhóm ",
      selectAreas: [], // các vùng được chọn
    };
  },

  created() {
    this.title = this.title + this.type;
  },

  mounted() {
    this.$bvModal.show("select-form-modal");
  },

  methods: {
    resetModal() {
      this.selectAreas = [];
    },

    checkRow(row) {
      this.selectAreas.push(row);
    },

    nonCheckRow(row) {
      this.selectAreas.splice(this.selectAreas.indexOf(row), 1);
    },

    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },

    handleSubmit() {
      this.$emit("selected", this.selectAreas);
      this.$nextTick(() => {
        this.$bvModal.hide("select-form-modal");
      });
    },

    hide() {
      this.$emit("canceled", true)
      this.$bvModal.hide("select-form-modal");
    },
  },
};
</script>
