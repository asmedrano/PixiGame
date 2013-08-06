var GAME = GAME || {};

GAME.Charectors = {
	list : [],
};

/*************** CONTANTS *************/
GAME.Charectors.TYPES = {
	/*A list of acceptable types of charectors and thier textures*/
	'test':{
		texture : "img/assets/bunny.png",
		weapon : "rifle",

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
		
	// CREATE TEXTURE
	var texture = PIXI.Texture.fromImage(self.type_def.texture);
	self.sprite = new PIXI.Sprite(texture);
	self.sprite.buttonMode = true;
    	self.sprite.setInteractive(true);
}

GAME.Charectors.BaseCharector.prototype.add = function(){
	/*add Charector to stage and game*/
	var self = this;
	GAME.Charectors.list.push(self);
	GAME.Stage.addChild(self.sprite);
	self.moveTo(0,0);
}
GAME.Charectors.BaseCharector.prototype.moveTo = function(x, y){
	var self = this;
	self.sprite.position.x = x;
	self.sprite.position.y = y;
}
