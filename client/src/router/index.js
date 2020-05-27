import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import VueCookies from "vue-cookies";
Vue.use(VueCookies);

import Home from "@/views/Home.vue";
import UserBoard from "@/views/UserBoard.vue";
import Admin from "@/views/Admin.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/dashboard",
        name: "UserBoard",
        component: UserBoard,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/admin",
        name: "Admin",
        component: Admin,
        meta: {
            requiresAuth: true,
            is_admin: true
        }
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            guest: true
        }
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            guest: true
        }
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;
