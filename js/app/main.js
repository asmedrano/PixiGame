
var GAME = GAME || {};

// create an new instance of a pixi stage

GAME.Stage = new PIXI.Stage(0xE3E3E3, true);

// create a renderer instance.

GAME.Renderer = null;
GAME.Conf = {
	width:600,
	height:600,
	player_area_width:200
}

GAME.UI = {
	player_area : null,
	stage : null
}

GAME.Grid = {
	divisor:20,
	vert_size : 0,
	horz_size : 0,

};

extend(GAME, {
	init:function(){
		//this.Conf.width = window.innerWidth - this.Conf.player_area_width - 5;
		//this.Conf.height = this.Conf.width //window.innerHeight;
		this.draw_ui();
		this.Renderer = PIXI.autoDetectRenderer(this.Conf.width, this.Conf.height);
		document.getElementById('stage').appendChild(this.Renderer.view);
		this.generate_grid();
		requestAnimFrame(render);
		
	},
	render:function(){
		this.Renderer.render(this.Stage);
		//console.log(this.check_mouse_bounds());
		//console.log();
	},
	generate_grid:function(){
		/*GRID BASED GAME so lets draw a 100 X 100 grid*/
		this.Grid.horz_poss_list = []; // where the horizontal lines begin the Y that is
		this.Grid.vert_poss_list = []; // where the vertical lines begin, the X that is
		this.Grid.vert_size = this.Conf.width / this.Grid.divisor;  // how big are the spaces between the vertical lines? AKA width
		this.Grid.horz_size = this.Conf.height / this.Grid.divisor; // how big are the spaces between the horizontal lines AKA height
		this.Grid.grid_bounds = {};

		// calculate all the line positions
		for(var i=0;i < this.Grid.divisor; i++){
			var x = this.Grid.vert_size * i;
			var y =  this.Grid.horz_size * i;
			this.Grid.horz_poss_list.push(y);
			this.Grid.vert_poss_list.push(x);
		}
		var grid_id;
		// create bounds objects
		var incr = 0;
		for(var i = 0; i<this.Grid.divisor; i++){
			for(var j=0; j < this.Grid.divisor; j++){
				incr++;
				grid_id = incr;
				this.Grid.grid_bounds[grid_id] = {
					start_x: this.Grid.vert_poss_list[i], 
					end_x : this.Grid.vert_poss_list[i] + this.Grid.vert_size,
					start_y: this.Grid.horz_poss_list[j],
					end_y : this.Grid.horz_poss_list[j] + this.Grid.horz_size
				};
			}
		}

		this.draw_grid();
		
	},
	draw_grid:function(){
		// draw the gridd
		var vert_graphics = new PIXI.Graphics();
		var horz_graphics = new PIXI.Graphics();
		var grid_color = 0xb4b4b4;
		vert_graphics.lineStyle(1, grid_color);
		horz_graphics.lineStyle(1, grid_color);

		for(var i =0; i< this.Grid.divisor; i++){
			// draw vertical/horz lines
			vert_graphics.moveTo(this.Grid.vert_poss_list[i], 0);
			vert_graphics.lineTo(this.Grid.vert_poss_list[i], this.Conf.height);
			horz_graphics.moveTo(0, this.Grid.horz_poss_list[i]);
			horz_graphics.lineTo(this.Conf.width, this.Grid.horz_poss_list[i]);
			
		}

		this.Stage.addChild(vert_graphics);
		this.Stage.addChild(horz_graphics);

	},	
	draw_ui:function(){
		this.UI.player_area = document.getElementById("player-area");
		this.UI.player_area.style.width = this.Conf.player_area_width + "px";
		this.UI.player_area.style.height = this.Conf.height + "px";

		this.UI.stage = document.getElementById("stage");
		this.UI.stage.style.width = this.Conf.width + "px";

	},
	check_mouse_bounds:function(){
		var mLoc = this.Stage.getMousePosition();
		var bnds;
		var result = false;
		// check to see if the mouse is within the a grid block
		for(var i in this.Grid.grid_bounds){
			bnds = this.Grid.grid_bounds[i];
			if(mLoc.y > bnds.start_y && mLoc.y<bnds.end_y && mLoc.x > bnds.start_x && mLoc.x < bnds.end_x){
				result = i;
				break;
			}
		}
		return result;
			
	},
	add_charector:function(type, position){
		/*
		 * @method add_charector
		 * @param type{String} the valid type of charector
		 * @param position{Integer} a location on the grid. See GAME.Grid.grid_boudns
		 * */
		var charector = new GAME.Charectors.BaseCharector(type);
		if(charector !== false){
			if(GAME.Grid.grid_bounds.hasOwnProperty(position)){
				var poss = GAME.Grid.grid_bounds[position];
				charector.add();
				charector.moveTo(poss.start_x, poss.start_y);
				return charector.gid;
			}else{
				log('add_charector: No poss: ' + position, "Not adding Charector");
				return false;
			}
		}

	},
	remove_charector:function(id){
		/*
		 * @method remove_charector: Remove a charector by its id
		 * @param a valid gid
		 */
		if(GAME.Charectors.list.hasOwnProperty(id)){
			GAME.Charectors.list[id].instance.remove();
			return true;	
		}else{
			log('remove_charector: Invalid Id');
			return false;
		}
	},
	move_charector:function(id, position){
		if(GAME.Charectors.list.hasOwnProperty(id)){
			var poss = GAME.Grid.grid_bounds[position];
			GAME.Charectors.list[id].instance.moveTo(poss.start_x, poss.start_y);
			return true;
		}else{
			log('move_charector: Invalid Id');
			return false;
		}

	},	
});


function render(){
	requestAnimFrame(render);
	GAME.render();
}

function log(){
	if(DEBUG){
 		var args = [].join.call(arguments, ' ')
		console.log(args);
	}
}


GAME.init();



/*===============OS utils============================================*/

// extend.js
// written by andrew dupont, optimized by addy osmani
function extend(destination, source) {
    var toString = Object.prototype.toString,
        objTest = toString.call({});
    for (var property in source) {
        if (source[property] && objTest == toString.call(source[property])) {
            destination[property] = destination[property] || {};
            extend(destination[property], source[property]);
        } else {
            destination[property] = source[property];
        }
    }
    return destination;
};

