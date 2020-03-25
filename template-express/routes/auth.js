const express = require('express');
const User = require('../schemas/user');
const passport = require('passport');
const bcrypt = require('bcrypt')
const { isSignedIn, isNotSignIn } = require('./middlewares');
const router = express.Router();

router.post('/check', (req, res, next) => {
  if (req.user) {
    return res.send({ result: true, message: '로그인 상태입니다.' });
  } else {
    return res.send({ result: false, message: '로그인 상태가 아닙니다.' });
  }
});

router.post('/signin', isNotSignIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return res.send({ result: false, message: '로그인중 에러가 발생했습니다.' })
    }
    if (!user) {
      return res.send({ result: false, message: ' 로그인에 실패했습니다.' })
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        res.send({ result: false, message: '로그인중 에러가 발생했습니다.' })
      }
      return res.send({ result: user, message: '로그인에 성공했습니다.' });
    });
  })(req, res, next);
})

router.post('/signout', isSignedIn, (req, res, next) => {
  req.session.destroy();
  return res.send({ result: true, message: '로그아웃에 성공했습니다.' });
});

router.post('/signup', isNotSignIn,(req, res, next) => {
  const user = new User({
    nickname: req.body.nickname,
    password: req.body.password,
    email: req.body.email,
  });
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  user.save()
    .then((result) => {
      res.status(201).json({ result: true, message: '회원 가입에 성공했습니다.' });
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: (process.env.NODE_ENV === "production" ? '/signin':'http://localhost:3000/sign'),
}), (req, res) => {
  res.redirect((process.env.NODE_ENV === "production" ? '/':'http://localhost:3000/home'));
});

module.exports = router;