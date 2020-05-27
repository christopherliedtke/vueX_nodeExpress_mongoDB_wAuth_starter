import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import { TokenService } from "@/store/services/authToken";

import Home from "@/views/Home.vue";
import UserBoard from "@/views/UserBoard.vue";
import Admin from "@/views/Admin.vue";
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
        name: "UserBoard",
        component: UserBoard,
        meta: {
            public: false
        }
    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin,
        meta: {
            public: false,
            onlyAdmin: true
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

router.beforeEach((to, from, next) => {
    const isPublic = to.matched.some(record => record.meta.public);
    const onlyWhenLoggedOut = to.matched.some(
        record => record.meta.onlyWhenLoggedOut
    );
    const onlyAdmin = to.matched.some(record => record.meta.onlyAdmin);

    const loggedIn = !!TokenService.getToken();
    const isAdmin = localStorage.getItem("role") === "admin";

    if (!isPublic && !loggedIn) {
        return next({
            path: "/login",
            query: { redirect: to.fullPath } // Store the full path to redirect the user to after login
        });
    }

    if (onlyAdmin && !isAdmin) {
        return next("/");
    }

    // Do not allow user to visit login page or register page if they are logged in
    if (loggedIn && onlyWhenLoggedOut) {
        return next("/");
    }

    next();
});

export default router;
