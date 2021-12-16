<template>
  <b-container fluid>
    
    <!-- User interface control -->
    <b-row class="my-2">
      
      <!-- Search bar -->
      <b-col xs="10" sm="10" md="6" lg="6">
        <b-form-group
          label="Tìm kiếm"
          label-for="search-input"
          label-cols-xs="12"
          label-cols-sm="4"
          label-cols-md="3"
          label-cols-lg="2"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <!-- Input -->
            <b-form-input
              id="search-input"
              type="search"
              placeholder="Nhập để tìm kiếm"
            >
            </b-form-input>
            <!-- Nút Clear -->
            <b-input-group-append>
              <b-button>Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <!-- Rows per page -->
      <b-col xs="10" sm="10" md="6" lg="6" class="my-1">
        <DropdownButton
          title="Số dòng/trang"
          :xs="12"
          :sm="4"
          :md="5"
          :lg="3"
          :options="rowsPerPageOptions"
          v-model="rowsPerPage"
        />
      </b-col>
    </b-row>


    <!-- Main table element -->
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      sort-icon-left
    >
      <template #cell(progress)="row">
        <b-form-checkbox v-model="row.progress" />
      </template>

      <template #cell(authorization)="data">
        <b-button size="xs" class="mr-2 sm-button-style delete-button-style">
          <font-awesome-icon icon="trash" size="sm" @click="deleteRow(data.area_id)"/>
          Xóa
        </b-button>
        <b-button size="xs" class="mr-2 sm-button-style edit-button-style">
          <font-awesome-icon icon="edit" size="sm" @click="editRow(data.area_id)"/>
          Sửa
        </b-button>
        <b-button size="xs" class="mr-2 sm-button-style detail-button-style">
          <font-awesome-icon icon="eye" size="sm" @click="detailsRow(data.area_id)"/>
          Chi tiết
        </b-button>
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
  </b-container>
</template>





<script>

import DropdownButton from "./buttons/DropdownButton.vue";

export default {
  name: "AreaTable",
  components: {DropdownButton},
  data() {
    return {
      //Do backend trả về, có thể thay đổi các trường
      items: [
        { area_id: "01", area_name: "Quảng Ninh", progress: true },
        { area_id: "02", area_name: "Cà Mau", progress: true },
        { area_id: "03", area_name: "Đồng Tháp", progress: true },
      ],
      fields: [
        { key: "area_id", label: "Mã vùng", sortable: true },
        { key: "area_name", label: "Tên vùng", sortable: true },
        { key: "progress", label: "Tiến độ", sortable: false},
        { key: "authorization", label: "Chỉnh sửa"}
      ],

      totalRows: 1, // Tổng số dòng
      currentPage: 1, // Trang bảng hiện tại
      perPage: 100, // Số dòng hiện trong mỗi trang bảng
      rowsPerPageOptions: [5, 10, 50], // Các options cho số dòng hiện / trang bảng
      rowsPerPage: 10, // Số dòng/trang đang chọn
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
    // Hiện tổng số dòng tất cả sau khi load bảng
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


<style scoped>
.sm-button-style {
  padding: 5px;
  color: rgba(1, 5, 58, 0.836);
  background-color: transparent;
  border: none;
  font-size: 16px;
}

.sm-button-style:hover {
  color: #32b890;
}
</style>