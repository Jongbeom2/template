const express = require('express');
const File = require('../schemas/file');
const multer = require('multer');
const fs = require('fs');
const router = express.Router();
const storage = multer.diskStorage({
  
})
const upload = multer({
  storage:storage,
  limits: { fileSize: 1 * 1024 * 1024 },
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
router.get('/img', async(req,res,next)=>{
  try{
    const result = await File.find();
    const imageList = [];
    result.forEach(image=>{
      const imageObj = {
        id: image._id,
        data : image.image.toString('base64')
      }
      imageList.push(imageObj);
    });
    
    return res.send({result:true, message: '이미지 리스트를 불러오는데 성공했습니다.' , imageList: imageList});
  }catch(error){
    next(error);
  }
});
module.exports = router;