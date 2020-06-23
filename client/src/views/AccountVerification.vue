<template>
    <div class="account-verification container py-5">
        <b-overlay :show="showOverlay" variant="transparent" blur="none">
            <h2>Account Verification</h2>
            <p>
                Please check your email inbox for the activation link. If you do
                not find the email, check your spam folder as well.
            </p>
            <p>You did not receive an email?</p>
            <button class="btn btn-primary my-3" @click="onSubmit">
                Send New Activation Email
            </button>
            <div class="error mt-3" v-if="error">
                <b-alert show dismissible variant="warning"
                    >Oh, something went wrong. Please try again later.</b-alert
                >
            </div>
            <div class="success mt-3" v-if="success">
                <b-alert show dismissible variant="success"
                    >The activation link was sent to your registered email
                    address.
                </b-alert>
            </div>
        </b-overlay>
    </div>
</template>

<script>
import axios from "@/axios";
export default {
    name: "AccountVerification",
    methods: {
        async onSubmit(e) {
            e.preventDefault();
            this.showOverlay = true;
            this.error = false;
            this.success = false;

            const response = await axios.get(
                "/api/auth/verification/get-activation-email"
            );
            this.showOverlay = false;

            if (!response.data.success) {
                this.error = true;
            } else {
                this.success = response.data.success;
            }
        }
    },
    mounted: function() {},
    data() {
        return {
            error: false,
            success: false,
            showOverlay: false
        };
    }
};
</script>
