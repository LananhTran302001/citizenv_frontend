<template>
  <b-container class="container-style">
    <form class="form-style">

      <!-- Chọn thôn nhập -->
      <b-row class="first-row-style">
        <b-col cols="10">
          <b-form-group
          label="Thôn nhập liệu:"
          label-cols-xs="6"
          label-cols-sm="5"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right" 
          >
            <b-form-select :options="groupOptions"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Hàng đầu tiên: Họ và tên, giới tính, ngày sinh -->
      <b-row>
        <b-col cols="4">
          <b-form-group label="Họ và tên">
            <b-form-input placeholder="Nhập họ và tên"> </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Giới tính">
            <b-form-select :options="genderOptions"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Ngày sinh">
            <b-form-datepicker
              :date-format-options="{
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                weekday: 'short',
              }"
            ></b-form-datepicker>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Hàng thứ 2: Số căn cước công dân -->
      <b-row>
        <b-col cols="12">
          <b-form-group label="Số căn cước công dân">
            <b-row>
              <b-col cols="1">
                <b-form-input></b-form-input>
              </b-col>
              <b-col cols="1">
                <b-form-input></b-form-input>
              </b-col>
              <b-col cols="1">
                <b-form-input></b-form-input>
              </b-col>
              <b-col cols="1">
                <b-form-input></b-form-input>
              </b-col>
              <b-col cols="1">
                <b-form-input></b-form-input>
              </b-col>
              <b-col cols="1">
                <b-form-input></b-form-input>
              </b-col>
              <b-col cols="1">
                <b-form-input></b-form-input>
              </b-col>
              <b-col cols="1">
                <b-form-input></b-form-input>
              </b-col>
              <b-col cols="1">
                <b-form-input></b-form-input>
              </b-col>
              <b-col cols="1">
                <b-form-input></b-form-input>
              </b-col>
              <b-col cols="1">
                <b-form-input></b-form-input>
              </b-col>
              <b-col cols="1">
                <b-form-input></b-form-input>
              </b-col>
            </b-row>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Hàng 3: Dân tộc, tôn giáo, tình trạng hôn nhân -->
      <b-row>
        <b-col cols="4">
          <b-form-group label="Dân tộc">
            <b-form-input placeholder="Nhập dân tộc"> </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Tôn giáo">
            <b-form-input placeholder="Nhập tôn giáo"> </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Tình trạng hôn nhân">
            <b-form-select :options="marriageOptions"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Dòng thứ 4: Tình trạng học vấn và nghề nghiệp hiện tại -->
      <b-row>
        <b-col cols="4">
          <b-form-group label="Tình trạng học vấn">
            <b-form-select :options="educationLevels"></b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="8">
          <b-form-group label="Nghề nghiệp hiện tại">
            <b-form-input placeholder="Nhập nghề nghiệp hiện tại">
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Dòng thứ 5 và 6: Địa chỉ thường trú -->
      <b-row>
        <b-col cols="12">
          <h5>Địa chỉ thường trú</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <b-form-group label="Số nhà, phố">
            <b-form-input> </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Thôn/bản/tổ dân phố">
            <b-form-input> </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Xã/phường">
            <b-form-input> </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4">
          <b-form-group label="Quận/huyện">
            <b-form-input> </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Tỉnh/thành phố">
            <b-form-input> </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <!-- Dòng thứ 6: Địa chỉ tạm trú -->
      <b-row>
        <b-col cols="12">
          <h5>Địa chỉ tạm trú</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="4">
          <b-form-group label="Số nhà, phố">
            <b-form-input> </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Thôn/bản/tổ dân phố">
            <b-form-input> </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Xã/phường">
            <b-form-input> </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="4">
          <b-form-group label="Quận/huyện">
            <b-form-input> </b-form-input>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Tỉnh/thành phố">
            <b-form-input> </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
    </form>
  </b-container>
</template>

<script>
export default {
  name: "CencusForm",

  data() {
    return {
      groupOptions: ["Thôn 1", "Thôn 2", "Thôn 3", "Thôn 4", "Thôn 5"],
      genderOptions: ["Nam", "Nữ"],
      marriageOptions: ["Đã kết hôn", "Chưa kết hôn", "Ly hôn"],
      educationLevels: [
        "0/10",
        "1/10",
        "2/10",
        "3/10",
        "4/10",
        "5/10",
        "6/10",
        "7/10",
        "8/10",
        "9/10",
        "10/10",
        "0/12",
        "1/12",
        "2/12",
        "3/12",
        "4/12",
        "5/12",
        "6/12",
        "7/12",
        "8/12",
        "9/12",
        "10/12",
        "11/12",
        "12/12",
      ],
    };
  },
};
</script>

<style scoped>
.form-style {
  margin: 0px;
  padding: 30px;
}

.container-style {
  margin: 100px;
}
</style>
