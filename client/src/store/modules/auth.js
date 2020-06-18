import axios from "@/axios";
import router from "@/router/index";
import { TokenService } from "@/store/services/authToken";

const state = {
    userId: localStorage.getItem("userId") || "",
    userRole: localStorage.getItem("userRole") || ""
};

const getters = {
    userId: state => state.userId,
    userRole: state => state.userRole
};

const actions = {
    async userAuth({ commit }, data) {
        console.log("data: ", data);
        console.log("data.url: ", data.url);

        const response = await axios.post(data.url, data.userData);

        if (response.data.success) {
            commit("setUserId", response.data.userId);
            commit("setUserRole", response.data.role);

            // Set token and localStorage
            TokenService.saveToken(response.data.token);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("userRole", response.data.role);

            // Set axios Authorization header
            axios.defaults.headers[
                "Authorization"
            ] = `Bearer ${TokenService.getToken()}`;

            // Manage redirect after auth
            const redirectQuery = router.history.current.query.redirect;

            let redirectPath = "/dashboard";
            // if (response.data.role === "employee") {
            //     redirectPath = "/account-an";
            // } else if (response.data.role === "employee") {
            //     redirectPath = "/account-ag";
            // } else if (response.data.role === "admin") {
            //     redirectPath = "/admin";
            // }

            router.push({ path: redirectQuery || redirectPath });
            return { sucess: true };
        } else {
            return response.data;
        }
    }
};

const mutations = {
    setUserId: (state, userId) => {
        state.userId = userId;
    },
    setUserRole: (state, userRole) => {
        state.userRole = userRole;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
