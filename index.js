const functions = require("@google-cloud/functions-framework");
const app = require("./app");

functions.http("api", app);
