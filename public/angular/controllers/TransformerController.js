
angular.module('transformerApp', ['ngCookies'])

    .controller('TransformerController', function ($scope) {

        var socket = io.connect('http://localhost:3000');

        socket.on('server_message', function (data) {
            $scope.status = data;
            console.log($scope.status);
        });

        socket.on('con', function (data) {
            console.log(data);
        });

        socket.on('socket disconnected', function (data) {
            console.log('um trans caiu!');
            console.log(data);
        })

        // $scope.disconnect = function () {
        //     console.log('qualquer coisa');
        //     socket.emit('disconnect', { my: 'data' });
        // }

        setInterval(function () {
            console.log('mostrando alguma coisa');
        }, 5000);
    });
