var Node = function(obj){
	this.obj = obj;
	this.next = null;
}

var Queue = function(){
	this.head = new Node(null);
	this.tail = new Node(null);
	this.head.next = this.tail;
	this.l = 0;
}

Queue.prototype = {
	enqueue: function(obj){
		var node = new Node(obj);
		this.isEmpty() ? (this.head.next = node) : (this.getLast().next = node);
		node.next = this.tail;
		this.l ++;
	}

	,dequeue: function(){
		if(this.isEmpty()){ return;}
		var first = this.head.next;
		this.head.next = first.next;
		// delete first;
		this.l --;
		return first;
	}

	,getLast: function(){
		if(this.isEmpty()){ return null;}
		var tmp = this.head;
		for (var i = 0; i < this.l; i++) {
			tmp = tmp.next;
		};

		return tmp;
	}

	,getFirst: function(){
		if(this.isEmpty()){ return null;}
		return this.head.next;
	}

	,isEmpty: function(){
		return this.l === 0;
	}
}
