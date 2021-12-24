const OPTIONS = {
    GENDER: ["Nam", "Nữ"],
    MARRIAGE: ["Đã kết hôn", "Chưa kết hôn", "Ly hôn"],
    EDUCATION: [
        "0/10", "1/10", "2/10", "3/10", "4/10",
        "5/10", "6/10", "7/10", "8/10", "9/10",
        "10/10", "0/12", "1/12", "2/12", "3/12",
        "4/12", "5/12", "6/12", "7/12", "8/12",
        "9/12", "10/12", "11/12", "12/12"
    ]
}

export const getGenderOptions = function () {
    return OPTIONS.GENDER
}

export const getMarriageOptions = function () {
    return OPTIONS.MARRIAGE
}

export const getEducationOption = function () {
    return OPTIONS.EDUCATION
}