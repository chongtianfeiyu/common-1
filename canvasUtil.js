var self.Canvas = function(canvasid){
	this.canvas =  document.getElementById(canvasid) || canvasid;
	this.context =  this.canvas.getContext("2d");
	this.fillStyle =  "#888";
	this.strokeStyle =  "#36f";
}
/*	
* get,set
*/
self.Canvas.prototype.init =  function(){
}

self.Canvas.prototype.resize =  function(w,h){
	if(! this.canvas){ return;}
	this.canvas.width = w;
	this.canvas.height = h;
}

self.Canvas.prototype.clear =  function(){
	this.canvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
