const express = require('express');
const User = require('../schemas/user');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isSignedIn, isNotSignIn } = require('./middlewares');
const router = express.Router();

router.post('/check', (req, res, next) => {
  if (req.user) {
    return res.send({ result: true, message: '로그인 상태입니다.' });
  } else {
    return res.send({ result: false, message: '로그인 상태가 아닙니다.' });
  }
});

router.get('/id',isSignedIn, (req, res, next) => {
  if (req.user) {
    return res.send({ result: true, id:req.user._id, message: '아이디를 성공적으로 불러왔습니다.' });
  } else {
    return res.send({ result: false, message: '로그인 상태가 아닙니다.' });
  }
});

router.post('/signin', isNotSignIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      return res.send({ result: false, type: 'useError', message: '로그인중 에러가 발생했습니다.' })
    }
    if (!user) {
      return res.send({ result: false, type: 'existError', message: '로그인에 실패했습니다' })
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        res.send({ result: false, type: 'loginError', message: '로그인중 에러가 발생했습니다.' })
      }
      return res.send({ result: user, message: '로그인에 성공했습니다.' });
    });
  })(req, res, next); 
})

router.post('/signout', isSignedIn, (req, res, next) => {
  try{
    req.session.destroy();
    return res.send({ result: true, message: '로그아웃에 성공했습니다.' });
  }catch(err){
    next(err);
  }
});

router.post('/signup', isNotSignIn, async (req, res, next) => {
  try{
    const exUser = await User.findOne({email: req.body.email});
    if (exUser) {
      return res.send({ result: false, message: '이메일이 중복됩니다.' });
    }
    const user = new User({
      nickname: req.body.nickname,
      password: req.body.password,
      email: req.body.email,
    });
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    await user.save();
    return res.status(201).send({ result: true, message: '회원 가입에 성공했습니다.' });
  }catch(error){
    next(error);
  }
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: (process.env.NODE_ENV === "production" ? '/signin' : 'http://localhost:3000/sign'),
}), (req, res) => {
  res.redirect((process.env.NODE_ENV === "production" ? '/' : 'http://localhost:3000/home'));
});

module.exports = router;