<template>
    <div class="login container">
        <h2>Login</h2>
        <div>
            <label>E-Mail Adresses</label>
            <input type="email" v-model="email" placeholder="E-Mail" />
            <label>Passwort</label>
            <input type="password" v-model="password" placeholder="Passwort" />
            <button class="btn-primary" @click="onSubmit">Einloggen</button>
            <p class="error" v-if="error">
                Leider ist ein Fehler aufgetreten. Bitte versuchen Sie es noch
                einmal!
            </p>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "Login",
    methods: {
        ...mapActions(["userLogin"]),
        async onSubmit(e) {
            e.preventDefault();
            const res = await this.userLogin({
                email: this.email,
                password: this.password
            });
            if (!res.success) {
                this.error = true;
            }
        }
    },
    data() {
        return {
            email: "",
            password: "",
            error: false
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
