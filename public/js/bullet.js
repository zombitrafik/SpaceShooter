$$.bullets = [];


// default bullet //

$$.Bullet = function (x, y, amx, amy, config) {
	for(var k in config){
    	this[k] = config[k];
    }
	this.x = x;
	this.y = y;

	var ax = amx - x,
		ay = amy - y;

	var dx, dy, bl = this.length;
	if(Math.abs(ax) > Math.abs(ay)){
		dx = ax>0?bl:-bl;
		dy = Math.abs((ay*100/ax)/100) * bl;
		dy = ay<0?-dy:dy;
	}else{
		dy = ay>0?bl:-bl;
		dx = Math.abs((ax*100/ay)/100) * bl;
		dx = ax<0?-dx:dx;
	}
	this.dx = dx;
	this.dy = dy;
}

$$.Bullet.prototype.update = function () {

    bullctx.beginPath();
    bullctx.moveTo(this.x, this.y);
    bullctx.lineTo(this.x + this.dx, this.y + this.dy);
    bullctx.lineWidth = this.lineWidth;
    bullctx.strokeStyle = this.color;
    bullctx.stroke();
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;

    for(var i in $$.enemies){
        
        var e = $$.enemies[i];
        if($$.PointInCircle(this.x, this.y, e.x, e.y, e.r)){
            // SOCKET ADD DAMAGE //
            $$.socket.emit("damage", {
                targetName: e.name
            });
            $$.removeFromArray(this, $$.bullets);
            $$.explosions.push(new $$.Explosion(this.x, this.y, $$.config.ExplosionEnemy));
            delete this;
            break;
        }
        if($$.PointInCircle(this.x, this.y, $$.player.x, $$.player.y, $$.player.r)){
            $$.removeFromArray(this, $$.bullets);
            $$.explosions.push(new $$.Explosion(this.x, this.y, $$.config.ExplosionOnMe));
            delete this;
        }
    }
    if($$.OutOfBounds(this.x, this.y, 0, 0, level.width, level.height - $$.config.AbilitiesBar.height)){
        $$.removeFromArray(this, $$.bullets);
    }
    for(var i in $$.planets){
        var p = $$.planets[i];
        if($$.PointInCircle(this.x, this.y, p.x, p.y, p.r)){
            $$.removeFromArray(this, $$.bullets);
            $$.explosions.push(new $$.Explosion(this.x, this.y, $$.config.ExplosionOther));
            delete this;
            break;
        }
    }
};

// Hook //

$$.Hook = function (x, y, amx, amy, config, isMe) {
    for(var k in config){
        this[k] = config[k];
    }
    this.x = x;
    this.y = y;
    this.isMe = isMe;

    this.hooker = {
        x: x,
        y: y
    }

    var ax = amx - x,
        ay = amy - y;

    var dx, dy, bl = this.length;
    if(Math.abs(ax) > Math.abs(ay)){
        dx = ax>0?bl:-bl;
        dy = Math.abs((ay*100/ax)/100) * bl;
        dy = ay<0?-dy:dy;
    }else{
        dy = ay>0?bl:-bl;
        dx = Math.abs((ax*100/ay)/100) * bl;
        dx = ax<0?-dx:dx;
    }
    this.dx = dx;
    this.dy = dy;
};

$$.Hook.prototype.update = function () {

    bullctx.beginPath();
    bullctx.moveTo(this.x, this.y);
    bullctx.lineTo(this.x + this.dx, this.y + this.dy);
    bullctx.lineWidth = this.lineWidth;
    bullctx.strokeStyle = this.color;
    bullctx.stroke();
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;


    bullctx.moveTo(this.hooker.x, this.hooker.y);
    bullctx.lineTo(this.x, this.y);
    bullctx.lineWidth = this.cometLineWidth;
    bullctx.strokeStyle = this.cometColor;
    bullctx.stroke();

    if($$.OutOfBounds(this.x, this.y, 0, 0, level.width, level.height - $$.config.AbilitiesBar.height)){
        $$.removeFromArray(this, $$.bullets);
    }
    for(var i in $$.planets){
        var p = $$.planets[i];
        if($$.PointInCircle(this.x, this.y, p.x, p.y, p.r)){
            $$.removeFromArray(this, $$.bullets);
            if(this.isMe){
                $$.player.setPlanet(p);
                $$.player.calcAngle(this.x, this.y);
            }
            delete this;
        }
    }
};