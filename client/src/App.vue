<template>
    <div id="app">
        <Header />
        <main>
            <router-view />
        </main>
        <Footer />
    </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
    components: {
        Header,
        Footer
    }
};
</script>

<style lang="scss">
@import "@/styles/custom_bootstrap.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";
@import "@/styles/custom.scss";
</style>
