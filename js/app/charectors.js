var GAME = GAME || {};

GAME.Charectors = {
	list : [],
};

GAME.Charectors.TYPES = {
	/*A list of acceptable types of charectors and thier textures*/
	'test':{
		texture : "img/assets/sample_texture.png",
	}
}

GAME.Charectors.BaseCharector = function(type){
	var self = this;
	if(!GAME.Charectors.TYPES.hasOwnProperty(type)){
		return false;	
	}
	self.type = type;
	self.type_def = GAME.Charectors.TYPES[type]; // pulled from GAME.Charectors.TYPES
	var texture = PIXI.Texture.fromImage(self.type_def.texture);
	self.sprite = new PIXI.Sprite(texture);
	self.sprite.anchor.x = 0.5;
    	self.sprite.anchor.y = 0.5;
}
GAME.Charectors.BaseCharector.prototype.add = function(){
	/*add Charector to stage and game*/
	var self = this;
	GAME.Charectors.list.push(self);
	GAME.Stage.addChild(self.sprite);
	self.moveTo(100,100);
}
GAME.Charectors.BaseCharector.prototype.moveTo = function(x, y){
	var self = this;
	self.sprite.position.x = x;
	self.sprite.position.y = y;
}
