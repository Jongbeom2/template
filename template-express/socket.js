const SocketIO = require('socket.io');

module.exports = (server, app, sessionMiddleware) => {
  const io = SocketIO(server, { path: '/socket.io' });
  app.set('io', io);
  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next);
  });
  const chat = io.of('/chat');
  chat.on('connection', (socket) => {
    console.log('chat 네임스페이스에 접속');
    socket.on('disconnect', () => {
      console.log('chat 네임스페이스 접속 해제');
    });
  });

};