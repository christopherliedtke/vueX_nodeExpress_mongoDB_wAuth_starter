<template>
    <div class="dashboard container py-5">
        <h2>Account</h2>
        <div>
            <b-tabs content-class="mt-3">
                <b-tab title="Account Data" active
                    ><p>Account Data</p>
                    <DeleteAccountButton
                /></b-tab>
                <b-tab title="Second"><p>I'm the second tab</p></b-tab>
                <b-tab title="Disabled" :disabled="true"
                    ><p>I'm a disabled tab!</p></b-tab
                >
            </b-tabs>
        </div>
    </div>
</template>

<script>
import DeleteAccountButton from "@/components/DeleteAccountButton.vue";
export default {
    name: "Account",
    components: {
        DeleteAccountButton
    },
    methods: {},
    mounted: function() {},
    data() {
        return {};
    }
};
</script>
