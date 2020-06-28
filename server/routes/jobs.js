const express = require("express");
const router = express.Router();
const expressGraphQL = require("express-graphql");
const allJobsSchema = require("../utils/graphQL/schemas/allJobsSchema");

// #route:  GET /api/jobs
// #desc:   Get all jobs
// #access: Public
// router.get("/", async (req, res) => {
//     res.json({
//         jobs: [
//             { id: 1, title: "Job 1" },
//             { id: 2, title: "Job 2" },
//         ],
//     });
// });

router.use(
    "/all",
    expressGraphQL({
        schema: allJobsSchema,
        graphiql: true,
    })
);

module.exports = router;
