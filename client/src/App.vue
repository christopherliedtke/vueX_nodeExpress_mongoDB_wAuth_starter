<template>
    <div id="app">
        <Header />

        <main>
            <router-view />
        </main>
    </div>
</template>

<script>
import Header from "@/components/Header";
export default {
    components: {
        Header
    }
};
</script>

<style lang="scss">
@import "./styles/index.scss";
</style>
