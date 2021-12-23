<template>
  <b-container fluid class="container-style">
    <!-- User interface control -->
    <b-row>
      <!-- Search bar -->
      <b-col xs="10" sm="10" md="6" lg="6" class="my-1">
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
            <!-- Chỗ nhập input -->
            <b-form-input
              id="search-input"
              v-model="filter"
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
    <!-- Selection -->
    <b-row>
      <b-col xs="12" sm="12" md="6" lg="3" class="my-1">
        <!-- Chọn tỉnh thành: A1: role = 1 -->
        <DropdownButton
          title="Tỉnh/thành"
          :xs="12"
          :sm="4"
          :md="5"
          :lg="4"
          :options="cities"
          v-if="user.role == 1"
        />
      </b-col>

      <b-col xs="12" sm="12" md="6" lg="3" class="my-1">
        <!-- Chọn quận/huyện/thị xã: A1, A2: role = 1,2 -->
        <DropdownButton
          title="Quận/huyện/thị xã"
          :xs="12"
          :sm="4"
          :md="5"
          :lg="5"
          :options="districts"
          v-if="user.role > 0 && user.role < 3"
        />
      </b-col>
      <b-col xs="12" sm="12" md="6" lg="3" class="my-1">
        <!-- Chọn xã/phường/thị trấn: A1, A2, A3: role = 1,2,3 -->
        <DropdownButton
          title="Xã/phường/thị trấn"
          :xs="12"
          :sm="4"
          :md="5"
          :lg="6"
          :options="wards"
          v-if="user.role > 0 && user.role < 4"
      /></b-col>
      <b-col xs="12" sm="12" md="6" lg="3" class="my-1">
        <!-- Chọn thôn/xóm/bản/tổ dân phố: A1, A2, A3, B1=A4: role = 1,2,3,4 -->
        <DropdownButton
          title="Thôn/bản/tổ dân phố"
          :xs="12"
          :sm="4"
          :md="5"
          :lg="6"
          :options="residentalGroups"
          v-if="user.role > 0 && user.role < 5"
        />
      </b-col>
    </b-row>
    <!-- Main table -->
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="rowsPerPage"
      :filter="filter"
      sort-icon-left
      responsive="sm"
      class="my-2 table-style"
    >
      <template #cell(index)="row">
        {{ row.index + 1 }}
      </template>
      <template #cell(authorization)="data">
        <b-button
          size="xs"
          class="mr-2 sm-button-style sm-button-style"
          v-if="user.role == 4 && !user.is_locked"
        >
          <font-awesome-icon
            icon="trash"
            size="sm"
            @click="deleteRow(data.name)"
          />
        </b-button>
        <b-button
          size="xs"
          class="mr-2 sm-button-style sm-button-style"
          v-if="user.role == 4 && !user.is_locked"
        >
          <font-awesome-icon
            icon="edit"
            size="sm"
            @click="editRow(data.name)"
          />
        </b-button>
        <b-button size="xs" class="mr-2 sm-button-style sm-button-style">
          <font-awesome-icon
            icon="eye"
            size="sm"
            @click="detailsRow(data.name)"
          />
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

    <!-- Chọn các cột hiển thị -->
    <div class="select-cols-style">
      <div class="menu-style" v-show="isOpenSelectCols">
        <h5>Chọn cột hiển thị</h5>
        <CheckboxButton label="Tất cả" />
        <CheckboxButton
          v-for="(field, i) in api.fields"
          :key="i"
          :label="field.label"
          @isChecked="selectColIsChecked(api.fields[i])"
          @isNonChecked="selectColIsNonChecked(api.fields[i])"
        />
        <button type="button" id="close-selcolumn-btn" @click="applySelectCols">
          Áp dụng
        </button>
      </div>
      <font-awesome-icon
        icon="table"
        size="lg"
        id="open-selcolumn-btn"
        v-show="!isOpenSelectCols"
        @click="openSelectCols"
      />
    </div>
  </b-container>
</template>

