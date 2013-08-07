/*
 * Requires uuid.js
 * */
var GAME = GAME || {};

GAME.Charectors = {
	list : {},
};

/*************** CONTANTS *************/
GAME.Charectors.TYPES = {
	/*A list of acceptable types of charectors and thier textures*/
	'test':{
		texture : "img/assets/bunny.png",
		weapon : "rifle",
		travel_range: 1, // how many spaces can we move

	}
}

GAME.Charectors.WEAPONS = {
	'rifle':{
		'damage':.1 // how much damage this Weao causes
	}
}

/*************** CHARECTOR DEF *************/
GAME.Charectors.BaseCharector = function(type){
	var self = this;
	if(!GAME.Charectors.TYPES.hasOwnProperty(type)){
		return false;	
	}
	self.type = type;
	self.type_def = GAME.Charectors.TYPES[type]; // pulled from GAME.Charectors.TYPES
	self.weapon_def = GAME.Charectors.WEAPONS[self.type_def.weapon];
	self.life = 1; // 100%
	self.gid = uuid.v4();
		
	// CREATE TEXTURE
	var texture = PIXI.Texture.fromImage(self.type_def.texture);
	self.sprite = new PIXI.Sprite(texture);
	// shove and extra prop into sprite
	self.sprite.gid = self.gid;
	self.sprite.buttonMode = true;
    	self.sprite.setInteractive(true);
}

GAME.Charectors.BaseCharector.prototype.add = function(){
	/*add Charector to stage and game*/
	var self = this;
	var gid = 0; // a uuid for this charector to be identified in the game
	GAME.Charectors.list[self.gid] = {'id':self.gid, 'instance':self};
	GAME.Stage.addChild(self.sprite);
	self.moveTo(0,0);
}

GAME.Charectors.BaseCharector.prototype.remove = function(){
	/*remove this charector from the game*/
	var self = this;
	delete GAME.Charectors.list[self.gid];
	GAME.Stage.removeChild(self.sprite);
}


GAME.Charectors.BaseCharector.prototype.moveTo = function(x, y){
	var self = this;
	self.sprite.position.x = x;
	self.sprite.position.y = y;
}
