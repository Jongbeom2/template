// import modules
const express = require('express');
const logger = require('morgan');
const cors = require('cors')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv')
const passport = require('passport');
const path = require('path');
// call func of modules
const app = express();
dotenv.config();
// import component
const indexRouter = require('./routes');
const authRouter = require('./routes/auth');
const fileRouter = require('./routes/file');
const projectRouter = require('./routes/project');
const apikeyRouter = require('./routes/apikey');
const dbconnect = require('./schemas');
const passportConfig = require('./passport');
// call func of compoent
dbconnect();
passportConfig(passport);
// set middleware
app.use(logger('dev'));
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));
}
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());
// set middleware - route
app.use('/', indexRouter);
app.use('/auth',authRouter);
app.use('/file',fileRouter);
app.use('/project',projectRouter);
app.use('/apikey',apikeyRouter);
// set moddleware - route - other
app.get('*', function (req, res, next){
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
  }else{
    next();
  }
})
// set middleware - 404 error
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// set middleware - 500 error
app.use((err, req, res, next) => {
  if (!err.status) err.status = 500;
  res.status(err.status);
  res.send({
    error: process.env.NODE_ENV === 'dev'
      ? {
        status : err.status,
        message: err.message
      }
      : {
        status : err.status,
        message: err.message
      }});
});
// set port and server
app.listen(process.env.PORT || 5000, () => {
  console.log(process.env.PORT || 5000, '번 포트에서 대기중');
});