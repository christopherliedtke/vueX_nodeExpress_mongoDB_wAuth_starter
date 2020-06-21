<template>
    <div class="login container py-5">
        <h2>Login</h2>
        <b-form>
            <label for="email">Email</label>
            <b-form-input
                type="email"
                v-model="email"
                id="email"
                placeholder="Enter Email"
                autocomplete="email"
            ></b-form-input>
            <label for="password">Password</label>
            <b-form-input
                type="password"
                v-model="password"
                id="password"
                placeholder="Enter Password"
                autocomplete="current-password"
            ></b-form-input>
            <button class="btn btn-primary mt-3" @click="onSubmit">
                Einloggen
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
        </b-form>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "Login",
    methods: {
        ...mapActions(["userAuth"]),
        async onSubmit(e) {
            e.preventDefault();
            const res = await this.userAuth({
                url: "/api/auth/login",
                userData: {
                    email: this.email,
                    password: this.password
                }
            });

            if (!res.success) {
                this.errors = res.errors;
            }
        }
    },
    data() {
        return {
            email: "",
            password: "",
            errors: []
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
    }
}
</style>
