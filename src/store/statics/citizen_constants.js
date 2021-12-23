const CITIZEN = {
    urlAll: "citizens",
    urlId: "citizens",
    fields: [
        {key: "name", label: "Họ và tên", sortable: true},
        {key: "CCCD", label: "CCCD", sortable: true},
        {key: "DOB", label: "Ngày sinh", sortable: true},
        {key: "sex", label: "Giới tính", sortable: true},
        {key: "maritalStatus", label: "Tình trạng hôn nhân"},
        {key: "nation", label: "Dân tộc", sortable: true},
        // {key: "religion", label: "Tôn giáo", sortable: true},
        // {key: "permanentResidence", label: "Địa chỉ thường trú", sortable: true},
        // {key: "temporaryResidence", label: "Địa chỉ tạm trú", sortable: true},
        {key: "educationalLevel", label: "Học vấn", sortable: true},
        {key: "job", label: "Nghề nghiệp", sortable: true},
    ]
}

export const getCitizenAPI = function (role) {
    console.log(role)
    console.log("in ra cho đỡ vo dụng")
    return CITIZEN
};