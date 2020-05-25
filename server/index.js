const express = require('express');
const cors = require('cors');
const compression = require('compression');
const nodemailer = require('nodemailer');
const cookieSession = require('cookie-session');
const csurf = require('csurf');
const cryptoRandomString = require('crypto-random-string');
const { hash, compare } = require('./utils/bcrypt');

const app = express();

let secrets, port;
if (process.env.NODE_ENV == 'production') {
    secrets = process.env;
    port = process.env.PORT;
} else {
    secrets = require('./utils/secrets');
    port = 5000;
}

// #Nodemailer
const transporter = nodemailer.createTransport({
    host: secrets.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        user: secrets.EMAIL_USERNAME,
        pass: secrets.EMAIL_PW,
    },
});

// #mongoDB
const db = require('./utils/db');
const { User } = require('./utils/models/user');

// #Middleware
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));
app.use(
    cookieSession({
        secret: secrets.COOKIE_SESSION_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
    })
);
app.use(csurf());
app.use((req, res, next) => {
    res.set('x-frame-options', 'DENY');
    res.cookie('mytoken', req.csrfToken());
    next();
});

const auth = require('./routes/auth');
app.use('/auth', auth);

app.listen(port, () => console.log(`Server listening on port ${port}`));
