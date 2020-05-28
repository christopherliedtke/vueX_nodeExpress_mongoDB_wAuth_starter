<template>
    <b-button size="sm" type="submit" @click="onLogout">Logout</b-button>
    <!-- <button class="btn-secondary" @click="onLogout">Logout</button> -->
</template>

<script>
import router from "@/router/index";
export default {
    name: "Logout",
    methods: {
        onLogout() {
            localStorage.clear();
            router.go({ path: "/login" });
        }
    }
};
</script>

<style></style>
