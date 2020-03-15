// import modules
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const session = require('express-session');
const dotenv = require('dotenv')
const passport = require('passport');
// call func of modules
const app = express();
dotenv.config();
// import component
const indexRouter = require('./routes');
const authRouter = require('./routes/auth');
const connect = require('./schemas');
const passportConfig = require('./passport');
// call func of compoent
connect();
passportConfig(passport);
// setting app
app.set('port', process.env.PORT || 8001);
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
// route
app.use('/', indexRouter);
app.use('/auth',authRouter);
// error
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.send('error');
});
// set port
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});