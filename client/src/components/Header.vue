<template>
    <header>
        <b-navbar toggleable="lg" type="dark">
            <b-navbar-brand to="/">
                <img
                    src="../assets/Logo_mfa-mal-anders-white.png"
                    height="70"
                    alt=""
                />
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item to="/">Stellenanzeigen</b-nav-item>

                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            <em>Account</em>
                        </template>
                        <b-dropdown-item to="/account-an"
                            >AN Profil</b-dropdown-item
                        >
                        <b-dropdown-item to="/account-ag"
                            >AG Profil</b-dropdown-item
                        >
                        <b-dropdown-item to="/admin">Admin</b-dropdown-item>
                        <b-dropdown-item to="/login">Login</b-dropdown-item>
                        <b-dropdown-item to="/register"
                            >Registrieren</b-dropdown-item
                        >
                        <b-dropdown-item>
                            <Logout />
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
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
    }
};
</script>

<style></style>
