var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
var indexRouter = require("./routes/index");
require("dotenv").config();

var app = express();

// view engine setup
var mustacheExpress = require("mustache-express");
var engine = mustacheExpress();
app.engine("mustache", engine);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "minha-chave-secreta",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // "secure: false" deve ser usado em desenvolvimento. Em produção, defina como "true" para usar HTTPS.
  })
);

app.use("/", indexRouter);
// app.use("/books", require("./controll/BookAPI"))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
