function Game (config) {
	for(var k in config){
		this[k] = config[k];
	}
}

module.exports = Game;