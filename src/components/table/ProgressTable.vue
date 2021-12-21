<template>
  <b-container fluid class="container-style">
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

    <b-table
      id="progress-table"
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
      <template #cell(progress)="row">
        <b-form-checkbox
          size="lg"
          :disabled="user.role != 4 || user.is_locked"
          @click="completeRow(row)"
        >
        </b-form-checkbox>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import Message from "../Message.vue";
import { mapGetters } from "vuex";
import { getProgressAPI } from "../../store/statics/progress_constants";
import { BACKEND_URL } from "../../store/statics/backend_url";

export default {
  name: "ProgressTable",
  components: { Message },

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

  computed: {
    ...mapGetters({
      user: "User/getUser",
      serverMsg: "Progress/getServerMsg",
    }),
  },

  created() {
    this.api = getProgressAPI(this.user.role);
    this.fields = this.api.fields;
    this.fields.unshift({ key: "index", label: "STT" });
    this.fetchData();
  },

  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
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
            // this.items = data.Areas;
            // this.totalRows = this.items.length;
            console.log(data);
          });
      }
    },
  },
};
</script>
