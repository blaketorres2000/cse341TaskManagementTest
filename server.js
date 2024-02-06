/******************************************
 * Require Statements
 *****************************************/
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoDB = require("./db/mongo.js");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger_output.json");
const routes = require("./routes");
const passport = require("passport");
const session = require("express-session");
const {
    initializePassport,
    expressSession,
} = require("./middleware/authenticate");

/******************************************
 * Middleware
 ******************************************/
// Use cors middleware
app.use(cors({ methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"] }));
app.use(cors({ origin: "*" }));

// Use bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use session middleware
app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    })
);

// Initialize Passport and set up session management
initializePassport();

// Use Express session middleware
app.use(expressSession);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set up headers middleware
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
});

// Use express.json() and express.urlencoded() middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to serve Swagger UI
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerDocument));

/******************************************
 * Routes
 *****************************************/
app.use("/", routes);

/******************************************
 * Server Setup
 ******************************************/
const PORT = process.env.PORT || 7100;

// Use the Mongoose connection from mongo.js
mongoDB
    .connectToMongoDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error starting the application:", err);
    });
