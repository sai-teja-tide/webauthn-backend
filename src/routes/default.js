const express = require("express");
const utils = require("../utils/utils");
const router = express.Router();
const database = require("./db");

/* Returns if user is logged in */
router.get("/isLoggedIn", (request, response) => {
  if (!request.session.loggedIn) {
    response.json({
      status: "failed",
    });
  } else {
    response.json({
      status: "ok",
    });
  }
});

/* Logs user out */
router.get("/logout", (request, response) => {
  request.session.loggedIn = false;
  request.session.username = undefined;

  response.json({
    status: "ok",
  });
});

/* Returns personal info and THE SECRET INFORMATION */
router.get("/personalInfo", (request, response) => {
  if (!request.session.loggedIn) {
    response.json({
      status: "failed",
      message: "Access denied",
    });
  } else {
    response.json({
      status: "ok",
      name: database[request.session.username].name,
      theSecret: '<img width="250px" src="img/theworstofthesecrets.jpg">',
    });
  }
});

/* Returns welcome message */
router.get("/", (request, response) => {
  response.json({
    status: "ok",
    message: "Welcome to the WebAuthn API!",
  });
});

/* Returns the entire database */
router.get("/show-db", (request, response) => {
  response.json(database);
});

module.exports = router;
