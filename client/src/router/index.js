import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
// import store from "@/store";
import { TokenService } from "@/store/services/authToken";

import Home from "@/views/Home.vue";
import Dashboard from "@/views/Dashboard.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {
            public: true
        }
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
            public: false
        }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            public: true,
            onlyWhenLoggedOut: true
        }
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            public: true,
            onlyWhenLoggedOut: true
        }
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

// Check auth before entering routes
router.beforeEach((to, from, next) => {
    const isPublic = to.matched.some(record => record.meta.public);
    const onlyWhenLoggedOut = to.matched.some(
        record => record.meta.onlyWhenLoggedOut
    );

    // const userRole = store.getters.userRole;

    const loggedIn = !!TokenService.getToken();

    if (!isPublic && !loggedIn) {
        return next({
            path: "/login",
            query: { redirect: to.fullPath }
        });
    }

    // if (onlyEmployee && !isEmployee && !isAdmin) {
    //     return next("/");
    // }

    if (loggedIn && onlyWhenLoggedOut) {
        return next("/");
    }

    next();
});

export default router;
