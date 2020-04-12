const SocketIO = require('socket.io');

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: '/socket.io' });
  const chat = io.of('/chat');
  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스에 접속');
    socket.emit('join', {
      user: `system`,
      chat: `입장하셨습니다.`,
    });
    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
      socket.emit('exit', {
        user: 'system',
        chat: `퇴장하셨습니다.`,
      });
    });
    setInterval(() => {
      socket.emit('news', 'Hello Socket.IO');
    }, 3000);
  });

};