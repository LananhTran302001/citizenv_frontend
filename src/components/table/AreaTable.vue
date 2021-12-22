<template>
  <b-container fluid class="container-style">
    <!-- Thông báo từ server -->
    <Message
      :id="serverMsg.id"
      :title="serverMsg.title"
      :content="serverMsg.content"
      :variant="serverMsg.variant"
    />
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
              <b-button @click="filter = ''">Xóa</b-button>
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
      <b-col xs="4" sm="4" md="4" lg="4">
        <AreaAddForm
          :role="user.role"
          :api="api"
          @added="forceRefresh"
          v-if="api"
        />
      </b-col>
      <b-col xs="4" sm="4" md="4" lg="4">
        <AreaEditForm
          :role="user.role"
          :api="api"
          :oldData="editingArea"
          v-if="editingArea && api"
          @updated="forceRefresh"
        />
      </b-col>
      <b-col xs="4" sm="4" md="4" lg="4">
        <AreaDetailsForm
          :api="api"
          :data="detailingArea"
          v-if="detailingArea && api"
          @detailed="forceRefresh"
        />
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      id="area-table"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="rowsPerPage"
      :filter="filter"
      @filtered="onFiltered"
      sort-icon-left
      stacked="md"
    >
      <template #cell(index)="row">
        {{ row.index + 1 }}
      </template>

      <!-- Các nút xóa/sửa/chi tiết -->
      <template #cell(authorization)="row">
        <b-button
          size="xs"
          class="mr-2 sm-button-style delete-button-style"
          @click="deleteRow(row)"
        >
          <font-awesome-icon icon="trash" size="sm" />
          Xóa
        </b-button>

        <b-button
          size="xs"
          class="mr-2 sm-button-style edit-button-style"
          @click="editRow(row)"
        >
          <font-awesome-icon icon="edit" size="sm" />
          Sửa
        </b-button>

        <b-button
          size="xs"
          class="mr-2 sm-button-style detail-button-style"
          @click="detailsRow(row)"
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
  </b-container>
</template>

<script>
import AreaAddForm from "./forms/AreaAddForm.vue";
import AreaEditForm from "./forms/AreaEditForm.vue";
import AreaDetailsForm from "./forms/AreaDetailsForm.vue";
import Message from "../Message.vue";
import { mapGetters, mapActions } from "vuex";
import { getAreaAPI, decodeJson } from "../../store/statics/area_constants";
import { BACKEND_URL } from "../../store/statics/backend_url";

export default {
  name: "AreaTable",
  components: { Message, AreaAddForm, AreaEditForm, AreaDetailsForm },
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

      editingArea: null, // Thông tin vùng đang được chỉnh sửa
      detailingArea: null, // Thông tin vùng đang hiển thị chi tiết
    };
  },

  computed: {
    ...mapGetters({
      user: "User/getUser",
      serverMsg: "Area/getServerMsg",
    }),
  },

  created() {
    this.api = getAreaAPI(this.user.role);
    this.fields = this.api.fields;
    this.fields.push({ key: "authorization", label: "Chỉnh sửa" });
    this.fields.unshift({ key: "index", label: "STT" });
    this.fetchData();
  },

  methods: {
    ...mapActions({
      getAllArea: "Area/getAllArea",
      deleteArea: "Area/deleteArea",
    }),

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    getAreaAtRow(row) {
      return decodeJson({
        role: this.user.role,
        area: row.item,
      });
    },

    fetchData() {
      if (this.api) {
        let url = BACKEND_URL + this.api.urlAll;
        fetch(url, {
          headers: { Authorization: `Bearer ${localStorage.token}` },
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            // this accounts for api urls in which the data is not the first result
            this.items = data.Areas;
            this.totalRows = this.items.length;
          });
      }
    },

    forceRefresh() {
      this.editingArea = null;
      this.detailingArea = null;
      setTimeout(() => this.fetchData(), 2000);
    },

    deleteRow(row) {
      const areaId = this.getAreaAtRow(row).id;
      this.deleteArea({
        role: this.user.role,
        area: { id: areaId },
      });
      this.forceRefresh();
    },

    editRow(row) {
      this.editingArea = this.getAreaAtRow(row);
    },

    detailsRow(row) {
      this.detailingArea = this.getAreaAtRow(row);
    },
  },
};
</script>

<style scoped>
.container-style {
  margin: 0;
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
