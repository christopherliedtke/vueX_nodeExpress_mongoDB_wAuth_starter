import axios from "@/axios";
import router from "@/router/index";
import jwt_decode from "jwt-decode";
import { TokenService } from "@/store/services/authToken";

const state = {
    userId: TokenService.getToken()
        ? jwt_decode(TokenService.getToken()).userId
        : null,
    userRole: TokenService.getToken()
        ? jwt_decode(TokenService.getToken()).userRole
        : null
};

const getters = {
    userId: state => state.userId,
    userRole: state => state.userRole
};

const actions = {
    async userAuth({ commit }, data) {
        const response = await axios.post(data.url, data.userData);

        if (response.data.success) {
            // Set Token
            TokenService.saveToken(response.data.token);
            commit("setUserId", jwt_decode(TokenService.getToken()).userId);
            commit("setUserRole", jwt_decode(TokenService.getToken()).userRole);

            // Set axios Authorization header
            axios.defaults.headers[
                "Authorization"
            ] = `Bearer ${TokenService.getToken()}`;

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
