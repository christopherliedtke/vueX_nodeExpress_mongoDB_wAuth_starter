import axios from "@/axios";

const state = {
    jobs: []
};

const getters = {
    jobs: state => state.jobs
};

const actions = {
    async getJobs({ commit }, data) {
        const response = await axios.post("/api/jobs/all", data);
        console.log("response: ", response);

        commit("setJobs", response.data.data.jobs);
    }
};

const mutations = {
    setJobs: (state, jobs) => {
        state.jobs = jobs;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
