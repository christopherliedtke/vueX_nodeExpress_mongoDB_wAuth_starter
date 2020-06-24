<template>
    <header class="py-2" id="header">
        <b-navbar toggleable="lg" type="dark">
            <b-navbar-brand to="/">
                <!-- <img src="../assets/logo.png" height="70" alt="" /> -->
                <h2 class="m-0">BRAND</h2>
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item to="/">Home</b-nav-item>
                    <b-nav-item to="/login" v-if="!userId">Login</b-nav-item>
                    <b-nav-item to="/register" v-if="!userId"
                        >Register</b-nav-item
                    >
                    <b-nav-item to="/dashboard" v-if="userId"
                        >Dashboard</b-nav-item
                    >
                    <b-nav-item to="/account" v-if="userId"
                        ><b-icon
                            class="mr-1"
                            icon="person-circle"
                            font-scale="1.4"
                        ></b-icon
                        >Account</b-nav-item
                    >
                    <b-nav-item v-if="userId"><Logout /></b-nav-item>
                    <!-- <Logout v-if="userId" /> -->
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </header>
</template>

<script>
import Logout from "@/components/Logout";
export default {
    name: "Header",
    components: {
        Logout
    },
    computed: {
        userId() {
            return this.$store.state.auth.userId;
        }
    }
};
</script>

<style scoped lang="scss">
.router-link-exact-active {
    color: rgba(255, 255, 255, 0.75) !important;
}
</style>
