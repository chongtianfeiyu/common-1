var singleton = function(fn) { //回调函数调用生成单例对象的方法
	var result;
	return function() {
		return result || (result = fn.apply(this, arguments));
	};
};

var createMask = singleton(function(div) {
	return $(document.body).append(div);
});