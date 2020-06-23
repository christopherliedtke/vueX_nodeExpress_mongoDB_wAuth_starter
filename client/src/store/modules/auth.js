import axios from "@/axios";
import router from "@/router/index";

const state = {
    userId: localStorage.getItem("userId") || null,
    userRole: localStorage.getItem("userRole") || null,
    userStatus: localStorage.getItem("userStatus") || null
};

const getters = {
    userId: state => state.userId,
    userRole: state => state.userRole,
    userStatus: state => state.userStatus
};

const actions = {
    async userAuth({ commit }, data) {
        const response = await axios.post(data.url, data.userData);

        if (response.data.success) {
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("userRole", response.data.userRole);
            localStorage.setItem("userStatus", response.data.userStatus);
            commit("setUserId", response.data.userId);
            commit("setUserRole", response.data.userRole);
            commit("setUserStatus", response.data.userStatus);

            // Manage redirect after auth
            const redirectQuery = router.history.current.query.redirect;
            let redirectPath = "/dashboard";

            // catch undefined error -> no harm, no display
            router
                .push({ path: redirectQuery || redirectPath })
                .catch(err => err);

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
    },
    setUserStatus: (state, userStatus) => {
        state.userStatus = userStatus;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
