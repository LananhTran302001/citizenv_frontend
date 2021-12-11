<template>
    <div class="row d-flex justify-content-center">
        <div class="col-xl-7 col-lg-8 col-md-9 col-11 text-center">
            <h3>BAN CHỈ ĐẠO ĐIỀU TRA DÂN SỐ</h3>
            <h3>PHIẾU ĐIỀU TRA DÂN SỐ </h3>
            <h4>Thông tin trên phiếu điều tra được giữ kín</h4>
            <div class="form-container card">

                <!-- Đây là form -->
                <form class="form-card" onsubmit="event.preventDefault()">
                    <h4>PHIẾU ĐIỀU TRA DÂN SỐ NĂM 2021</h4>


                    <!-- Dòng thứ nhất -->
                    <div class="row justify-content-between row-style text-left">

                        <!-- Phần điền họ -->
                        <div class="form-group col-sm-6 flex-column d-flex"> 
                            <label class="form-control-label px-3">Họ
                                <span class="text-danger"> *</span>
                            </label> 
                            <input type="text" id="first-name-input" onblur="validate(1)">
                        </div>

                        <!-- Phần điền tên -->
                        <div class="form-group col-sm-6 flex-column d-flex"> 
                            <label class="form-control-label px-3">Tên
                                <span class="text-danger"> *</span>
                            </label> 
                            <input type="text" id="last-name-input" onblur="validate(2)"> 
                        </div>
                    </div>


                    <!-- Dòng thứ 2 -->
                    <div class="row justify-content-between row-style text-left">
                        
                        <!-- Phần điền số CCCD -->
                        <div class="form-group col-sm-12 flex-column d-flex"> 
                            <label class="form-control-label px-3">Số CCCD/CMND
                                <span class="text-danger"> *</span>
                            </label> 
                            <div class="form-group col-sm-12 flex-row d-flex">
                                <input type="text" class="residental-id-input"> 
                                <input type="text" class="residental-id-input"> 
                                <input type="text" class="residental-id-input"> 
                                <input type="text" class="residental-id-input"> 
                                <input type="text" class="residental-id-input"> 
                                <input type="text" class="residental-id-input"> 
                                <input type="text" class="residental-id-input"> 
                                <input type="text" class="residental-id-input"> 
                                <input type="text" class="residental-id-input"> 
                                <input type="text" class="residental-id-input"> 
                                <input type="text" class="residental-id-input"> 
                                <input type="text" class="residental-id-input"> 
                            </div>
                        </div>
                    </div>


                    <!-- Dòng thứ 3 -->
                    <div class="row justify-content-between row-style text-left">

                        <!-- Phần điền ngày sinh -->
                        <div class="form-group col-sm-6 flex-column d-flex">
                            <label class="form-control-label px-3" for="birthday-input">Ngày sinh
                                <span class="text-danger"> *</span>
                            </label> 
                            <input type="text" id="birthday-input" onblur="validate(4)"> 
                        </div>

                        <!-- Phần điền giới tính -->
                        <div class="form-group col-sm-6 flex-column d-flex"> 
                            <label class="form-control-label px-3" for="gender-select">Giới tính
                                <span class="text-danger"> *</span>
                            </label> 
                            <select id="gender-select" class="form-control custom-select">
                                <option>Nam</option>
                                <option>Nữ</option>
                                <option>Khác</option>
                            </select>
                        </div>
                    </div>

                    
                    <!-- Dòng thứ 4 -->
                    <div class="row justify-content-between row-style text-left">

                        <!-- Phần điền số diện thoại -->
                        <div class="form-group col-sm-6 flex-column d-flex">
                            <label class="form-control-label px-3" for="phone-input">Số điện thoại
                                <span class="text-danger"> *</span>
                            </label> 
                            <input type="text" id="phone-input" onblur="validate(6)"> 
                        </div>

                        <!-- Phần điền email -->
                        <div class="form-group col-sm-6 flex-column d-flex"> 
                            <label class="form-control-label px-3" for="email-input">Email
                                <span class="text-danger"> *</span>
                            </label> 
                            <input type="text" id="email-input" onblur="validate(7)"> 
                        </div>
                    </div>

                    
                    <!-- Dòng thứ 5 -->
                    <div class="row justify-content-between row-style text-left">
                        
                        <!-- Phần chọn Tỉnh/Thành phố -->
                        <div class="form-group col-sm-7 flex-column d-flex"> 
                            <label class="form-control-label px-3" for="city-select">Tỉnh/Thành phố sinh sống
                                <span class="text-danger"> *</span>
                            </label> 
                            <select id="city-select" class="form-control custom-select">
                                <option>Hà Nội</option>
                            </select>
                        </div>

                        <!-- Phần điền mã Tỉnh/Thành phố -->
                        <div class="form-group col-sm-5 flex-column d-flex"> 
                            <label class="form-control-label px-3" for="city-input">Mã Tỉnh/Thành phố
                            </label> 
                            <input type="text" id="city-input" onblur="validate(8)">
                        </div>
                    </div>

                    
                    <!-- Dòng thứ 6 -->
                    <div class="row justify-content-between row-style text-left">

                        <!-- Phần điền Quận/Huyện/Thị xã -->
                        <div class="form-group col-7 flex-column d-flex"> 
                            <label class="form-control-label px-3" for="district-select">Quận/Huyện/Thị xã/Thành phố thuộc tỉnh
                                <span class="text-danger"> *</span>
                            </label> 
                            <select id="district-select" class="form-control custom-select">
                                <option>Phú Xuyên</option>
                                <option>Quốc Oai</option>
                            </select>
                        </div>

                        <!-- Phần điền mã Quận/Huyện/Thị xã -->
                        <div class="form-group col-sm-5 flex-column d-flex"> 
                            <label class="form-control-label px-3" for="district-input">Mã Quận/Huyện/Thị xã
                            </label> 
                            <input type="text" id="district-input" onblur="validate(9)">
                        </div>
                    </div>

                    
                    <!-- Dòng thứ 7 -->
                    <div class="row justify-content-between row-style text-left">

                        <!-- Phần điền Xã/phường/Thị trấn -->
                        <div class="form-group col-sm-7 flex-column d-flex"> 
                            <label class="form-control-label px-3" for="ward-select">Xã/Phường/Thị trấn
                                <span class="text-danger"> *</span>
                            </label> 
                            <select id="ward-select" class="form-control custom-select">
                                <option>Nam Phong</option>
                            </select>
                        </div>

                        <!-- Phần điền mã Xã/Phường/Thị trấn -->
                        <div class="form-group col-sm-5 flex-column d-flex"> 
                            <label class="form-control-label px-3" for="ward-input">Mã Xã/Phường/Thị trấn
                            </label> 
                            <input type="text" id="ward-input" onblur="validate(10)">
                        </div>
                    </div>

                    
                    <!-- Dòng thứ 8 -->
                    <div class="row justify-content-between row-style text-left">
                        
                        <!-- Phần điền Thôn/Xóm/Bản/Tổ dân phố -->
                        <div class="form-group col-sm-7 flex-column d-flex"> 
                            <label class="form-control-label px-3" for="residental-group-select">Thôn/Xóm/Bản/Tổ dân phố
                                <span class="text-danger"> *</span>
                            </label> 
                            <select id="residental-group-select" class="form-control custom-select">
                                <option>Cổ Châu</option>
                            </select>
                        </div>

                        <!-- Phần điền mã Thôn/Bản/Tổ dân phố -->
                        <div class="form-group col-sm-5 flex-column d-flex"> 
                            <label class="form-control-label px-3" for="residental-group-input">Mã Thôn/Bản/Tổ dân phố
                            </label> 
                            <input type="text" id="residental-group-input" onblur="validate(11)">
                        </div>
                    </div>

                    
                    <!-- Dòng thứ 9 -->
                    <div class="row justify-content-between row-style">
                        <div class="form-group col-12"> 
                            <button type="button" id="submit-btn" class="submit-btn col-12 btn-primary">Nộp</button> 
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row d-flex justify-content-center">
            <button type="button" id="preview-btn" class="btn-primary">Xem kết quả</button>
            <button type="button" id="print-btn" class="btn-primary">In phiếu</button>
        </div>
    </div>
