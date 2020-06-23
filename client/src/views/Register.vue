<template>
    <div class="register container py-5">
        <b-overlay :show="showOverlay" variant="transparent" blur="none">
            <h2>Sign Up</h2>
            <b-form>
                <label for="firstName">First Name</label>
                <b-form-input
                    type="text"
                    v-model="firstName"
                    id="firstName"
                    placeholder="Enter First Name"
                    autocomplete="given-name"
                    autofocus
                ></b-form-input>
                <label for="lastName">Last Name</label>
                <b-form-input
                    type="text"
                    v-model="lastName"
                    id="lastName"
                    placeholder="Enter Last Name"
                    autocomplete="family-name"
                ></b-form-input>
                <label for="email">Email</label>
                <b-form-input
                    type="email"
                    v-model="email"
                    id="email"
                    placeholder="Enter Email"
                    autocomplete="email"
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
                <b-form-checkbox
                    id="acceptance"
                    v-model="acceptance"
                    name="acceptance"
                    value="accepted"
                    unchecked-value="not_accepted"
                    switch
                >
                    I accept the terms of use
                </b-form-checkbox>
                <button class="btn btn-primary my-3" @click="onSubmit">
                    Register
                </button>
                <p>
                    Already registered? <b-link to="/login">Login</b-link> now.
                </p>
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
            </b-form>
        </b-overlay>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "Register",
    methods: {
        ...mapActions(["userAuth"]),
        async onSubmit(e) {
            e.preventDefault();
            this.showOverlay = true;

            const res = await this.userAuth({
                url: "/api/auth/register",
                userData: {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    email: this.email,
                    password: this.password,
                    password2: this.password2,
                    acceptance: this.acceptance
                }
            });
            this.showOverlay = false;

            if (!res.success) {
                this.errors = res.errors;
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
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            password2: "",
            passwordType: "password",
            acceptance: "",
            showOverlay: false,
            errors: []
        };
    }
};
</script>

<style scoped lang="scss">
.register {
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
