
$$.planets = [];

$$.Planet = function (config) {
	for(var k in config){
		this[k] = config[k];
	}
	this.circleAnim = 0;
	this.setPos = function (nx, ny) {
		this.x = nx;
		this.y = ny;
	}
}

$$.Planet.prototype.update = function() {

	ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, this.startAngle + this.angleRotate, this.endAngle + this.angleRotate, false);
    ctx.strokeStyle = this.colors.main;
    ctx.lineWidth = 3.0;
    ctx.stroke();

    ctx.beginPath();
    	ctx.arc(this.x, this.y, this.r, this.startAngle + this.angleRotate + $$.PI, this.endAngle + this.angleRotate + $$.PI, false);
    ctx.stroke();

    ctx.beginPath();
    	ctx.arc(this.x, this.y, this.r, this.startAngle + this.angleRotate + $$.PI / 2, this.endAngle + this.angleRotate + $$.PI / 2, false);
    ctx.stroke();

    ctx.beginPath();
    	ctx.arc(this.x, this.y, this.r, this.startAngle + this.angleRotate - $$.PI / 2, this.endAngle + this.angleRotate - $$.PI / 2, false);
    ctx.stroke();

    ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, $$.PI * 2, false);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1.0;
    ctx.stroke();

    ctx.beginPath();
        ctx.arc(this.x, this.y, this.r+this.r/2, 0, $$.PI * 2, false);
        ctx.strokeStyle = this.colors.wideZone;
        ctx.lineWidth = 30.0;
    ctx.stroke();

    ctx.beginPath();
        ctx.arc(this.x, this.y, this.r+this.r/2 + 10, 0, $$.PI * 2, false);
        ctx.strokeStyle = this.colors.main;
        ctx.lineWidth = 1.0;
    ctx.stroke();

    ctx.beginPath();
        ctx.arc(this.x, this.y, this.r/2 - 4, 0, $$.PI * 2, false);
        ctx.strokeStyle = this.colors.fillCenter;
        ctx.lineWidth = this.r - 8;
    ctx.stroke();

    ctx.beginPath();
        ctx.arc(this.x, this.y, this.circleAnim, 0, $$.PI * 2, false);
        ctx.strokeStyle = this.colors.circle;
        ctx.lineWidth = 1;
    ctx.stroke();

    if(this.circleAnim >= this.r - 8){
    	this.circleAnim = 0;
    }else{
    	this.circleAnim += 0.5;
    }

    this.angleRotate += $$.DEG * this.rotateSpeed * this.direction;
};