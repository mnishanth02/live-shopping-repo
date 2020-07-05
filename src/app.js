const express = require("express");
require('./db/mongoose');
const cors = require("cors");
const path = require("path");
// const passport = require('passport')
// const passportMiddleWare = require('./middleware/passport')

const userRoutes = require("./router/userRouter");
const ownerRoutes = require("./router/shopRouter");

const app = express();
app.use(cors());
app.use(express.json());
// app.use("/images", express.static(path.join("images")));
app.use(express.urlencoded({ extended: false }));
// app.use(passport.initialize())

// passport.use(passportMiddleWare)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );

  res.set({
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  });

  next();
});


app.use("/api/user", userRoutes);
app.use("/api/shop", ownerRoutes);

app.all('*', (req, res, next) => {

  // next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));

  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

module.exports = app;

