$$.PI = Math.PI;
$$.DEG = $$.PI / 180;


$$.config = {

	planets: {
		Earth : {
			x: 0,
			y: 0,
			r: 50,
			name: "Earth",
			rotateSpeed: 0,
			angleRotate: 0,
			startAngle: 1,
			endAngle: 2,
			direction: 1,
			colors: {
				main: "green",
				circle: "rgba(108, 206, 203, 0.8)",
				wideZone: "rgba(0, 100, 0, 0.1)",
				fillCenter: "rgba(142, 220, 157, 0.5)"
			}
		},
		Mars : {
			x: 0,
			y: 0,
			r: 30,
			name: "Mars",
			rotateSpeed: 2,
			angleRotate: 0,
			startAngle: 0.2,
			endAngle: 1.2,
			direction: -1,
			colors: {
				main: "rgba(241, 112, 34, 0.8)",
				circle: "rgba( 253, 184, 19, 0.5)",
				wideZone: "rgba( 246, 139, 31, 0.1)",
				fillCenter: "rgba( 61, 33, 23, 0.5)"
			}
		}
	},

	Player: {
		x: 0,
		y: 0,
		r: 10,
		health: 100,
		name: "Player",
		planet: null,
		angleRotate: 0,
		runSpeed: 1.5,
		cooldown: 80,
		colors: {
			main: "rgba(24, 118, 250, 1)",
			circle: "rgba(41, 209, 250, 1)"
		}
	},

	Enemy: {
		x: 0,
		y: 0,
		r: 10,
		health: 100,
		colors: {
			main: "rgba(215, 40, 40, 1)",
			circle: "rgba(219, 67, 49, 1)"
		}
	},

	Bullet: {
		length: 6,
		lineWidth: 2,
		speed: 2,
		color: "white",
		damage: 5
	},

	ExplosionOther: {
		radius: 10,
		color: "white",
		speed: 0.5
	},

	ExplosionEnemy: {
		radius: 6,
		color: "orange",
		speed: 0.4
	},

	HealthBar: {
		x: 0,
		y: 0,
		length: 60,
		height: 5,
		color: "white",
		health: 100
	}
}

$$.levels = {
	0 : {
		bgcolor: "rgba(30, 30, 30, 1)",
		width: 600, 
		height: 600,
		planets: [
			{ type: $$.config.planets.Earth, x: 200, y: 120 },
			{ type: $$.config.planets.Earth, x: 400, y: 480 },
			{ type: $$.config.planets.Mars, x: 100, y: 450 },
			{ type: $$.config.planets.Mars, x: 500, y: 150 }
		]
	}
}