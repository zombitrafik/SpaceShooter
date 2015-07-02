$$.abilities = {
	Def: {
		name: "def",
		config: $$.config.Bullet,
		cd: 80
	},
	Hook: {
		name: "hook",
		config: $$.config.Hook,
		cd: 300
	}
};

$$.selectedAbility = $$.abilities.Hook;

$$.Shoot = function (x, y, amx, amy, type, isMe) {
	switch(type){
		case "def":
			return new $$.Bullet(x, y, amx, amy, $$.abilities.Def.config);
		break;
		case "hook":
			return new $$.Hook(x, y, amx, amy, $$.abilities.Hook.config, isMe);
		break;
		default:

		break;
	}
}

$$.defaultBullet = function (config) {
	
}