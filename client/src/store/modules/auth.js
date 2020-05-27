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
    async userRegistration({ commit }, data) {
        const response = await axios.post("/api/auth/register", data);

        if (response.data.success) {
            commit("setUserId", response.data.userId);
            commit("setUserRole", response.data.role);

            TokenService.saveToken(response.data.token);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("userRole", response.data.role);

            // Set axios Authorization header
            axios.defaults.headers[
                "Authorization"
            ] = `Bearer ${TokenService.getToken()}`;

            let redirectPath;
            if (response.data.role === "employee") {
                redirectPath = "/account-an";
            } else if (response.data.role === "employee") {
                redirectPath = "/account-ag";
            } else if (response.data.role === "admin") {
                redirectPath = "/admin";
            }

            router.push({ path: redirectPath });
            return { sucess: true };
        } else {
            return { success: false };
        }
    },
    async userLogin({ commit }, data) {
        const response = await axios.post("/api/auth/login", data);

        if (response.data.success) {
            commit("setUserId", response.data.userId);
            commit("setUserRole", response.data.role);

            TokenService.saveToken(response.data.token);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("userRole", response.data.role);

            // Set axios Authorization header
            axios.defaults.headers[
                "Authorization"
            ] = `Bearer ${TokenService.getToken()}`;

            let redirectPath;
            if (response.data.role === "employee") {
                redirectPath = "/account-an";
            } else if (response.data.role === "employee") {
                redirectPath = "/account-ag";
            } else if (response.data.role === "admin") {
                redirectPath = "/admin";
            }

            router.push({ path: redirectPath });
            return { sucess: true };
        } else {
            return { success: false };
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
