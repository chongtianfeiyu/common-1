var copy = {
	src: [{a:5},{b:6}]
	,dest: []
	,shalowCopy: function(){
		this.dest = this.src.slice(0);
	}
	,deepCopy: function(){
		Common.Base.extend(this.dest, this.src);
	}
};

copy.deepCopy();

copy.dest[0].a = 10;