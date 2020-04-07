const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const { isSignedIn } = require('./middlewares');
const APIKey = require('../schemas/apikey');
router.post('/', isSignedIn, async (req, res, next) => {
  try {
    const apiKey = new APIKey({
      userId: req.user._id,
      name: req.body.name,
      domain: req.body.domain,
      key: uuidv4(),
    })
    await apiKey.save();
    return res.send({ result: true, message: 'Key를 생성하는데 성공했습니다.' });
  } catch (error) {
    next(error);
  }

});
router.get('/', isSignedIn, async (req, res, next) => {
  try {
    const result = await APIKey.find({
      userId: req.user && req.user._id || null
    });
    return res.send({ result: true, message: 'Key 리스트를 불러오는데 성공했습니다.', apiKeyList: result });
  } catch (error) {
    next(error);
  }
});
module.exports = router;