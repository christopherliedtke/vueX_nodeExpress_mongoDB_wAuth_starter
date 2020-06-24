# Starter Repository - Vue with VueX, Bootstrap, Node.js/Express, mongoDB with Authentication and Email Verification

> A starter repository for a front-end Vue.js SPA with a Node.js/Express and mongoDB back-end incl. pre-defined **authentication**, **email verification** and **delete account** functionality.

## Features

-   Register
-   Email verification
-   Login
-   Password reset
-   Delete Account

## Front-End

On the front-end Vue has been set up with VueX store and routing including route protection with redirecting. The settings can be expanded further during development. Bootstrap is implemented and can be easily adapted through respective SCSS files.

The starter includes the following views/routes:

-   Home ("/") -> [public]
-   Register ("/register) -> [public]
-   Login ("/login") -> [public]
-   PasswordReset ("/password-reset") -> [public]
-   AccountVerification ("/account/verification") -> [private]
-   AccountVerificationSuccessfull ("/account/verified") -> [private]
-   Account ("/account") -> [private]
-   Dashboard ("/dashboard") -> [private]

and the following components:

-   Header
-   Footer
-   Logout
-   Delete Account Button

The user id, user role and user status are stored in `localStorage` to be used session persistent on the client side.

## Back-End

On the back-end a Node.js/Express server is set up. mongoDB serves as the database for user data and can be expanded further. The following routes are set up:

-   "/api/jobs" -> serves hard coded json-data [public]
-   "/" -> serves basic json; not requested on front-end [public]
-   "/user/data" -> serves hard-coded json-data [private]
-   "/api/auth/..." -> handles user registration [public], login [public], password reset [public], logout [public], account verification [private], account deletion [private]

Private routes are protected through 'check authentication' middleware.

The authentication system has been set up with json web token and persistent cookie session in the backend. The token is stored securely in the cookie. CSRF protection through csurf is set up for production.

Email service is provided through nodemailer.

## Set-Up

### Prerequisites

-   mongoDB account and database set-up
-   Email hosting [optional]

### Steps to set up development environment

1. Clone and set up repository or directly use repository as template

2. Run `npm install` in `root` and `root/client` directory.

3. Add `secrets.json` in `root/server/utils` and add secrets and your mongoDB and email hosting data:

    ```json
    {
        "MDB_URL": "YOUR_MONGODB_URL_WITH_USERNAME_AND_PASSWORD",
        "COOKIE_SESSION_SECRET": "YOUR_SESSION_COOKIE_SECRET",
        "JWT_SECRET": "YOUR_JSONWEBTOKEN_SECRET",
        "EMAIL_HOST": "YOUR_EMAIL_HOST",
        "EMAIL_USERNAME": "YOUR_EMAIL_USERNAME",
        "EMAIL_PW": "YOUR_EMAIL_PASSWORD",
        "EMAIL_PORT": 000
    }
    ```

4. In the default set-up email address verification is obligatory. The default user status after registration is `status: "pending"`. You can change to `status: "active"` in `root/server/utils/models/user.js` to omit email address verification.

## License

MIT
