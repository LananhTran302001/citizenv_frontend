<template>
    <b-container fluid class="container-style">
        <!-- User interface control -->
        <b-row>
            <!-- Search bar -->
            <b-col
            xs="10"
            sm="10" 
            md="6"
            lg="6" 
            class="my-1"
            >
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
                        placeholder="Nhập để tìm kiếm">
                        </b-form-input>
                        <!-- Nút Clear -->
                        <b-input-group-append>
                            <b-button>Clear</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </b-form-group>
            </b-col>

            <!-- Rows per page -->
            <b-col 
            xs="10"
            sm="10" 
            md="6"
            lg="6" 
            class="my-1"
            >
                <DropdownButton 
                title="Số dòng/trang" 
                :xs="12" :sm="4" :md="5" :lg="3" 
                :options="rowsPerPageOptions"
                v-model="rowsPerPage"
                />
            </b-col>
        </b-row>
        <!-- Filter -->
        <b-row>

            <b-col
            xs="12"
            sm="12"
            md="6" 
            lg="3" 
            class="my-1"
            >
                <!-- Chọn tỉnh thành: A1: role = 1 -->
                <DropdownButton title="Tỉnh/thành" 
                :xs="12" :sm="4" :md="5" :lg="4" 
                :options="cities"
                v-if="role == 1"
                />
            </b-col>

            <b-col
            xs="12"
            sm="12"
            md="6" 
            lg="3" 
            class="my-1"
            >
                <!-- Chọn quận/huyện/thị xã: A1, A2: role = 1,2 -->
                <DropdownButton title="Quận/huyện/thị xã" 
                :xs="12" :sm="4" :md="5" :lg="5" 
                :options="districts"
                v-if="role > 0 && role < 3" 
                />
            </b-col>
            <b-col
            xs="12"
            sm="12"
            md="6" 
            lg="3" 
            class="my-1"
            >
                <!-- Chọn xã/phường/thị trấn: A1, A2, A3: role = 1,2,3 -->
                <DropdownButton title="Xã/phường/thị trấn" 
                :xs="12" :sm="4" :md="5" :lg="6" 
                :options="wards"
                v-if="role > 0 && role < 4"
                /></b-col>
            <b-col
            xs="12"
            sm="12"
            md="6" 
            lg="3" 
            class="my-1"
            >
                <!-- Chọn thôn/xóm/bản/tổ dân phố: A1, A2, A3, B1=A4: role = 1,2,3,4 -->
                <DropdownButton title="Thôn/bản/tổ dân phố" 
                :xs="12" :sm="4" :md="5" :lg="6" 
                :options="residentalGroups"
                v-if="role > 0 && role < 5"
                />
            </b-col>
        </b-row>
        <!-- Main table -->
        <b-table>

        </b-table>
    </b-container>
</template>

<script>

import DropdownButton from "./buttons/DropdownButton.vue"

export default {
    name:"MyTable",
    components: {
        DropdownButton
    },
    props: ["items","fields", "role"],
    data: function() {
        return {
            // CURRENT OPTION:
            // currentPage: Trang hiện tại
            currentPage: 1,
            // rowsPerPage: Số dòng hiện trong 1 trang
            rowsPerPage: 30,

            // OPTIONS:
            // rowsPerPageOptions: các option cho số dòng / trang
            rowsPerPageOptions:[30, 50, 100],
            // Các tỉnh/thành phố cho phép chọn: chỉ được xem trong option này
            cities:["Ha Noi", "Ha Giang", "Can Tho"],
            // Các quận/huyện/thị xã cho phép chọn: chỉ được xem trong option này
            districts:["Quận 1", "Quận 2", "Quận 3"],
            // Các xã/phường/thị trấn cho phép chọn: chỉ được xem trong option này
            wards:["Xã 1", "Xã 12", "Xã 15"],
            // Các thôn/xóm/tổ dân phố cho phép chọn: chỉ được xem trong option này
            residentalGroups:["Thôn 1", "Thôn 2", "Thôn 3"]
        }
    }
}
</script>

<style scoped>
.container-style {
    padding: 15px;
}
</style>