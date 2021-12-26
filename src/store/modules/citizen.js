import { messageFormat } from "../statics/messages"
import { getCitizenAPI } from "../statics/citizen_constants"
import FileSaver from "file-saver"
import axios from "axios"

const Citizen = {
    namespaced: true,
    state: () => ({
        serverMsg: {
            id: 0,
            title: "",
            content: "",
            varient: "info"
        }
    }),

    getters: {
        getServerMsg: (state) => state.serverMsg
    },

    mutations: {
        setServerMsg(state, payload) {
            state.serverMsg = messageFormat(
                state.serverMsg.id + 1,
                payload.title,
                payload.content,
                payload.status
            )
            console.log("đây là server message")
            console.log(state.serverMsg)
        }
    },

    actions: {
        deleteCitizen({ commit }, data) {
            const API = getCitizenAPI();
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            // Chỉ in ra để xem
            console.log("Đây là data người dân bị xóa")
            console.log(data.citizen)
            let url = `${API.urlId}/${data.citizen.CCCD}`
            console.log(url)
            axios
                .delete(
                    url,
                    { headers: headers }
                )
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res);
                        commit("setServerMsg",
                            {
                                title: "Thông báo",
                                content: res.data.msg,
                                status: res.status
                            }
                        )

                    }
                })
                .catch((err) => {
                    commit("setServerMsg",
                        {
                            title: "Thông báo",
                            content: err.response.data.msg,
                            status: err.response.status
                        }
                    )
                });
        },

        updateCitizen({ commit }, data) {
            const API = getCitizenAPI();
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            // Chỉ in ra để xem
            console.log("Đây là data người dân cập nhật")
            console.log(data.citizen)
            let url = `${API.urlId}/${data.citizen.CCCD}`
            console.log(url)
            axios
                .put(
                    url,
                    data.citizen,
                    { headers: headers }
                )
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res);
                        commit("setServerMsg",
                            {
                                title: "Thông báo",
                                content: res.data.msg,
                                status: res.status
                            }
                        )

                    }
                    console.log(res.data.msg);
                    console.log("-------------------");
                })
                .catch((err) => {
                    commit("setServerMsg",
                        {
                            title: "Thông báo",
                            content: err.response.data.msg,
                            status: err.response.status
                        }
                    )
                });
        },


        downloadExcel() {
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            axios
                .get('excel', {
                    responseType: 'blob',
                    headers: headers ,
                })
                .then((response) => {
                //     let blob = new Blob([response.data], { type: "application/vnd.ms-excel" }),
                //         url = window.URL.createObjectURL(blob);
                //     window.open(url);
                        FileSaver.saveAs(response.data, "dan so.xls")
                });

        }
    }

}

export default Citizen;