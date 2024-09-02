const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const urllib = require("url");
const path = require("path");
const crypto = require("crypto");

const config = require("./config.json");
const defaultroutes = require("./routes/default");
// const passwordauth = require("./routes/password");
const webuathnauth = require("./routes/webauthn.js");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());

// Set up CORS to allow requests from specific origins
const corsOptions = {
  origin: "http://localhost:4200", // allow requests only from this origin
  methods: "GET,POST,PUT,DELETE", // allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // allowed headers
  credentials: true, // enable to allow cookies
};

app.use(cors(corsOptions));

/* ----- session ----- */
app.use(
  cookieSession({
    name: "session",
    keys: [crypto.randomBytes(32).toString("hex")],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
app.use(cookieParser());

/* ----- serve static ----- */
app.use(express.static(path.join(__dirname, "static")));

app.use("/", defaultroutes);
// app.use("/password", passwordauth);
app.use("/webauthn", webuathnauth);

const port = config.port || 3000;
app.listen(port);
console.log(`Started app on port ${port}`);

module.exports = app;
