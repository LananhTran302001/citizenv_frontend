const PROGRESS_API = {
    urlAll: "progress",
    urlId: "",
    fields: [
        {key: "id", label: "Mã", sortable: true},
        {key: "name", label: "Tên", sortable: true},
        {key: "progress", label: "Hoàn thành", sortable: true},
    ]
}

export const getProgressAPI = function() {
    return PROGRESS_API
}