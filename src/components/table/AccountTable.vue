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
              <b-button
              @click="filter = ''"
              >Xóa</b-button>
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

    <!-- <b-row>
      <b-col xs="10" sm="10" md="6" lg="6">
        <AccountAddForm :role="user.role" :api="api"/>
      </b-col>
    </b-row> -->

    <!-- Main table element -->
    <b-table
      id="area-table"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="rowsPerPage"
      :filter="filter"
      sort-icon-left
      stacked="md"
    >
      <!-- Các nút xóa/sửa/chi tiết -->
      <template #cell(authorization)="{ data, index }">
        <b-button
          size="xs"
          class="mr-2 sm-button-style delete-button-style"
          @click="deleteRow(index)"
        >
          <font-awesome-icon icon="trash" size="sm" />
          Xóa
        </b-button>
        <b-button
          size="xs"
          class="mr-2 sm-button-style edit-button-style"
          @click="editRow(data.cityProvinceId)"
        >
          <font-awesome-icon icon="edit" size="sm" />
          Sửa
        </b-button>
        <b-button
          size="xs"
          class="mr-2 sm-button-style detail-button-style"
          @click="detailsRow(data.cityProvinceId)"
        >
          <font-awesome-icon icon="eye" size="sm" />
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
      <button @click="fetchData()">Hiện</button>
    </div>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";
import { getAccountAPI } from "../../store/statics/account_constants.js";
import { BACKEND_URL } from "../../store/statics/backend_url.js";

export default {
  name: "AccountTable",
  data() {
    return {
      api: null,
      // Dữ liệu backend trả về, có thể thay đổi các trường
      items: [],
      fields: [],

      totalRows: 1, // Tổng số dòng
      currentPage: 1, // Trang bảng hiện tại
      rowsPerPageOptions: [2, 5, 10, 50], // Các options cho số dòng hiện / trang bảng
      rowsPerPage: 10, // Số dòng/trang đang chọn
      filter: null, // Phần text tìm kiếm trong bảng
    };
  },

  created() {
    this.api = getAccountAPI();
    console.log("Đây là các trường sẽ hiện");
    this.fields = this.api.fields;
    this.fields.push({ key: "authorization", label: "Chỉnh sửa" });
    this.fetchData();
  },

  methods: {
    ...mapActions({
      getAllAccount: "Account/getAllAccounts",
      deleteAccount: "Account/deleteAccount",
      addAccount: "Account/addAccount",
    }),

    // khi tìm kiếm thì tính lại số dòng kết quả
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    fetchData() {
      let url = BACKEND_URL + this.api.urlAll;
      fetch(url, {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // this accounts for api urls in which the data is not the first result
          this.items = data.Accounts;
          console.log(data);
          this.totalRows = this.items.length;
        });
    },
  },
};
</script>

<style scoped>
.container-style {
  margin: 0px;
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
