<template>
    <b-button
        class="px-2"
        size="sm"
        variant="secondary"
        type="submit"
        @click="onLogout"
        ><b-icon icon="door-closed" font-scale="1.2" @click="onLogout"></b-icon
    ></b-button>
    <!-- <b-icon icon="door-closed" font-scale="1.2" @click="onLogout"></b-icon> -->
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
