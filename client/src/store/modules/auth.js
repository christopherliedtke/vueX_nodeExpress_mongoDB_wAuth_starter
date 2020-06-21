import axios from "@/axios";
import router from "@/router/index";

const state = {
    userId: localStorage.getItem("userId") || null,
    userRole: localStorage.getItem("userRole") || null
};

const getters = {
    userId: state => state.userId,
    userRole: state => state.userRole
};

const actions = {
    async userAuth({ commit }, data) {
        const response = await axios.post(data.url, data.userData);

        if (response.data.success) {
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("userRole", response.data.userRole);
            commit("setUserId", response.data.userId);
            commit("setUserRole", response.data.userRole);

            // Manage redirect after auth
            const redirectQuery = router.history.current.query.redirect;
            let redirectPath = "/dashboard";

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
