import { getProgressAPI } from "../statics/progress_constants"
import { messageFormat } from "../statics/messages"
import axios from "axios";

const Progress = {
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
        }
    },


    actions: {
        commitCompleted({ commit }, data) {
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            const API = getProgressAPI(data.role);
            const progress = {
                completed: data.progress
            }
            axios
                .put(
                    API.urlId,
                    progress,
                    { headers: headers }
                )
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res);
                    }
                    commit("setServerMsg",
                        {
                            title: "Thông báo",
                            content: res.data.msg,
                            status: res.status
                        }
                    )
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

        sendEmail({ commit }, data) {
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            const API = getProgressAPI(data.role);
            console.log(headers)
            let url = API.urlSendEmail;
            url = `${url}/${data.account.id}`
            axios
                .post(
                    url, {},
                    { headers: headers }
                )
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res);
                    }
                    commit("setServerMsg",
                        {
                            title: "Thông báo",
                            content: res.data.msg,
                            status: res.status
                        }
                    )
                    console.log("-------------------");
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
                    console.log(err.response.data.msg);
                });
        }
    }

}

export default Progress