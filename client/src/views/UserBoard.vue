<template>
    <div class="userboard container">
        <h2>UserBoard</h2>
        <div>
            <div v-for="job in jobs" :key="job.id">
                <p>{{ job.title }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    name: "UserBoard",
    methods: {
        ...mapActions(["getJobs"])
    },
    data() {
        return {};
    },
    mounted: function() {
        this.getJobs();
    },
    computed: mapGetters(["jobs"])
};
</script>
