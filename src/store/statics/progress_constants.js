const PROGRESS_API = {
    urlAll: "progress",
    urlId: "progress",
    fields: [
        {key: "id", label: "Mã", sortable: true},
        {key: "name", label: "Tên", sortable: true},
        {key: "completed", label: "Đã hoàn thành"},
        {key: "endTime", label: "Hạn cuối", sortable: true},
    ]
}

export const getProgressAPI = function() {
    return PROGRESS_API
}