<template>
    <div class="register container">
        <h2>Registrieren</h2>
        <div>
            <input type="text" v-model="firstName" placeholder="Vorname" />
            <input type="text" v-model="lastName" placeholder="Nachname" />
            <input type="email" v-model="email" placeholder="E-Mail" />
            <input type="password" v-model="password" placeholder="Passwort" />
            <button class="btn-primary" @click="onSubmit">Registrieren</button>
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
                    password: this.password
                }
            });
            if (!res.success) {
                this.error = true;
            }
        }
    },
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            error: false
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
