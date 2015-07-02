	$$.keys = {
		state: {
			left: 0,
			right: 0
		}
	};
	$$.mouse = {
		ax: 0,
		ay: 0,
		down: 0
	}

	window.addEventListener( 'mousemove', mousemovecb );
	window.addEventListener( 'mousedown', mousedowncb );
	window.addEventListener( 'mouseup', mouseupcb );
	window.addEventListener( 'keyup', keyupcb );
	window.addEventListener( 'keydown', keydowncb );

	function mouseupcb (e) {
		e.preventDefault();
		$$.mouse.down = 0;
	}

	function mousedowncb (e) {
		e.preventDefault();
		$$.mouse.down = 1;
	}

	function mousemovecb( e ) {
		e.preventDefault();
		$$.mouse.ax = e.pageX;
		$$.mouse.ay = e.pageY;
	};


	function keyupcb (e) {
		var e = ( e.keyCode ? e.keyCode : e.which );
		if( e === 39 || e === 68 ){ 
			$$.keys.state.left = 0;
		}
		if( e === 37 || e === 65 ){
			$$.keys.state.right = 0;
		}
		if( e === 49 ){
			$$.selectedAbility = $$.abilities.Def;
			for(var i in $$.abilitiesbar){
				$$.abilitiesbar[i].selected = false;
				if($$.abilitiesbar[i].name == $$.selectedAbility.name){
					$$.abilitiesbar[i].selected = true;
				}
			}
		}
		if( e === 50 ){
			$$.selectedAbility = $$.abilities.Hook;
			for(var i in $$.abilitiesbar){
				$$.abilitiesbar[i].selected = false;
				if($$.abilitiesbar[i].name == $$.selectedAbility.name){
					$$.abilitiesbar[i].selected = true;
				}
			}
		}
	}

	function keydowncb (e) {
		var e = ( e.keyCode ? e.keyCode : e.which );
		if( e === 39 || e === 68 ){ 
			$$.keys.state.left = 1;
		}
		if( e === 37 || e === 65 ){ 
			$$.keys.state.right = 1;
		}
	}
