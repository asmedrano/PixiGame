/*
 * A number of helper functions meant to be run from the console.
 * */

DEBUG = true;
var g; // generic var to hold anything. 
function test_one_charector(){
	g = GAME.add_charector('test', 1);
	log(arguments.callee.name + ":", g);	
}

function test_remove_charector(){
	GAME.remove_charector(g);
}
