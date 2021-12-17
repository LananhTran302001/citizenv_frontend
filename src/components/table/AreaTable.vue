<template>
  <b-container fluid class="container-style">
    <!-- User interface control -->
    <b-row class="my-1">
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
              v-model="filter"
            >
            </b-form-input>
            <!-- Nút Clear -->
            <b-input-group-append>
              <b-button>Xóa</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <!-- Rows per page -->
      <b-col xs="10" sm="10" md="6" lg="6" class="my-1">
        <b-form-group
          label="Số dòng/trang"
          label-cols-xs="12"
          label-cols-sm="4"
          label-cols-md="5"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            :options="rowsPerPageOptions"
            v-model="rowsPerPage"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col xs="10" sm="10" md="6" lg="6">
        <AreaAddForm />
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      id="area-table"
      :items="table_items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="rowsPerPage"
      :filter="filter"
      sort-icon-left
      stacked="md"
    >
      <!-- Checkbox tiến độ -->
      <template #cell(progress)="row">
        <b-form-checkbox v-model="row.progress" />
      </template>

      <!-- Các nút xóa/sửa/chi tiết -->
      <template #cell(authorization)="data">
        <b-button size="xs" class="mr-2 sm-button-style delete-button-style">
          <font-awesome-icon
            icon="trash"
            size="sm"
            @click="deleteRow(data.area_id)"
          />
          Xóa
        </b-button>
        <b-button size="xs" class="mr-2 sm-button-style edit-button-style">
          <font-awesome-icon
            icon="edit"
            size="sm"
            @click="editRow(data.area_id)"
          />
          Sửa
        </b-button>
        <b-button size="xs" class="mr-2 sm-button-style detail-button-style">
          <font-awesome-icon
            icon="eye"
            size="sm"
            @click="detailsRow(data.area_id)"
          />
          Chi tiết
        </b-button>
      </template>
    </b-table>
    <!-- Total rows -->
    <b-row class="my-2">
      <span class="ml-5">Danh sách có tổng cộng {{ totalRows }} dòng </span>
    </b-row>
    <!-- Pages of table -->
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="rowsPerPage"
      aria-controls="area-table"
      class="justify-content-center"
    ></b-pagination>

    <!--  Button để hiện -->
    <div>
      <button @click="chandoi()">Hiện</button>
    </div>
  </b-container>
</template>

<script>

import {mapGetters, mapActions} from "vuex"
import AreaAddForm from "./forms/AreaAddForm.vue";

export default {
  name: "AreaTable",
  components: { AreaAddForm },
  data() {
    return {
      //Do backend trả về, có thể thay đổi các trường
      table_items: null,
      fields: [
        { key: "cityProvinceId", label: "Mã vùng", sortable: true },
        { key: "cityProvinceName", label: "Tên vùng", sortable: true },
        { key: "authorization", label: "Chỉnh sửa" },
      ],

      totalRows: 1, // Tổng số dòng
      currentPage: 1, // Trang bảng hiện tại
      rowsPerPageOptions: [2, 5, 10, 50], // Các options cho số dòng hiện / trang bảng
      rowsPerPage: 10, // Số dòng/trang đang chọn
      filter: null, // Phần text tìm kiếm trong bảng
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      items: "getCities"
    }),

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
    this.totalRows = 10;
    this.clickGetCities();
    console.log(this.items)
  },
  methods: {
    ...mapActions(["clickGetCities"]),

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
    chandoi() {
      this.table_items = this.items;
      console.log("Day la items")
      console.log(this.items)
      console.log("Day la item")
      console.log(this.item)
    }
  },
};
</script>

<style scoped>
.container-style {
  margin-top: 80px;
}

#area-table {
  background-color: #f7d08a;
}

.sm-button-style {
  padding: 5px;
  color: rgba(1, 5, 58, 0.836);
  background-color: transparent;
  border: none;
  font-size: 16px;
}

.sm-button-style:hover {
  color: #32b890;
  background-color: white;
}
</style>
