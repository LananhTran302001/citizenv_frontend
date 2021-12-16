<template>
  <b-container fluid>
    <!-- Main table element -->
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      sticky-header
      show-empty
      small
      @filtered="onFiltered"
    >
      <template #cell(progress) ="row">
        <b-form-checkbox v-model="row.progress"/>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <!-- Info modal -->
    <b-modal
      :id="infoModal.id"
      :title="infoModal.title"
      ok-only
      @hide="resetInfoModal"
    >
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
    <SelectColumns />
  </b-container>
</template>

<script>
import SelectColumns from "./buttons/SelectColumns.vue";

export default {
  components: { SelectColumns },
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
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
};
</script>
