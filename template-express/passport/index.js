const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');

const User = require('../schemas/user');
module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  local(passport);
  kakao(passport)
};