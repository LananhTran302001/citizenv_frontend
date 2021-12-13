const User = {
    state: () => ({
        user: {
            user_name: null,
            user_id: null,
            user_email: null,
            start_time: null,
            expired_time: null
        },
        loginData: {
            user_id: "",
            password: "",

        },
        forgotPasswordData: {
            user_id: "",
            user_email: ""
        },
        changePasswordData: {
            old_password: "",
            new_password: "",
            confirm_password: ""
        },
        errors: {
            empty_user_id: false,
            empty_password: false,
            empty_user_email: false,
            empty_new_password: false,
            empty_confirm_password: false,
            invalid_user_id: false,
            invalid_user_email: false,
            not_authorised: false,
            same_password: false,
        }

    }),
    getters: {
        getUser: (state) => state.user,
        getLoginData: (state) => state.loginData,
        getForgotPwData: (state) => state.forgotPasswordData,
        getChangePwData: (state) => state.changePasswordData,
        getErrors: (state) => state.errors
    },

    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setLoginData(state, payload) {
            state.loginData = payload
            console.log('set login data')
            console.log(state.loginData)
        },
        setForgotPwData(state, payload) {
            state.forgotPasswordData = payload
        },
        resetLoginData(state) {
            state.loginData = {
                user_id: "",
                password: "",
            };
        },
        resetForgotPwData(state) {
            state.forgotPasswordData = {
                user_id: "",
                user_email: ""
            };
        },
        resetChangePwData(state) {
            state.changePasswordData = {
                old_password: "",
                new_password: "",
                confirm_password: ""
            }
        },
        resetErrors(state) {
            state.errors = {
                empty_username: false,
                empty_password: false,
                empty_new_password: false,
                invalid_username: false,
                not_authorised: false,
                already_exists: false,
                same_password: false,
            };
        },
        setErrors(state, payload) {
            state.errors[payload] = true;
        },
    },

    actions: {
        validateLoginData() {
            // let allowedChars = /^[0-9a-zA-Z_.-]+$/;

			// commit("resetErrors");
			// commit("setSubmitIsValid", true);

			// if (!state.loginData.username) {
			// 	commit("setErrors", "empty_username");
			// 	commit("setSubmitIsValid", false);
			// } else if (!allowedChars.test(state.loginData.username)) {
			// 	commit("setErrors", "invalid_username");
			// 	commit("setSubmitIsValid", false);
			// }
			// if (!state.loginData.password) {
			// 	commit("setErrors", "empty_password");
			// 	commit("setSubmitIsValid", false);
			// }
            console.log("validating...")
		},
        login() {
            console.log("Login...")
        },
        sendEmail() {
            console.log("send email...")
        }
    }
}

export default User;