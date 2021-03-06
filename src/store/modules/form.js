import { messageFormat } from "../statics/messages"
import { getCitizenAPI } from "../statics/citizen_constants"
import axios from "axios"

const Form = {
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
        submitForm({ commit }, data) {
            const API = getCitizenAPI();
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            // Chỉ in ra để xem
            console.log(data.citizen)
            let url = `${API.urlId}/${data.id}`
            console.log(url)
            axios
                .post(
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
                    if (err.response.status == 401) {
                        commit("resetToken", "", { root: true })
                    }
                });
        },

        downloadForm({ commit }) {
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            axios
                .get('file', { responseType: "arraybuffer", headers: headers })
                .then((response) => {
                    let blob = new Blob([response.data], { type: "application/pdf" }),
                        url = window.URL.createObjectURL(blob);
                    window.open(url);
                })
                .catch((err) => {
                    if (err.response.status == 401) {
                        commit("resetToken", "", { root: true })
                    }
                });

        }
    }
}

export default Form;