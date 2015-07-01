var express = require('express');
var app = express();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);
//modules 
var User = require('./modules/user');
var Game = require('./modules/game');

var $$ = {};
$$.users = [];
$$.games = [];

var waiting = null;

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {


	socket.on('enjoy', function (data) {

		console.log("ENJOY " + data.position);
		var user = new User({
			name: data.name,
			position: data.position,
			socket: socket,
			enemies: [],
			friends: []
		});

		$$.users[user.name] = user;

		for(var i in $$.users){
			var u = $$.users[i];
			if(u.enemies.length < 1 && u.name != user.name){
				console.log("FIND");
				u.enemies.push(user);
				user.enemies.push(u);
				u.socket.emit('spawnEnemy', {
					name: user.name,
					position: user.position
				});
				user.socket.emit('spawnEnemy', {
					name: u.name,
					position: u.position
				});
				break;
			}
		}
	});

	socket.on('move', function (data) {
		var u = $$.users[data.name];
		if(u)
		for(var i in u.enemies){
			u.enemies[i].socket.emit('enemyMove', {
				name: data.name,
				position: data.position
			});
		}
	});

	socket.on('sendShot', function (data) {
		var u = $$.users[data.name];
		if(u)
		for(var i in u.enemies){
			u.enemies[i].socket.emit('bullet', data);
		}
	});

	socket.on('damage', function (data) {
		var u = $$.users[data.targetName];
		for(var i in u.enemies){
			u.enemies[i].socket.emit('applyDamage', data);
		}
		u.socket.emit('applyDamageMe', data);
	});

	socket.on('iAmDead', function (data) {
		var u = $$.users[data.name];
		for(var i in u.enemies){
			u.enemies[i].socket.emit('restorHP', data);
		}
	});

	socket.on('disconnect', function (data) {
		console.log("disc");
	});
});

server.listen(app.get('port'));
console.log("Server started on port " + app.get('port'));