const mongoose = require('mongoose');

const { MONGO_ID, MONGO_PASSWORD } = process.env;
const MONGO_URL = `mongodb+srv://${MONGO_ID}:${MONGO_PASSWORD}@template-w9dtl.mongodb.net/test?retryWrites=true&w=majority`;

module.exports = () => {
  const connect = () => {
    mongoose.connect(MONGO_URL,{
      useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
    })
    .then(()=>console.log('MongoDB Connected...'))
    .catch((err)=>console.log(err)); 
  };
  connect();
  mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
  });
  mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect();
  });
  require('./user');
  require('./file');
};