</template>

<style scoped>
#form {
    z-index: 4;
    width: 100vw;
}

#form .card {
    padding: 30px 40px;
    margin-top: 60px;
    margin-bottom: 60px;
    border: none !important;
    box-shadow: 0 6px 12px 0 rgba(0, 0, 0, 0.2)
}


#form .row-style {
    margin-top: 15px;
    margin-bottom: 15px;
}

#form .blue-text {
    color: #00BCD4
}

#form .form-control-label {
    margin-bottom: 0
}

#form input,
#form textarea,
#form select,
#form button {
    padding: 8px 15px;
    border-radius: 5px !important;
    margin: 5px 0px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    font-size: 18px !important;
    font-weight: 300
}

#form input:focus,
#form textarea:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: 1px solid #00BCD4;
    outline-width: 0;
    font-weight: 400
}

#form .form-group label {
    text-align: left;
}

#form .residental-id-input {
    text-align: center;
    width:8%;
    min-width: 35px;
    margin-left: 5px;
    margin-right: 5px;
    background-color: azure;
}

#form .submit-btn {
    font-size: 15px !important;
    font-weight: 400;
    height: 43px;
    cursor: pointer
}

#form .submit-btn:hover {
    color: #fff !important
}

#form button:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    outline-width: 0
}
</style>