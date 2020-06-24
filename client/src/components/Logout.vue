<template>
    <!-- <b-button
        class="px-2 align-self-start align-self-lg-center d-flex align-items-center"
        size="sm"
        variant="secondary"
        type="submit"
        @click="onLogout"
        > -->
    <!-- <b-icon
        class="mr-1"
        icon="box-arrow-right"
        font-scale="1.5"
        @click="onLogout"
    ></b-icon> -->
    <!-- Logout</b-button
    > -->
    <!-- <div
        class="align-self-start align-self-lg-center d-flex align-items-center"
    > -->
    <b-icon icon="box-arrow-right" font-scale="1.4" @click="onLogout"></b-icon>
    <!-- </div> -->
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
                this.$store.commit("setUserId", null);
                this.$store.commit("setUserRole", null);
                this.$store.commit("setUserStatus", null);
                this.$router.push({ path: "/login" });
            }
        }
    }
};
</script>

<style scoped lang="scss"></style>
