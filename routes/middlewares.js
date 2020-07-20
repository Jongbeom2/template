const jwt = require('jsonwebtoken');
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

exports.verifyToken = (req,res,next)=>{
  try{
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
  }catch(error){
    if (error.name ==='TokenExpiredError'){
      return res.status(419).json({
        code:419,
        message: '토큰이 만료되었습니다.'
      });
    }
    return res.status(401).json({
      code:401,
      message: '유효하지 않은 토큰입니다.'
    });
  }
}