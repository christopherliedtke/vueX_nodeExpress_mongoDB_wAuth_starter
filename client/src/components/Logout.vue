<template>
    <b-button size="sm" type="submit" @click="onLogout">Logout</b-button>
    <!-- <button class="btn-secondary" @click="onLogout">Logout</button> -->
</template>

<script>
import router from "@/router/index";
import axios from "@/axios";
export default {
    name: "Logout",
    methods: {
        async onLogout() {
            localStorage.clear();
            const response = await axios.get("/api/auth/logout");

            if (response.data.success) {
                router.go({ path: "/login" });
            }
        }
    }
};
</script>

<style></style>
