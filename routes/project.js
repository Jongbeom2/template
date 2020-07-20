const express = require('express');
const router = express.Router();
const Proejct = require('../schemas/project');
router.get('/', async(req,res,next)=>{
  try{
    const result = await Proejct.find();
    return res.send({result:true, message: '프로젝트 리스트를 불러오는데 성공했습니다.' , projectList: result});
  }catch(error){
    next(error);
  }
});
module.exports = router;