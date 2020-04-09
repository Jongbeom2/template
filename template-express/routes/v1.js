const express = require('express');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./middlewares');
const APIKey = require('../schemas/apikey');
const File = require('../schemas/file');
const router = express.Router();

router.post('/token', async (req, res) => {
  const { key } = req.body;
  try {
    const apiKey = await APIKey.findOne({
      key
    });
    if (!apiKey) {
      return res.status(401).json({
        code: 401,
        message: '등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요.',
      });
    }
    const token = jwt.sign({
      userId: apiKey.userId,
    }, process.env.JWT_SECRET, {
      expiresIn: '5m',
      issuer: 'jbtemplate',
    });
    return res.json({
      code: 200,
      message: '토큰이 발급되었습니다.',
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: '서버 에러가 발생했습니다.',
    });
  }
});

router.get('/file/img/all', verifyToken, async (req, res) => {
  try{
    const result = await File.find();
    return res.json({result:true, message: '이미지 리스트를 불러오는데 성공했습니다.' , imageList: result});
  }catch(error){
    next(error);
  }
});

router.get('/file/img/my', verifyToken, async (req, res) => {
  try{
    const result = await File.find({
      userId: req.decoded.userId
    });
    return res.json({result:true, message: '내가 업로드한 이미지 리스트를 불러오는데 성공했습니다.' , imageList: result});
  }catch(error){
    next(error);
  }
});

router.get('/test', verifyToken, (req, res) => {
  res.json(req.decoded);
});

module.exports = router;