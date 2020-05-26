<template>
    <header>
        <div class="container">
            <router-link to="/"
                ><img src="../assets/Logo_mfa-mal-anders-white.png" alt=""
            /></router-link>
            <nav>
                <router-link to="/">Stellenanzeigen</router-link>
                <router-link to="/userboard">UserBoard</router-link>
                <router-link to="/login">Login</router-link>
                <router-link to="/register">Registrieren</router-link>
            </nav>
        </div>
    </header>
</template>

<script>
export default {
    name: "Header"
};
</script>

<style></style>
