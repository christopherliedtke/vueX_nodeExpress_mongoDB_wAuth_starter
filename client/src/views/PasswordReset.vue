<template>
    <div class="login container py-5">
        <b-overlay :show="showOverlay" variant="transparent" blur="none">
            <h2>Reset Password</h2>
            <b-form v-if="state === 0">
                <label for="email">Email</label>
                <b-form-input
                    type="email"
                    v-model="email"
                    id="email"
                    placeholder="Enter Email"
                    autocomplete="email"
                    autofocus
                ></b-form-input>
                <button class="btn btn-primary my-3" @click="onSubmitEmail">
                    Reset Password
                </button>
                <p>
                    Not what you wanted?
                    <b-link to="/register">Sign up</b-link> or
                    <b-link to="/login">Login</b-link>!
                </p>
            </b-form>
            <b-form v-if="state === 1">
                <p class="mt-4">
                    Please check your email inbox for the code to enter.
                </p>
                <label for="secretCode">Code</label>
                <b-form-input
                    type="text"
                    v-model="secretCode"
                    id="secretCode"
                    placeholder="Enter code received by email"
                    autofocus
                ></b-form-input>
                <label for="password">Password</label>
                <b-input-group>
                    <b-form-input
                        :type="passwordType"
                        v-model="password"
                        id="password"
                        placeholder="Enter Password"
                        autocomplete="new-password"
                        aria-describedby="password-help-block"
                    ></b-form-input>
                    <b-input-group-append is-text>
                        <b-icon
                            :icon="
                                passwordType === 'text'
                                    ? 'eye-fill'
                                    : 'eye-slash-fill'
                            "
                            font-scale="1.2"
                            @click="togglePasswordType"
                        ></b-icon>
                    </b-input-group-append>
                </b-input-group>
                <b-form-text id="password-help-block">
                    Your password must be 6+ characters long, contain letters,
                    numbers and special characters.
                </b-form-text>

                <label for="password2">Repeat Password</label>
                <b-input-group>
                    <b-form-input
                        :type="passwordType"
                        v-model="password2"
                        id="password2"
                        placeholder="Repeat Password"
                        autocomplete="new-password"
                    ></b-form-input>
                    <b-input-group-append is-text>
                        <b-icon
                            :icon="
                                passwordType === 'text'
                                    ? 'eye-fill'
                                    : 'eye-slash-fill'
                            "
                            font-scale="1.2"
                            @click="togglePasswordType"
                        ></b-icon>
                    </b-input-group-append>
                </b-input-group>
                <button class="btn btn-primary my-3" @click="onSubmitNewPw">
                    Set New Password
                </button>
            </b-form>
            <div class="error mt-3" v-if="errors">
                <b-alert
                    show
                    dismissible
                    variant="warning"
                    v-for="error in errors"
                    :key="error.msg"
                    >{{ error.msg }}</b-alert
                >
            </div>
            <div class="success mt-3" v-if="success">
                <b-alert show dismissible variant="success"
                    >{{ success }}
                    <b-spinner
                        style="width: 1.2rem; height: 1.2rem;"
                        variant="success"
                        label="Spinning"
                    ></b-spinner
                ></b-alert>
            </div>
        </b-overlay>
    </div>
</template>

<script>
import axios from "@/axios";
export default {
    name: "PasswordReset",
    methods: {
        async onSubmitEmail(e) {
            e.preventDefault();
            this.showOverlay = true;
            this.errors = [];

            const res = await axios.post("/api/auth/password-reset/get-code", {
                email: this.email
            });
            this.showOverlay = false;

            if (!res.data.success) {
                this.errors = res.data.errors;
            } else {
                this.state = 1;
            }
        },
        async onSubmitNewPw(e) {
            e.preventDefault();
            this.errors = [];
            this.showOverlay = true;

            const res = await axios.post("/api/auth/password-reset/verify", {
                email: this.email,
                password: this.password,
                password2: this.password2,
                code: this.secretCode
            });

            this.showOverlay = false;

            if (!res.data.success) {
                this.errors = res.data.errors;
            } else {
                this.success =
                    "Your password has been updated successfully. You are being redirected to login in a few seconds...";

                setTimeout(() => {
                    this.$router.push({ path: "/login" });
                }, 3500);
            }
        },
        togglePasswordType() {
            this.passwordType === "text"
                ? (this.passwordType = "password")
                : (this.passwordType = "text");
        }
    },
    data() {
        return {
            email: "",
            password: "",
            password2: "",
            passwordType: "password",
            secretCode: "",
            state: 0,
            errors: [],
            success: "",
            showOverlay: false
        };
    }
};
</script>

<style scoped lang="scss">
.login {
    &.container {
        width: 90%;
        max-width: 450px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .b-icon {
            cursor: pointer;
        }
    }
}
</style>
