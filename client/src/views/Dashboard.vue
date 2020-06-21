<template>
    <div class="dashboard container py-5">
        <h2>Dashboard</h2>
        <p v-for="data in testData" :key="data.id">{{ data.title }}</p>
    </div>
</template>

<script>
import axios from "@/axios";
export default {
    name: "Dashboard",
    methods: {
        async getUserData() {
            const response = await axios.get("/api/user/data");
            this.testData = response.data;
        }
    },
    mounted: function() {
        this.getUserData();
    },
    data() {
        return {
            testData: [],
            error: false
        };
    }
};
</script>
