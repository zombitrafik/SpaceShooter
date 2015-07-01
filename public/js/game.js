
	var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                          window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	window.requestAnimationFrame = requestAnimationFrame;

	var canvas = document.getElementById("canvas"),
    ctx     = canvas.getContext('2d');

    var bgcanvas = document.getElementById("bgcanvas"),
    bgctx   = bgcanvas.getContext('2d');

    var bullcanvas = document.getElementById('bullcanvas'),
    bullctx	= bullcanvas.getContext('2d');

    var explcanvas = document.getElementById('explctx');
    explctx = explcanvas.getContext('2d');

    var hudcanvas = document.getElementById('hudcanvas');
    hudctx = hudcanvas.getContext('2d');

    var level = $$.levels[0];
    canvas.width = level.width;
    canvas.height = level.height;

    bgcanvas.width = level.width;
    bgcanvas.height = level.height;
    bgctx.fillStyle = level.bgcolor;
    bgctx.fillRect(0, 0, bgcanvas.width, bgcanvas.height);

    bullcanvas.width = level.width;
    bullcanvas.height = level.height;

    explcanvas.width = level.width;
    explcanvas.height = level.height;

    hudcanvas.width = level.width;
    hudcanvas.height = level.height;

    for(var i in level.planets){
    	var p = level.planets[i];
    	var pl = new $$.Planet(p.type);
    	pl.setPos(p.x, p.y);
    	$$.planets.push(pl);
    }


    var player = new $$.Player($$.config.Player);
    var ri = $$.RandomInt(0, $$.planets.length - 1);
    player.setPlanet($$.planets[ri]); 
    player.setName("User_"+(Math.random() * 100).toFixed(3));
    $$.player = player;
    $$.socket.emit('enjoy', {
        name: player.name,
        position: 
            { x: player.x, y: player.y }
        }
    );


    /*
    var enemy = new $$.Enemy($$.config.Enemy);
    ri = $$.RandomInt(0, $$.planets.length - 1);
    enemy.x = 100;
    enemy.y = 100;
    $$.enemies.push(enemy);
    */

	function GameLoop () {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		bullctx.clearRect(0, 0, canvas.width, canvas.height);
		explctx.clearRect(0, 0, canvas.width, canvas.height);
        hudctx.clearRect(0, 0, canvas.width, canvas.height);

		for(var i in $$.planets){
			$$.planets[i].update();
		}
		for(var i in $$.bullets){
			$$.bullets[i].update();
		}
		for(var i in $$.explosions){
			$$.explosions[i].update();
		}
        for(var i in $$.enemies){
            $$.enemies[i].update();
        }
        for(var i in $$.texts){
            $$.texts[i].update();
        }


        if($$.player)
        $$.player.update();
        
		window.requestAnimationFrame(GameLoop);
	}
	window.requestAnimationFrame(GameLoop);