var express = require("express"),
  config = require("config"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  ObjectId = mongoose.Types.ObjectId,
  userId = require("./userId");
(jwt = require("express-jwt")), (jwks = require("jwks-rsa"));
app = express();
mongoose.Promise = require("bluebird");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

var auth0Config = config.get("auth0");
console.log("NODE_ENV:" + process.env.NODE_ENV);
console.log("auth0Config.CLIENT_DOMAIN: " + auth0Config.CLIENT_DOMAIN);
console.log("auth0Config.AUTH0_AUDIENCE: " + auth0Config.AUTH0_AUDIENCE);
const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${auth0Config.CLIENT_DOMAIN}/.well-known/jwks.json`
  }),
  audience: auth0Config.AUTH0_AUDIENCE,
  issuer: `https://${auth0Config.CLIENT_DOMAIN}/`,
  algorithm: "RS256"
});

var mongooseConfig = config.get("mongo");
var connectionString = "mongodb://" + mongooseConfig.host + ":27017/db";
mongoose.connect(connectionString);

app.use("/api/workouts", [jwtCheck, userId]);
app.use("/api/workout", [jwtCheck, userId]);
app.use("/api/guides", [jwtCheck, userId]);
app.use("/api/measurements", [jwtCheck, userId]);
app.use("/api/users", [jwtCheck]);
app.use("/api/ping", function(req, res) {
  res.send("Hello world");
});

var workouts = require("./routes/workouts.js")(app);
var guides = require("./routes/guides.js")(app);
var measurements = require("./routes/measurements.js")(app);
var users = require("./routes/users.js")(app);

app.use(function(err, req, res, next) {
  res
    .status(err.status || 500)
    .json({ error: "Hmmm something happened. " + err });
});

var port = process.env.port || "3000";
var server = app.listen(port, function() {
  console.log("Server listening on port:" + port);
});

process.on("SIGINT", function() {
  console.log("SIGINT: Closing MongoDB connection");
  mongoose.connection.close(function() {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});
