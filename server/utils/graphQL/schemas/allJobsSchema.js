const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = require("graphql");
const JobType = require("../types/JobType");

// Hardcoded data
const jobs = [
    { id: "1", title: "Jobtitle 1" },
    { id: "2", title: "Job 2" },
    { id: "3", title: "Job 3" },
];

// #Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        job: {
            type: JobType,
            args: {
                id: { type: GraphQLString },
            },
            resolve(parentValue, args) {
                for (let i = 0; i < jobs.length; i++) {
                    if (jobs[i].id == args.id) {
                        return jobs[i];
                    }
                }
            },
        },
        jobs: {
            type: new GraphQLList(JobType),
            resolve(parentValue, args) {
                return jobs;
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
});
