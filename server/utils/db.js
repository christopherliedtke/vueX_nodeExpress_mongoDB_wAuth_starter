const mongoose = require('mongoose');

let mongoDB;
if (process.env.DATABASE_URL) {
    mongoDB = process.env.DATABASE_URL;
} else {
    const { MDB_USER, MDB_SECRET } = require('./secrets');
    mongoDB = `mongodb+srv://${MDB_USER}:${MDB_SECRET}@mfamalanders-kevjo.mongodb.net/mfamalanders?retryWrites=true&w=majority`;
}

mongoose
    .connect(mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log('-----> mongoDB connected...'))
    .catch((err) => console.log('-----> Error trying to connect to mongoDB: ', err));

mongoose.connection.on('error', console.error.bind(console, '-----> mongoDB connection error'));
