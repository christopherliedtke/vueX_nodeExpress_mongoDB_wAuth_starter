<template>
    <header>
        <b-navbar toggleable="lg" type="dark">
            <b-navbar-brand to="/">
                <!-- <img src="../assets/logo.png" height="70" alt="" /> -->
                <h2>BRAND</h2>
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
                    <Logout v-if="userId" />

                    <!-- <b-nav-item-dropdown right>
                        <template v-slot:button-content>
                            <em>Account</em>
                        </template>
                        <b-dropdown-item to="/dashboard"
                            >Dashboard</b-dropdown-item
                        >
                        <b-dropdown-item to="/login">Login</b-dropdown-item>
                        <b-dropdown-item to="/register"
                            >Registrieren</b-dropdown-item
                        >
                        <b-dropdown-item>
                            <Logout />
                        </b-dropdown-item>
                    </b-nav-item-dropdown> -->
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

<style></style>
