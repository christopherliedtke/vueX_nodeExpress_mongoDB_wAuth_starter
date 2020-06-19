<template>
    <div class="login container">
        <h2>Login</h2>
        <div>
            <label>Email</label>
            <b-form-input
                type="email"
                v-model="email"
                placeholder="Email"
            ></b-form-input>
            <label>Password</label>
            <b-form-input
                type="password"
                v-model="password"
                placeholder="Password"
            ></b-form-input>
            <button class="btn btn-primary" @click="onSubmit">Einloggen</button>
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
