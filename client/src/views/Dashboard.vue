<template>
    <div class="dashboard container">
        <h2>Dashboard</h2>
    </div>
</template>

<script>
import axios from "@/axios";
export default {
    name: "Dashboard",
    methods: {
        getUserData: async () => {
            const response = await axios.get("/api/user-data");
            console.log("response: ", response);
        }
    },
    mounted: function() {
        this.getUserData();
    },
    data() {
        return {
            firstName: "",
            lastName: "",
            email: "",
            error: false
        };
    }
};
</script>
