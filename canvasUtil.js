var CanvasUtil = function(canvasid){
	this.canvas =  document.getElementById(canvasid) || canvasid;
	this.context =  this.canvas.getContext("2d");
	this.fillStyle =  "#888";
	this.strokeStyle =  "#36f";
}
/*	
* get,set
*/
CanvasUtil.prototype.init =  function(){
}

CanvasUtil.prototype.resize =  function(w,h){
	if(! this.canvas){ return;}
	this.canvas.width = w;
	this.canvas.height = h;
}

CanvasUtil.prototype.clear =  function(){
	this.canvas.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
