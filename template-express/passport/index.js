const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');

const User = require('../schemas/user');
module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({_id: id},{_id: 0, password:0,createdAt:0,__v:0,snsId:0})
    .then(user => {
      done(null, user)
    })
    .catch(err => {
      done(error);
    })
  });

  local(passport);
  kakao(passport)
};