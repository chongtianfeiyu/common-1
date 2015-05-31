/*
Copyright (C) 2015 fangqi

License: lld

name: common
description:　通用类,提供常用方法接口
version: 0.0.1
repository: git https://github.com/poilkjmn22/fq.git

*/
var common = function(){
	function object(o){
       function F(){}
       F.prototype=o;
       return new F();
	};

	if(!Function.prototype.bind) { 
		Function.prototype.bind = function(oThis) { 
			if(typeof this !== 'function') { 
			throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable'); 
			} 

			var fSlice = Array.prototype.slice, 
			aArgs = fSlice.call(arguments, 1), 
			fToBind = this, 
			fNOP = function() {}, 
			fBound = function() { 
				return fToBind.apply(this instanceof fNOP ? this : oThis || window, aArgs.concat(fSlice.call(arguments)));
			}; 
			fNOP.prototype = this.prototype; 
			fBound.prototype = new fNOP();
		
			return fBound; 
		};
	} ;

  window.requestNextAnimationFrame = //请求动画的下一帧
   (function () {
      var originalWebkitRequestAnimationFrame = undefined,
          wrapper = undefined,
          callback = undefined,
          geckoVersion = 0,
          userAgent = navigator.userAgent,
          index = 0,
          self = this;

      // Workaround for Chrome 10 bug where Chrome
      // does not pass the time to the animation function
      
      if (window.webkitRequestAnimationFrame) {
         // Define the wrapper

         wrapper = function (time) {
           if (time === undefined) {
              time = +new Date();
           }
           self.callback(time);
         };

         // Make the switch
          
         originalWebkitRequestAnimationFrame = window.webkitRequestAnimationFrame;    

         window.webkitRequestAnimationFrame = function (callback, element) {
            self.callback = callback;

            // Browser calls the wrapper and wrapper calls the callback
            
            originalWebkitRequestAnimationFrame(wrapper, element);
         }
      }

      // Workaround for Gecko 2.0, which has a bug in
      // mozRequestAnimationFrame() that restricts animations
      // to 30-40 fps.

      if (window.mozRequestAnimationFrame) {
         // Check the Gecko version. Gecko is used by browsers
         // other than Firefox. Gecko 2.0 corresponds to
         // Firefox 4.0.
         
         index = userAgent.indexOf('rv:');

         if (userAgent.indexOf('Gecko') != -1) {
            geckoVersion = userAgent.substr(index + 3, 3);

            if (geckoVersion === '2.0') {
               // Forces the return statement to fall through
               // to the setTimeout() function.

               window.mozRequestAnimationFrame = undefined;
            }
         }
      }
      
      return window.requestAnimationFrame   ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame    ||
         window.oRequestAnimationFrame      ||
         window.msRequestAnimationFrame     ||

         function (callback, element) {
            var start,
                finish;

            window.setTimeout( function () {
               start = +new Date();
               callback(start);
               finish = +new Date();

               self.timeout = 1000 / 60 - (finish - start);

            }, self.timeout);
         };
      }
   )
();

    function getType(o){//获取对象的类型
        var _t;
        return ((_t = typeof(o)) == "object" ? o==null && "null" || Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();
    }
    

	return {
		inheritPrototype: function(subType, superType){
			var prototype=object(superType.prototype); //创建父类原型的一个副本 等同于使用Object.create(superType.prototype)
		    prototype.constructor=subType;   //为副本添加constructor属性,弥补重写原型而失去的constructor属性
		    subType.prototype=prototype; //将创建的对象(副本)赋值给子类的原型
		}

		/**
	    * 根据id查找数据源中的项
	    * @param {string} 要查找的id
	    * @param {string} 要查找的数据源
	    * @param {string} 数据源的项中value项的id属性名
	    * @returns {Object} 数据源中的项
	    */
		,findById: function(id, obj, propertyName){
			for (var key in obj){
				if(obj[key][propertyName] == id){
					return obj[key];
				}
			}

			return null;
		}

		,bind: function (fn, context){ 
			return function(){ 
				return fn.apply(context, arguments); 
			};
		}

    // ,requestAnimationFrame: function () {
    ,reqNextAnimationFrame: null

    ,extend: function(destination,source){//对象或数组的深拷贝
        for(var p in source)
        {
            if(getType(source[p])=="array"||getType(source[p])=="object")
            {
                destination[p]=getType(source[p])=="array"?[]:{};
                arguments.callee(destination[p],source[p]);
            }
            else
            {
                destination[p]=source[p];
            }
        }
    }

	}

}();
