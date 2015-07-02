$$.player = null;


$$.Player = function (config) {
    for(var k in config){
        this[k] = config[k];
    }

    this.nicknameHUD = new $$.Text({
        x: 0,
        y: 0,
        text: "your hero",
        color: "lime",
        size: 1,
        align: "center"
    });

    this.healthbar = new $$.HealthBar($$.config.HealthBar);
    this.healthbar.color = "lime";


    this.circleAnim = 0;
    this.lastShoot = new Date().getTime();
    this.setPos = function (nx, ny) {
    	this.x = nx;
    	this.y = ny;
        this.nicknameHUD.x = nx;
        this.nicknameHUD.y = ny;
        this.healthbar.x = nx;
        this.healthbar.y = ny;
    }
    this.setName = function (name) {
        this.name = name;
        //this.nicknameHUD.text = name;
    }
    this.planet = null;
    this.setPlanet = function (planet) {
    	this.planet = planet;
    }
    this.calcAngle = function (x, y) {
        var angle = Math.acos((x - this.planet.x) / this.planet.r);
        if(y - this.planet.y > 0){
            angle = $$.PI + ($$.PI - angle);
        }
        angle = $$.PI * 2 - angle;
        this.angleRotate = angle;
        
    }

    $$.texts[this.nicknameHUD.text] = this.nicknameHUD;
}

$$.Player.prototype.update = function () {

    var vx = Math.cos(this.angleRotate)*(this.planet.r+this.r+2);
    var vy = Math.sin(this.angleRotate)*(this.planet.r+this.r+2);


    this.x = this.planet.x + vx;
    this.y = this.planet.y + vy;

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

    if($$.keys.state.left == 0 && $$.keys.state.right == 0) {
        this.angleRotate += $$.DEG * this.planet.rotateSpeed * this.planet.direction;
    }else{
        if($$.keys.state.left > 0 && $$.keys.state.right > 0){
            this.angleRotate += $$.DEG * this.planet.rotateSpeed * this.planet.direction;
        }else{
            if($$.keys.state.left > 0) {
                this.angleRotate -= $$.DEG * this.runSpeed * this.planet.direction;
            }else{
                this.angleRotate += $$.DEG * this.runSpeed * this.planet.direction;
            }
        }
    }

    var lt = this.lastShoot,
        nt = $$.getTime(),
        cd = $$.selectedAbility.cd;
    if($$.mouse.down > 0 && lt + cd <= nt){
        $$.bullets.push(new $$.Shoot(this.x, this.y, $$.mouse.ax, $$.mouse.ay, $$.selectedAbility.name, true));
        this.lastShoot = nt;
        
        // SOCKET ATTACK //
      
        $$.socket.emit('sendShot', {
            position: { x: this.x, y: this.y, amx: $$.mouse.ax, amy: $$.mouse.ay },
            type: $$.selectedAbility.name,
            name: this.name
        });
    }


    // SOCKET MOVE //

    $$.socket.emit('move', {
        position: { x: this.x, y: this.y },
        name: this.name
    });

    if(this.health <= 0){
        // SOCKET I DEAD //
        $$.socket.emit('iAmDead', {name: this.name });
        this.health = 100;
    }

}