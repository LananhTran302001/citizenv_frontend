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
              v-model="search"
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
    <!-- Filter -->
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
          v-if="role == 1"
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
          v-if="role > 0 && role < 3"
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
          v-if="role > 0 && role < 4"
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
          v-if="role > 0 && role < 5"
        />
      </b-col>
    </b-row>
    <!-- Main table -->
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="rowsPerPage"
      sort-icon-left
      :sort-by.sync="sortBy"
      responsive="sm"
      class="my-2 table-style"
    >
      <template>
        <b-button size="sm" class="mr-1">
          <font-awesome-icon icon="trash" size="sm"/>
        </b-button>
        <b-button size="sm" class="mr-1">
          <font-awesome-icon icon="edit" size="sm"/>
        </b-button>
        <b-button size="sm" class="mr-1">
          <font-awesome-icon icon="eye" size="sm"/>kkk
        </b-button>
      </template>
    </b-table>
    <!-- Select columns -->
    <SelectColumns :fields="fields" />
  </b-container>
</template>

<script>
import DropdownButton from "./buttons/DropdownButton.vue";
import SelectColumns from "./buttons/SelectColumns.vue";

export default {
  name: "MyTable",
  components: {
    DropdownButton,
    SelectColumns,
  },
  //props: ["items","fields", "role"],
  data: function () {
    return {
      // CURRENT OPTION:
      // currentPage: Trang hiện tại
      currentPage: 1,
      // rowsPerPage: Số dòng hiện trong 1 trang
      rowsPerPage: 30,

      // TEMP
      search: null,
      role: 1,
      sortBy: "name",
      // OPTIONS:
      // rowsPerPageOptions: các option cho số dòng / trang
      rowsPerPageOptions: [30, 50, 100],
      // Các tỉnh/thành phố cho phép chọn: chỉ được xem trong option này
      cities: ["Ha Noi", "Ha Giang", "Can Tho"],
      // Các quận/huyện/thị xã cho phép chọn: chỉ được xem trong option này
      districts: ["Quận 1", "Quận 2", "Quận 3"],
      // Các xã/phường/thị trấn cho phép chọn: chỉ được xem trong option này
      wards: ["Xã 1", "Xã 12", "Xã 15"],
      // Các thôn/xóm/tổ dân phố cho phép chọn: chỉ được xem trong option này
      residentalGroups: ["Thôn 1", "Thôn 2", "Thôn 3"],

      // DATA:
      items: [
        {
          name: "Nguyen Van A",
          birthday: "10/10/1999",
          blood_type: "O",
          gender: "Nam",
          religion: "Không có",
          residental_id: "012322456789",
          city: "TP.HCM",
          district: "Huyện Cần Giờ",
          ward: "Xã Trung An",
          residental_group: "thôn 1",
        },
        {
          name: "Bui Thi C",
          birthday: "01/09/1990",
          blood_type: "A",
          gender: "Nữ",
          religion: "Phật giáo",
          residental_id: "732048204932",
          city: "Quảng Ninh",
          district: "Thành phố Uông Bí",
          ward: "Phường Nam Khê",
          residental_group: "thôn 5",
        },
        {
          name: "Pham Van D",
          birthday: "21/03/1989",
          blood_type: "B",
          gender: "Nam",
          religion: "Tin Lành",
          residental_id: "091238902334",
          city: "Hà Giang",
          district: "Huyện Bắc Mê",
          ward: "Xã Lạc Nông",
          residental_group: "thôn 10",
        },
      ],
      fields: [
        { key: "name", label: "Họ tên", sortable: true },
        { key: "birthday", label: "Ngày sinh", sortable: true },
        { key: "blood_type", label: "Nhóm máu", sortable: true },
        { key: "gender", label: "Giới tính", sortable: true },
        { key: "religion", label: "Tôn giáo", sortable: true },
        { key: "residental_id", label: "CCCD", sortable: true },
        { key: "city", label: "Tỉnh/thành", sortable: true },
        {
          key: "district",
          label: "Quận/huyện/thị xã/tp thuộc tỉnh",
          sortable: true,
        },
        { key: "ward", label: "Xã/phường/thị trấn", sortable: true },
        {
          key: "residental_group",
          label: "Thôn/bản/tổ dân phố",
          sortable: true,
        },
      ],
    };
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
</style>
