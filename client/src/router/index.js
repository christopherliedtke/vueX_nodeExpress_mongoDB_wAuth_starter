import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import store from "@/store";
import { TokenService } from "@/store/services/authToken";

import Home from "@/views/Home.vue";
import Employee from "@/views/Employee.vue";
import Employer from "@/views/Employer.vue";
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
        path: "/account-an",
        name: "Employee",
        component: Employee,
        meta: {
            public: false,
            onlyEmployee: true
        }
    },
    {
        path: "/account-ag",
        name: "Employer",
        component: Employer,
        meta: {
            public: false,
            onlyEmployer: true
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

// Check auth before entering routes
router.beforeEach((to, from, next) => {
    const isPublic = to.matched.some(record => record.meta.public);
    const onlyWhenLoggedOut = to.matched.some(
        record => record.meta.onlyWhenLoggedOut
    );
    const onlyAdmin = to.matched.some(record => record.meta.onlyAdmin);
    const onlyEmployee = to.matched.some(record => record.meta.onlyEmployee);
    const onlyEmployer = to.matched.some(record => record.meta.onlyEmployer);

    const userRole = store.getters.userRole;

    const loggedIn = !!TokenService.getToken();
    const isAdmin = userRole === "admin";
    const isEmployee = userRole === "employee";
    const isEmployer = userRole === "employer";

    if (!isPublic && !loggedIn) {
        return next({
            path: "/login",
            query: { redirect: to.fullPath }
        });
    }

    if (onlyEmployee && !isEmployee && !isAdmin) {
        return next("/");
    }

    if (onlyEmployer && !isEmployer && !isAdmin) {
        return next("/");
    }

    if (onlyAdmin && !isAdmin) {
        return next("/");
    }

    if (loggedIn && onlyWhenLoggedOut) {
        return next("/");
    }

    next();
});

export default router;
