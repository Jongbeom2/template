const express = require('express');
const Chat = require('../schemas/chat');
const router = express.Router();
const { isSignedIn } = require('./middlewares');
router.get('/', isSignedIn, async (req, res, next) => {
  try {
    try {
      const prevResult = JSON.parse(JSON.stringify(await Chat.find()));
      const userId = req.user._id;
      const result = prevResult.map(ele => {
        userId.toString() === ele.user.toString() ? ele.isMe = true : ele.isMe = false;
        return ele;
      })
      return res.send({ result: true, message: 'Chat 리스트를 불러오는데 성공했습니다.', chatList: result });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
});
router.post('/send', isSignedIn, async (req, res, next) => {
  try {
    const io = req.app.get('io');
    const socketChat = io.of('/chat');
    let nickname = '익명';
    if (req.user) {
      nickname = req.user.nickname;
    }
    socketChat.emit('send', {
      user: req.user._id,
      nickName: nickname,
      chat: req.body.chatMessage
    });
    const chat = new Chat({
      user: req.user._id,
      nickName: nickname,
      chat: req.body.chatMessage
    });
    await chat.save();
    return res.send({ result: true, message: 'Chat 보내기에 성공했습니다.' });
  } catch (error) {
    next(error);
  }
});
router.post('/join', isSignedIn, async (req, res, next) => {
  try {
    const io = req.app.get('io');
    const socketChat = io.of('/chat');
    let nickname = '익명';
    if (req.user) {
      nickname = req.user.nickname;
    }
    socketChat.emit('join', {
      user: 'system',
      nickName: 'system',
      chat: `${nickname}님이 입장하셨습니다.`,
    });
    const chat = new Chat({
      user: 'system',
      nickName: 'system',
      chat: `${nickname}님이 입장하셨습니다.`
    });
    await chat.save();
    return res.send({ result: true, message: '입장 Chat 보내기에 성공했습니다.' });
  } catch (error) {
    next(error);
  }
});
router.post('/exit', isSignedIn, async (req, res, next) => {
  try {
    const io = req.app.get('io');
    const socketChat = io.of('/chat');
    let nickname = '익명';
    if (req.user) {
      nickname = req.user.nickname;
    }
    socketChat.emit('exit', {
      user: 'system',
      nickName: 'system',
      chat: `${nickname}님이 퇴장하셨습니다.`,
    });
    const chat = new Chat({
      user: 'system',
      nickName: 'system',
      chat: `${nickname}님이 퇴장하셨습니다.`
    });
    await chat.save();
    return res.send({ result: true, message: '퇴장 Chat 보내기에 성공했습니다.' });
  } catch (error) {
    next(error);
  }
});
module.exports = router;