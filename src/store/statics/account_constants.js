export const ACCOUNT_API = {
    urlAll: "accounts",
    urlId: "accounts",
    fields: [
        { key: "areaId", label: "Mã số", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "startDate", label: "Thời gian bắt đầu", sortable: true },
        { key: "endDate", label: "Thời gian kết thúc", sortable: true },
        { key: "isLocked", label: "Tình trạng", sortable: false }
    ]
}

export const getAccountAPI = function () {
    return ACCOUNT_API
}