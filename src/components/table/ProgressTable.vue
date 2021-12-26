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

    <!-- Total progress -->
    <b-row class="my-2" v-if="user.role > 0 && user.role < 4">
      <span class="ml-5"
        >Tổng kết tiến độ: {{ completedAreas }} / {{ totalAreas }}
      </span>
    </b-row>
    
    <!-- những vùng đã có cán bộ -->
    <b-row class="my-2" v-if="user.role > 0 && user.role < 4">
      <span class="ml-5"
        >Số vùng có tài khoản của cán bộ: {{ accountAreas }} / {{ totalAreas }}
      </span>
    </b-row>

    <!-- Nút confirm tiến độ -->
    <b-row class="my-2" v-if="user.role == 4">
      <b-form-group label="Trạng thái hoàn thành tiến độ">
        <b-button
          variant="primary"
          v-show="!completed"
          :disabled="user.is_locked"
          @click="complete"
        >
          <font-awesome-icon icon="times" size="sm" /> Đang hoàn thiện
        </b-button>
        <b-button
          variant="success"
          v-show="completed"
          :disabled="user.is_locked"
          @click="nonComplete"
        >
          <font-awesome-icon icon="check" size="sm" /> Đã xong
        </b-button>
      </b-form-group>
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
      <!-- Cột stt -->
      <template #cell(index)="row">
        {{ row.index + 1 }}
      </template>

      <!-- cột tiến độ cho A1, A2, A3 -->
      <template #cell(completed)="row">
        <b-form-checkbox
          size="lg"
          :disabled="user.role != 4 || user.is_locked"
          v-model="row.item.completed"
          @click="completeRow(row)"
        >
        </b-form-checkbox>
      </template>

      <!-- Cột gửi nhắc nhở -->
      <template #cell(sendEmail)="row">
        <button
          v-if="(user.role > 0 && user.role < 5) && !row.item.completed"
          class="mr-2 sm-button-style row-btn-style"
          @click="handleSendEmail(row)"
        >
          <font-awesome-icon icon="paper-plane" size="sm" />
          Nhắc nhở
        </button>
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
import Message from "../Message.vue";
import { mapGetters, mapActions } from "vuex";
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
      completed: false,

      totalAreas: 0,
      completedAreas: 0,
      accountAreas: 0,

      totalRows: 0, // Tổng số dòng
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
    this.fields.push({ key: "sendEmail", label: "Nhắc nhở" });
    this.fetchData();
  },

  methods: {
    ...mapActions({
      commitCompleted: "Progress/commitCompleted",
      sendEmail: "Progress/sendEmail"
    }),

    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    complete() {
      this.completed = true;
      this.commitCompleted({
        role: this.user.role,
        progress: this.completed,
      });
    },

    nonComplete() {
      this.completed = false;
      this.commitCompleted({
        role: this.user.role,
        progress: this.completed,
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
            this.items = data.progress;
            this.totalRows = this.items.length;
            if (this.user.role == 4) {
              this.completed = data.completed;
            } else {
              this.totalAreas = data.total;
              this.completedAreas = data.completed;
              this.accountAreas = data.allocated;
            }
          });
      }
    },

    handleSendEmail(row) {
      const accountId = row.item.id;
      this.sendEmail({
        role: this.user.role,
        account: {id: accountId}
      });
    }
  },
};
</script>

<style scoped>
.row-btn-style {
  padding: 5px;
  color: rgba(1, 5, 58, 0.836);
  background-color: transparent;
  border: solid 1px transparent;
  border-radius: 3px;
  font-size: 16px;
}

.row-btn-style:hover {
  color: #32b890;
  background-color: white;
}
</style>
