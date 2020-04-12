const express = require('express');
const router = express.Router();
const { isSignedIn } = require('./middlewares');
const APIDoc = require('../schemas/apidoc');
router.get('/', async (req, res, next) => {
  try {
    try {
      const result = await APIDoc.find();
      return res.send({ result: true, message: 'API Document 리스트를 불러오는데 성공했습니다.', apiDocList: result });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;