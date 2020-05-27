import axios from "@/axios";
import router from "@/router/index";
import { TokenService } from "@/store/services/authToken";

const state = {
    userId: localStorage.getItem("userId") || ""
};

const getters = {
    userId: state => state.userId
};

const actions = {
    async userRegistration({ commit }, data) {
        const response = await axios.post("/api/auth/register", data);
        if (response.data.success) {
            commit("setUserId", response.data.userId);

            TokenService.saveToken(response.data.token);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("role", response.data.role);

            // Set axios Authorization header
            axios.defaults.headers[
                "Authorization"
            ] = `Bearer ${TokenService.getToken()}`;

            router.push({ path: "/dashboard" });
            return { sucess: true };
        } else {
            return { success: false };
        }
    },
    async userLogin({ commit }, data) {
        const response = await axios.post("/api/auth/login", data);

        if (response.data.success) {
            commit("setUserId", response.data.userId);

            TokenService.saveToken(response.data.token);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("role", response.data.role);

            // Set axios Authorization header
            axios.defaults.headers[
                "Authorization"
            ] = `Bearer ${TokenService.getToken()}`;

            router.push({ path: "/dashboard" });
            return { sucess: true };
        } else {
            return { success: false };
        }
    }
};

const mutations = {
    setUserId: (state, userId) => {
        state.userId = userId;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
