module.exports = function (io) {

    io.on('connection', function (socket) {
      io.emit('this', { will: 'be received by everyone'});

      socket.emit('news', function (data) {
        console.log('Dado recebido: '+ data);
      });

      socket.on('disconnect', function () {
        io.sockets.emit('user disconnected');
      });
    });
}