<script>
import DropdownButton from "./buttons/DropdownButton.vue";
import CheckboxButton from "./buttons/CheckboxButton.vue";
import { mapGetters } from "vuex";
import { BACKEND_URL } from "../../store/statics/backend_url";
import { getCitizenAPI } from "../../store/statics/citizen_constants";

export default {
  name: "CitizenTable",
  components: {
    DropdownButton,
    CheckboxButton,
  },

  data: function () {
    return {
      totalRows: 1, // Tổng số dòng
      currentPage: 1, // Trang bảng hiện tại
      rowsPerPageOptions: [5, 10, 30, 50, 100], // Các options cho số dòng hiện / trang bảng
      rowsPerPage: 10, // Số dòng/trang đang chọn
      filter: null, // Phần text tìm kiếm trong bảng

      // Các tỉnh/thành phố cho phép chọn: chỉ được xem trong option này
      cities: ["Ha Noi", "Ha Giang", "Can Tho"],
      // Các quận/huyện/thị xã cho phép chọn: chỉ được xem trong option này
      districts: ["Quận 1", "Quận 2", "Quận 3"],
      // Các xã/phường/thị trấn cho phép chọn: chỉ được xem trong option này
      wards: ["Xã 1", "Xã 12", "Xã 15"],
      // Các thôn/xóm/tổ dân phố cho phép chọn: chỉ được xem trong option này
      residentalGroups: ["Thôn 1", "Thôn 2", "Thôn 3"],

      // DATA:
      api: null,
      items: [],
      fields: [],
      showFields: [],
      isOpenSelectCols: false,
    };
  },

  computed: {
    ...mapGetters({
      user: "User/getUser",
    }),
  },

  created() {
    this.api = getCitizenAPI(this.user.role);
    this.fields = this.api.fields.slice(1, this.api.fields.length);
    this.fields.push({ key: "authorization", label: "Chỉnh sửa" });
    this.fields.unshift({ key: "index", label: "STT" });
    this.fetchData();
  },

  methods: {
    reset() {
      this.fields = null;
      this.isOpenSelectCols = false;
    },

    deleteRow(val) {
      console.log(val);
    },
    editRow(val) {
      console.log(val);
    },
    detailsRow(val) {
      console.log(val);
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
          this.items = data.Citizens;
          console.log(data);
          this.totalRows = this.items.length;
        });
    },

    openSelectCols() {
      this.isOpenSelectCols = true;
    },

    applySelectCols() {
      this.isOpenSelectCols = false;
      let list = Array.of(...this.fields)
      console.log(list)
      console.log(this.showFields)
      let listnew = []
      this.reset();
      for (let field of list) {
        console.log(field)
        if (this.showFields.indexOf(field) != -1){
          listnew.push(field)
        }
      }
      this.fields = listnew
    },

    selectColIsChecked(row) {
      console.log("Column được chọn")
      console.log(row)
      this.showFields.push(row)
      console.log(this.showFields)
    },

    selectColIsNonChecked(row) {
      console.log("Column được bỏ chọn")
      console.log(row)
      console.log("các fields hiện sau khi bỏ chọn")
      this.showFields.splice(this.showFields.indexOf(row), 1)
      console.log(this.showFields)
    }
  },
};
</script>

<style scoped>
.container-style {
  padding: 15px;
}
.table-style {
  background-color: white;
  font-size: 13px;
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

.select-cols-style .menu-style {
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: flex;
  flex-direction: column;
  background-color: rgb(230, 179, 245);
  border: solid 1px #888;
  border-radius: 20px;
  padding: 30px;
}

.select-cols-style #close-selcolumn-btn {
  padding: 7px 10px 7px 10px;
  border: solid 1px gainsboro;
  border-radius: 10px;
}

.select-cols-style #open-selcolumn-btn {
  position: fixed;
  bottom: 50px;
  right: 30px;
  color: rgb(230, 179, 245);
  font-size: 50px;
  padding: 10px;
  background-color: white;
  border-radius: 50%;
}

.select-cols-style #open-selcolumn-btn:hover {
  background-color: rgb(0, 0, 0);
  cursor: pointer;
}
</style>
