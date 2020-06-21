<template>
    <div class="register container py-5">
        <h2>Registrieren</h2>
        <b-form>
            <label for="firstName">First Name</label>
            <b-form-input
                type="text"
                v-model="firstName"
                id="firstName"
                placeholder="First Name"
            ></b-form-input>
            <label for="lastName">Last Name</label>
            <b-form-input
                type="text"
                v-model="lastName"
                id="lastName"
                placeholder="Last Name"
            ></b-form-input>
            <label for="email">Email</label>
            <b-form-input
                type="email"
                v-model="email"
                id="email"
                placeholder="Email"
            ></b-form-input>
            <label for="password">Password</label>
            <b-form-input
                type="password"
                v-model="password"
                id="password"
                placeholder="Password"
            ></b-form-input>
            <b-form-text id="password-help-block">
                Your password must be at least 6 characters and contain a
                lowercase letter, an uppercase letter, a numeric digit and a
                special character.
            </b-form-text>
            <label for="password2">Repeat Password</label>
            <b-form-input
                type="password"
                v-model="password2"
                id="password2"
                placeholder="Repeat Password"
            ></b-form-input>
            <b-form-checkbox
                id="acceptance"
                v-model="acceptance"
                name="acceptance"
                value="accepted"
                unchecked-value="not_accepted"
            >
                I accept the terms of use
            </b-form-checkbox>
            <button class="btn btn-primary mt-3" @click="onSubmit">
                Registrieren
            </button>
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

            if (!res.success) {
                this.errors = res.errors;
            }
        }
    },
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            password2: "",
            acceptance: "",
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
    }
}
</style>
