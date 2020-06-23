<template>
    <div class="account-verification-successful container py-5">
        <h2>Account Verification Successful</h2>
        <div class="success mt-3">
            <b-alert show dismissible variant="success"
                >Your email has been successfully verified. You will be
                redirected in a moment...
                <b-spinner
                    style="width: 1.2rem; height: 1.2rem;"
                    variant="success"
                    label="Spinning"
                ></b-spinner>
            </b-alert>
        </div>
    </div>
</template>

<script>
import axios from "@/axios";
export default {
    name: "AccountVerificationSuccessful",
    methods: {
        async updateUserStatus() {
            const response = await axios.get(
                "/api/auth/verification/update-user-status"
            );

            if (!response.data.success) {
                localStorage.clear();
                const logout = await axios.get("/api/auth/logout");
                if (logout.data.success) {
                    this.$router.push({ path: "/login" });
                }
            } else {
                localStorage.setItem("userId", response.data.userId);
                localStorage.setItem("userRole", response.data.userRole);
                localStorage.setItem("userStatus", response.data.userStatus);
                this.$store.commit("setUserStatus", response.data.userStatus);

                setTimeout(() => {
                    this.$router.push({ path: "/dashboard" });
                }, 3500);
            }
        }
    },
    mounted: function() {
        this.updateUserStatus();
    },
    data() {
        return {};
    }
};
</script>
