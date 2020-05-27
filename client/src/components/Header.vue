<template>
    <header>
        <div class="container">
            <router-link to="/"
                ><img src="../assets/Logo_mfa-mal-anders-white.png" alt=""
            /></router-link>
            <nav>
                <router-link to="/">Stellenanzeigen</router-link>
                <router-link to="/account-an">Mein Profil AN</router-link>
                <router-link to="/account-ag">Mein Profil AG</router-link>
                <router-link to="/admin">Admin</router-link>
                <router-link to="/login">Login</router-link>
                <router-link to="/register">Registrieren</router-link>
                <Logout />
            </nav>
        </div>
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
