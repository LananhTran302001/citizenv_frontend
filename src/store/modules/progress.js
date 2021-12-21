const Progress = {
    namespaced: true,
    state: () => ({
        serverMsg: {
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
            state.serverMsg = payload
        }
    },

}

export default Progress