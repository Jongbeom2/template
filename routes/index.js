const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    res.sendFile(path.join(__dirname, "./client/build", "index.html"));
  }else{
    res.send('Hello');
  }
});

module.exports = router;