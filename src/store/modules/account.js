import axios from "axios"
import { getAccountAPI } from "../statics/account_constants";
import { messageFormat } from "../statics/messages";

const Account = {
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

        deleteAccount({ commit }, account) {
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            const API = getAccountAPI()
            const url = `${API.urlId}/${account.id}`;
            axios
                .delete(url, { headers: headers })
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res.data.message);
                        // Hiện thông báo success
                        commit("setServerMsg",
                            {
                                title: "Thông báo",
                                content: res.data.Message,
                                status: res.status
                            }
                        )
                    }
                    console.log("-------------------");
                })
                .catch((err) => {

                    // Hiện lỗi
                    commit("setServerMsg",
                        {
                            title: "Thông báo",
                            content: err.response.data.message,
                            status: err.response.status
                        }
                    )
                    console.log(err);
                });
        },

        addAccount({ commit }, account) {
            const API = getAccountAPI()
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            axios
                .post(
                    API.urlId,
                    { id: account.id, email: account.email },
                    { headers: headers }
                )
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res.data.message);
                        // Hiện thông báo success
                        commit("setServerMsg",
                            {
                                title: "Thông báo",
                                content: res.data.Message,
                                status: res.status
                            }
                        )
                    }
                    console.log("-------------------");
                })
                .catch((err) => {
                    console.log("-------------------");
                    // Hiện lỗi
                    commit("setServerMsg",
                        {
                            title: "Thông báo",
                            content: err.response.data.message,
                            status: err.response.status
                        }
                    )
                    console.log(err);
                });
        },

    }
}

export default Account;