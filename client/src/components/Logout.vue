<template>
    <button class="btn-secondary" v-on:click="onLogout">Logout</button>
</template>

<script>
import router from "@/router/index";
export default {
    name: "Logout",
    methods: {
        onLogout() {
            localStorage.clear();
            // ! clear vuex store
            router.go({ path: "/login" });
        }
    }
};
</script>

<style></style>
