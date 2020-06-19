<template>
    <div class="register container">
        <h2>Registrieren</h2>
        <div>
            <b-form-input
                type="text"
                v-model="firstName"
                placeholder="First Name"
            ></b-form-input>
            <b-form-input
                type="text"
                v-model="lastName"
                placeholder="Last Name"
            ></b-form-input>
            <b-form-input
                type="email"
                v-model="email"
                placeholder="Email"
            ></b-form-input>
            <b-form-input
                type="password"
                v-model="password"
                placeholder="Password"
            ></b-form-input>
            <b-form-input
                type="password"
                v-model="password2"
                placeholder="Repeat Password"
            ></b-form-input>
            <b-form-checkbox
                id="acceptance"
                v-model="acceptance"
                name="acceptance"
                value="accepted"
                unchecked-value="not_accepted"
            >
                I accept the terms and use
            </b-form-checkbox>
            <button class="btn btn-primary" @click="onSubmit">
                Registrieren
            </button>
            <div class="error" v-if="errors">
                <b-alert
                    show
                    dismissible
                    variant="warning"
                    v-for="error in errors"
                    :key="error.msg"
                    >{{ error.msg }}</b-alert
                >
            </div>
        </div>
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
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex-grow: 1;

        & > div {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            button {
                margin: 1rem;
            }
        }
    }
}
</style>
