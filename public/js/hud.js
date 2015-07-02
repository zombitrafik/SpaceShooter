$$.abilitiesbar = [];


$$.Line = function (config) {
	this.update = function () {
		hudctx.beginPath();
		hudctx.moveTo(config.sx, config.sy);
		hudctx.lineTo(config.ex, config.ey);
		hudctx.strokeStyle = config.color;
		hudctx.lineWidth = config.lineWidth;
		hudctx.stroke();
	}	
}

var wline = new $$.Line({
	sx: 0,
	sy: level.height - $$.config.AbilitiesBar.height,
	ex: level.width,
	ey: level.height - $$.config.AbilitiesBar.height,
	color: 'silver',
	lineWidth: 3
});

var abarLine = new $$.Line({
	sx: 0,
	sy: level.height - $$.config.AbilitiesBar.height + $$.config.AbilitiesBar.height / 2,
	ex: level.width,
	ey: level.height - $$.config.AbilitiesBar.height + $$.config.AbilitiesBar.height / 2,
	color: 'rgba(80, 80, 80, 0.8)',
	lineWidth: $$.config.AbilitiesBar.height
});

$$.abilitiesbar.push(abarLine);
$$.abilitiesbar.push(wline);

$$.AbilitiesBar = function (config) {
	this.image = new Image();
	this.image.onload = function() {
		this.isLoading = true;
	};	
	for(var k in config){
		this[k] = config[k];
	}
	this.image.src = this.src;

	this.key = new $$.Text({
        x: this.x + (this.sizeX / 2) - 5,
        y: this.y + (this.sizeY / 2) + 25,
        text: this.number,
        color: "rgba(13, 153, 244, 1)",
        size: 1.5,
        align: ""
    });

    $$.texts[this.key.text] = this.key;
};

$$.AbilitiesBar.prototype.update = function () {
    hudctx.drawImage(this.image, this.x, this.y, this.sizeX, this.sizeY);
    if(this.selected){
		hudctx.beginPath();
	        hudctx.arc(this.x + this.sizeX / 2, this.y + this.sizeY / 2, this.sizeX / 2, 0, $$.PI * 2, false);
	        hudctx.strokeStyle = "white";
	        hudctx.lineWidth = 3;
	    hudctx.stroke();
	    this.key.color = "white";
	}else{
		this.key.color = "rgba(13, 153, 244, 1)"
	}
}


var icons = {
	def: new $$.AbilitiesBar($$.config.AbilitiesBar.Def),
	hook: new $$.AbilitiesBar($$.config.AbilitiesBar.Hook)
}
for(var i in icons){
	$$.abilitiesbar.push(icons[i]);
}

