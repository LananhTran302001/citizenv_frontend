import axios from "axios"
import { messageFormat } from "../statics/messages"
import { getAnalyticsAPI } from "../statics/analytics_constants"

const Analytics = {
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
        deleteArea({ commit }, data) {
            const API = getAnalyticsAPI(data.role);
            const headers = {
                Authorization: `Bearer ${localStorage.token}`,
            };
            const url = `${API.urlId}/${data.area.id}`;
            console.log(url)
            axios
                .delete(url, { headers: headers })
                .then((res) => {
                    if (res.status == 200) {
                        console.log(res.data.message);
                        commit("setServerMsg",
                            {
                                title: "Thông báo",
                                content: res.data.message,
                                status: res.status
                            }
                        )
                    }
                    console.log("-------------------");
                })
                .catch((err) => {
                    console.log("-------------------");
                    commit("setServerMsg",
                        {
                            title: "Thông báo",
                            content: err.response.data.message,
                            status: err.response.status
                        }
                    )
                });
        },

    }
}

export default Analytics;
