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
            console.log("đây là server message")
            console.log(state.serverMsg)
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
            console.log("Đây là progress")
            console.log(progress)
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
                    console.log(err.response.data.msg);
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
                    console.log(err.response.data.msg);
                });
        }
    }

}

export default Progress