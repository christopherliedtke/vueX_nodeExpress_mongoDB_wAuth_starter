const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = require("graphql");

// #Job Type
const JobType = new GraphQLObjectType({
    name: "Job",
    fields: () => ({
        id: {
            type: GraphQLString,
        },
        title: {
            type: GraphQLString,
        },
    }),
});

module.exports = JobType;
