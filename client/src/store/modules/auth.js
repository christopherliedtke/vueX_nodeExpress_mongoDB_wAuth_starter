import axios from "../../axios";
import router from "@/router/index";

const state = {
    user: {}
};

const getters = {
    user: state => state.user
};

const actions = {
    async userRegistration({ commit }, data) {
        const response = await axios.post("/api/auth/register", data);
        if (response.data.success) {
            commit("setUser", response.data.user);
            router.push({ path: "/userboard" });
            return { sucess: true };
        } else {
            return { success: false };
        }
    },
    async userLogin({ commit }, data) {
        const response = await axios.post("/api/auth/login", data);
        if (response.data.success) {
            commit("setUser", response.data.user);
            router.push({ path: "/userboard" });
            console.log(true);
            return { sucess: true };
        } else {
            console.log(false);
            return { success: false };
        }
    }
};

const mutations = {
    setUser: (state, user) => {
        state.user = user;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
