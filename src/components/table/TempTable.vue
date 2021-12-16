<template>
  <b-table
    selectable
    responsive="sm"
    :fields="fields"
    :items="items"
    select-mode="range"
    :dark="true">
    <template slot="preview" slot-scope="row">
      <b-form-checkbox
        v-model="row.item.progress"
        @input="onPreviewClick($event, row.index, row.item)"
      ></b-form-checkbox>
    </template>
    <template slot="fix" slot-scope="row">
      <b-form-checkbox v-model="row.item.fix"></b-form-checkbox>
    </template>
  </b-table>
</template>

<script>
export default {
  name:  "TempTable",
  // ..
  methods: {
    onPreviewClick(value, index, item) {
      // value == value of checkbox (ie. true or false, or whatever is stored in v-model)
      // index == visual index of row (i.e. the index of the row wrt the displayed rows)
      // item == the clicked row item data
      console.log("click checkbox", value, index, item)
    }
  },
  data() {
    return {
      items: [
        { area_id: "01", area_name: "abc", progress: true, selected: true 
        },
        { area_id: "01", area_name: "abc", progress: true },
        { area_id: "01", area_name: "abc", progress: true },
        { area_id: "01", area_name: "abc", progress: true },
        { area_id: "01", area_name: "abc", progress: true },
        { area_id: "01", area_name: "abc", progress: true },
      ],
      fields: [
        { key: "area_id", label: "Mã vùng", sortable: true },
        { key: "area_name", label: "Tên vùng", sortable: true },
        { key: "progress", label: "Tiến độ", sortable: false },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      selected: true,
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  }
}
</script>