import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import UserBoard from "../views/UserBoard.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/userboard",
        name: "UserBoard",
        component: UserBoard
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/register",
        name: "Register",
        component: Register
    }
];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;
