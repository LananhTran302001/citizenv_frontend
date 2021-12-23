// Ẩn nút thêm nếu đã có // Ẩn nút chỉnh sửa nếu chưa có

<template>
  <b-container fluid class="container-style">
    <!-- Thông báo từ server -->
    <Message
      :id="serverMsg.id"
      :title="serverMsg.title"
      :content="serverMsg.content"
      :variant="serverMsg.variant"
    />
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
      <b-col xs="10" sm="10" md="10" lg="10">
        <AccountAddForm
          :accountId="addingAccountId"
          :role="user.role"
          :api="api"
          v-if="!user.is_locked && addingAccountId && api"
          @added="forceRefresh"
        />
      </b-col>
      <b-col xs="10" sm="10" md="10" lg="10">
        <AccountEditForm
          :account="editingAccount"
          :role="user.role"
          :api="api"
          v-if="!user.is_locked && editingAccount && api"
          @updated="forceRefresh"
        />
      </b-col>
      <b-col xs="10" sm="10" md="10" lg="10">
        <AccountDetailsForm
          :data="detailingAccount"
          :api="api"
          v-if="detailingAccount && api"
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
      sort-icon-left
      stacked="md"
    >
      <!-- Nút hiển thị bị khóa hay không -->
      <template #cell(isLocked)="row">
        <b-button
          variant="danger"
          v-if="row.item.isLocked != null"
          v-show="row.item.isLocked"
          @click="lockAccountAtRow(row, false)"
        >
          <font-awesome-icon icon="lock" size="sm" /> Đang khóa
        </b-button>

        <b-button
          variant="success"
          v-if="row.item.isLocked != null"
          v-show="!row.item.isLocked"
          @click="lockAccountAtRow(row, true)"
        >
          <font-awesome-icon icon="lock-open" size="sm" /> Đang mở
        </b-button>
      </template>

      <!-- Các nút xóa/sửa/chi tiết -->
      <template #cell(authorization)="row">
        <b-button
          size="xs"
          class="mr-2 sm-button-style delete-button-style"
          v-if="!user.is_locked && row.item.isLocked == null"
          @click="addToRow(row)"
        >
          <font-awesome-icon icon="plus" size="sm" />
          Thêm
        </b-button>
        <!-- Nút sửa hiện khi đã có account tại hàng này -->
        <b-button
          size="xs"
          class="mr-2 sm-button-style edit-button-style"
          v-if="!user.is_locked && row.item.isLocked != null"
          @click="editRow(row)"
        >
          <font-awesome-icon icon="edit" size="sm" />
          Sửa
        </b-button>
        <b-button
          size="xs"
          class="mr-2 sm-button-style delete-button-style"
          v-if="!user.is_locked"
          @click="deleteRow(row)"
        >
          <font-awesome-icon icon="trash" size="sm" />
          Xóa
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

    <!--  Button để hiện -->
    <div>
      <button @click="fetchData()">Hiện</button>
    </div>
  </b-container>
</template>

<script>
import AccountAddForm from "./forms/AccountAddForm.vue";
import AccountEditForm from "./forms/AccountEditForm.vue";
import AccountDetailsForm from "./forms/AccountDetailsForm.vue";
import Message from "../Message.vue";
import { mapGetters, mapActions } from "vuex";
import {
  getAccountAPI,
  decodeJson,
} from "../../store/statics/account_constants.js";
import { BACKEND_URL } from "../../store/statics/backend_url.js";

export default {
  name: "AccountTable",
  components: { AccountAddForm, AccountEditForm, AccountDetailsForm, Message },
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

      addingAccountId: null,
      editingAccount: null,
      detailingAccount: null,
    };
  },

  computed: {
    ...mapGetters({
      user: "User/getUser",
      serverMsg: "Account/getServerMsg",
    }),
  },

  created() {
    this.api = getAccountAPI(this.user.role);
    this.fields = this.api.fields;
    this.fields.push({ key: "authorization", label: "Chỉnh sửa" });
    this.fetchData();
  },

  methods: {
    ...mapActions({
      getAllAccount: "Account/getAllAccounts",
      deleteAccount: "Account/deleteAccount",
      addAccount: "Account/addAccount",
      updateIsLocked: "Account/updateIsLocked",
    }),

    // khi tìm kiếm thì tính lại số dòng kết quả
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    lockAccountAtRow(row, isLocked) {
      this.updateIsLocked({
        role: this.user.role,
        account: {
          id: decodeJson(row.item).id,
          isLocked: isLocked,
        },
      });
      this.forceRefresh();
    },

    addToRow(row) {
      this.addingAccountId = row.item.areaId;
    },

    editRow(row) {
      this.editingAccount = decodeJson(row.item);
    },

    deleteRow(row) {
      this.deleteAccount({
        role: this.user.role,
        account: { id: row.item.areaId },
      });
      console.log(row.item.areaId);
      this.forceRefresh();
    },

    detailsRow(row) {
      this.detailingAccount = decodeJson(row.item);
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

    forceRefresh() {
      this.addingAccountId = null;
      this.editingAccount = null;
      this.detailingAccount = null;
      setTimeout(() => this.fetchData(), 2000);
      setTimeout(() => this.fetchData(), 5000);
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
