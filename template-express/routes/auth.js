const express = require('express');
const User = require('../schemas/user');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/check', (req, res, next)=>{
  if(req.user){
    return res.send({ result: true, message: '로그인 상태입니다.' });
  }else{
    return res.send({ result: false, message: '로그인 상태가 아닙니다.' });
  }
});

router.post('/login',(req,res,next)=>{
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

router.post('/register', (req, res, next) =>{
  const user = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
  });
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;
  user.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

module.exports = router;