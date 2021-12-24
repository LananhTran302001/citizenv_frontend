<template>
  <b-modal
    id="select-form-modal"
    title="title"
    ok-only
    @ok="hide"
    @hide="hide"
    no-stacking
  >
    <b-row align-h="center">
      <h4>Danh sách các</h4>
      <b-col cols="10">
        <CheckboxButton
          v-for="(field, i) in options"
          :key="i"
          :label="field.Name"
          @isChecked="checkRow(field)"
          @isNonChecked="nonCheckRow(field)"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-button>Lọc</b-button>
      <b-button>Hủy</b-button>
    </b-row>
  </b-modal>
</template>

<script>
import CheckboxButton from "../buttons/CheckboxButton.vue";
export default {
  name: "SelectForm",

  components: { CheckboxButton },
  props: { options: Array },
  data() {
    return {
      selectAreaIds: [], // id các vùng được chọn
    };
  },

  created() {
    this.$bvModal.show("select-form-modal");
  },

  methods: {
    checkRow(row) {
      this.selectAreaIds.push(row);
    },

    nonCheckRow(row) {
      this.selectAreaIds.splice(this.options.indexOf(row), 1);
    },

    hide() {
      this.$emit("selected", true);
    },
  },
};
</script>
