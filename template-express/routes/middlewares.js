exports.isSignedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.send({ result: false, message: '로그인이 필요합니다.' });
  }
};

exports.isNotSignIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    return res.send({ result: false, message: '이미 로그인이 되어있습니다.' });
  }
};