$$.RandomInt = function (min, max) {
	var rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
}

$$.getTime = function () {
	return new Date().getTime();
}

$$.OutOfBounds = function (x, y, minx, miny, maxx, maxy) {
	return (x<minx||y<miny||x>maxx||y>maxy);
}

$$.PointInCircle = function (px, py, cx, cy, cr) {
	return (Math.sqrt(Math.pow(Math.abs(cx-px),2) + Math.pow(Math.abs(cy-py),2)) <= cr);
}

$$.removeFromArray = function (el, arr) {
	var index = arr.indexOf(el);
	if (index > -1) {
	    arr.splice(index, 1);
	}
}

$$.HealthBar = function (config) {
	for(var k in config){
		this[k] = config[k];
	}
}

$$.HealthBar.prototype.update = function () {
	ctx.strokeStyle="white";
	this.x -= this.length / 2;
	ctx.strokeRect(this.x,this.y,this.length,this.height);

	var l = this.health * (this.length-2) / 100;

	ctx.fillStyle = this.color;
	ctx.fillRect(this.x+1, this.y+1, l, this.height-2);
}