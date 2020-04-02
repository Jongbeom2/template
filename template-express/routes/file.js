const express = require('express');
const File = require('../schemas/file');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();
const storage = multer.diskStorage({
  limit: {fileSize:5*1024*1024}
})
const upload = multer({
  storage:storage
})
router.post('/img', upload.single('image'), async (req, res, next) => {
  try{
    const img = fs.readFileSync(req.file.path);
    const encode_img = img.toString('base64');
    const file = new File({
      contentType: req.file.mimetype,
      image: new Buffer.from(encode_img,'base64')
    });
    const result = await file.save();
    return res.status(201).send({ result: true, message: '업로드에 성공했습니다.' });
  }catch(error){
    next(error);
  }  
});
module.exports = router;