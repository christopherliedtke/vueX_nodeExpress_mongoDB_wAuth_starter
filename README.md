# Starter Repository - Vue with VueX, Bootstrap, Node.js/Express, mongoDB w Authentication

## Description

This is a starter repository for a front-end Vue.js SPA with a Node.js/Express and mongoDB back-end.

### Front-End

On the front-end Vue has been set up with VueX and routing including route protection. The settings can be expanded further during development. Bootstrap is implemented and can be easily adapted through respective SCSS files.

The starter includes routes for 'Home' (public), 'Register' (public), 'Login' (public), 'Dashboard' (private). A header, footer and logout component is provided as well. The user id and user role are stored in `localStorage` to be used as persistent session data in the SPA.

### Back-End

On the back-end a Node.js/Express server is set up. mongoDB serves as the database for user data and can be expanded further. For authentication routes for 'register', 'login', 'logout' are set up. In addition a home route and a protected (through checkAuth middleware) dashboard route provide simple json-data as a response.

The authentication system has been set up with json web token and cookie session in the backend. The token is stored securely in the cookie. CSRF protection through csurf is set up for production.

## Set-Up Guide

1. Run `npm install` in 'root' and 'client' directory.

2. Set up mongoDB e.g. through mongoDB Atlas.

3. Add `secrets.json` in `root/server/utils` and add data:

    ```js
    {
        "MDB_URL": "YOUR_MONGODB_URL_WITH_USERNAME_AND_PASSWORD",
        "COOKIE_SESSION_SECRET": "YOUR_SESSION_COOKIE_SECRET",
        "JWT_SECRET": "YOUR_JSONWEBTOKEN_SECRET"
    }
    ```
