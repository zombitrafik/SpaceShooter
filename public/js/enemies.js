$$.enemies = [];


$$.Enemy = function (config) {
	for(var k in config){
		this[k] = config[k];
	}
	this.circleAnim = 0;

	this.nicknameHUD = new $$.Text({
        x: 0,
        y: 0,
        text: "Enemy",
        color: "red",
        size: 1,
        align: "center"
    });

    this.healthbar = new $$.HealthBar($$.config.HealthBar);
    this.healthbar.color = "red";

	this.setPos = function (x, y) {
		this.x = x;
		this.y = y;
		this.nicknameHUD.x = x;
        this.nicknameHUD.y = y;
	}
	this.setName = function (name) {
		this.name = name;
		this.nicknameHUD.text = name;
	}

	$$.texts[this.nicknameHUD.text] = this.nicknameHUD;
}

$$.Enemy.prototype.update = function () {

	this.nicknameHUD.x = this.x;
    this.nicknameHUD.y = this.y - this.r * 3;

    this.healthbar.x = this.x;;
    this.healthbar.y = this.y - this.r * 2;
    this.healthbar.health = this.health;
    this.healthbar.update();

	ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.strokeStyle = this.colors.main;
        ctx.lineWidth = 1;
    ctx.stroke();

    ctx.beginPath();
        ctx.arc(this.x, this.y, this.circleAnim, 0, Math.PI * 2, false);
        ctx.strokeStyle = this.colors.circle;
        ctx.lineWidth = 1;
    ctx.stroke();

    this.circleAnim -= 0.5;
    if(this.circleAnim <= 0){
        this.circleAnim = this.r;
    }
}