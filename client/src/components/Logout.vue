<template>
    <b-button
        class="px-2 align-self-start align-self-lg-center d-flex align-items-center"
        size="sm"
        variant="secondary"
        type="submit"
        @click="onLogout"
        ><b-icon
            class="mr-1"
            icon="door-closed"
            font-scale="1"
            @click="onLogout"
        ></b-icon
        >Logout</b-button
    >
    <!-- <b-icon icon="door-closed" font-scale="1.2" @click="onLogout"></b-icon> -->
</template>

<script>
import axios from "@/axios";
export default {
    name: "Logout",
    methods: {
        async onLogout() {
            localStorage.clear();
            const response = await axios.get("/api/auth/logout");

            if (response.data.success) {
                this.$router.go({ path: "/login" });
            }
        }
    }
};
</script>

<style></style>
