$$.socket.on('spawnEnemy', function (data) {
	var enemy = new $$.Enemy($$.config.Enemy);
    enemy.setPos(data.position.x, data.position.y)
    enemy.setName(data.name);
    $$.enemies[data.name] = enemy;
});

$$.socket.on('enemyMove', function (data) {
	//console.log("move enemy");
	$$.enemies[data.name].setPos(data.position.x, data.position.y);
});

$$.socket.on('bullet', function (data) {
	$$.bullets.push(new $$.Shoot(data.position.x, data.position.y, data.position.amx, data.position.amy, data.type, false));
});

$$.socket.on('applyDamage', function (data) {
	$$.enemies[data.targetName].health -= $$.config.Bullet.damage;
});

$$.socket.on('applyDamageMe', function (data) {
	$$.player.health -= $$.config.Bullet.damage;
});

$$.socket.on('restorHP', function (data) {
	$$.enemies[data.name].health = 100;
});