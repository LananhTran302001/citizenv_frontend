function isEmpty(val) {
    return val == null || val.length == 0;
}

function lengthInRange(val, lower, upper) {
    return val.length >= lower && val.length <= upper;
}

function idFormat(val) {
    return /^[0-9]|(((0[1-9]|[1-9][0-9]))*)$/.test(val);
}

function emailFormat(val) {
    return /\S+@\S+\.\S+/.test(val);
}

export const validateId = function (id) {
    if (
        isEmpty(id) || // Nếu trường id rỗng
        !lengthInRange(id, 1, 8) || // Hoặc nếu độ dài id không nằm trong [1,8]
        id.length % 2 == 1 && // Hoặc nếu độ dài id lẻ 
        id.length != 1 // Và độ dài id không phải 1 (A0, A1 có độ dài id: 1)
    ) {
        return "Id có độ dài chẵn trong khoảng 2-8 ký tự";
    } else if (!idFormat(id)) {
        return "Id chỉ gồm các số và có 2-8 ký tự";
    } else {
        return "";
    }
}

export const validateIdWithLength = function (id, length) {
    if (!id) {
        return "Bạn phải nhập mã (thêm " + length.toString() + " chữ số)";
    } else if (idFormat(id) && id.length == length) {
        return "";
    } else {
        return "Trường này chỉ gồm " + length.toString() +" ký tự số";
    }
}

export const validatePassword = function (password) {
    if (isEmpty(password)) {
        return "Bạn phải nhập mật khẩu";
    } else {
        return "";
    }

    // if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,25}$/.test(this.password)) {
    //   this.msg.password = "";
    // } else {
    //   this.msg.password =
    //     "Mật khẩu phải có độ dài 8-25 ký tự, chỉ gồm chữ và số tiếng anh, có cả chữ và số";
    // }
}

export const validateName = function (name) {
    if (!name) {
        return "Bạn phải nhập tên";
    } else if (/[`~,.<>;':"/[\]|{}()=_+-]/.test(name)) {
        return "Trường này chỉ gồm các ký tự chữ cái và số";
    } else {
        return "";
    }
}

export const validateEmail = function (email) {
    if (emailFormat(email) && lengthInRange(email, 5, 35)) {
        return "";
    } else {
        return "Email phải có độ dài từ 5-35 ký tự ";
    }
}

export const validateCitizenid = function (citizenId) {
    if (isEmpty(citizenId)) {
        return "Bạn phải nhập trường này"
    } else {
        return ""
    }
}



