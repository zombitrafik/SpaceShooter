$$.explosions = [];

$$.Explosion = function (x, y, config) {
	for(var k in config){
		this[k] = config[k];
	}
	this.x = x;
	this.y = y;
	this.r = 0;
	this.line = 1;
}

$$.Explosion.prototype.update = function () {

	if(this.r < this.radius){
		this.r += this.speed;
	}else{
		$$.removeFromArray(this, $$.explosions);
		//delete this;
	}
	if(this.r < this.radius / 2){
		this.line += this.speed;
	}else{
		this.line -= this.speed;
		if(this.line < 1) this.line = 1;
	}

	explctx.beginPath();
    explctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    explctx.strokeStyle = this.color;
    explctx.lineWidth = this.line;
	explctx.stroke();
};