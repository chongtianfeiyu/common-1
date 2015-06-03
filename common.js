/*
Copyright (C) 2015 fangqi

License: lld

name: Common
description:　通用类,提供常用方法接口
version: 0.0.1
repository: git https://github.com/poilkjmn22/common.git

*/
var Common = window.Common || {};

/*基础类*/
Common.Base = function(){
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

// Set up requestAnimationFrame and cancelAnimationFrame for use in the game code
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x] + 'CancelAnimationFrame'] || 
window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}());

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

/*Common.Base END!!*/
}();

/*工具类*/
Common.Util = new function(){
  var self = this;
  /*Event*/
  self.Event = function(){
    return { //当需求为获得的坐标值相对于body时，用：
      mousePositionBody: function(event){
          var event = event||window.event;
          //获得相对于body定位的横标值；
          var px=event.clientX
          //获得相对于body定位的纵标值；
          var py=event.clientY;

          return {
            x: px
            ,y: py
          };
      }
      
      //当需求为获得的坐标值相对于某一对象时，用：
      ,mousePositionObj: function(event,el){
          //获得对象相对于页面的横坐标值；id为对象的id
          var thisX = el.offsetLeft;
          //获得对象相对于页面的横坐标值；
          var thisY = el.offsetTop;
          //获得页面滚动的距离;
          //注：document.documentElement.scrollTop为支持非谷歌内核；document.body.scrollTop为谷歌内核
          var thisScrollTop = document.documentElement.scrollTop + document.body.scrollTop;
          var event = event||window.event;
          //获得相对于对象定位的横标值 = 鼠标当前相对页面的横坐标值 - 对象横坐标值；
          var px = event.clientX - thisX;
          //获得相对于对象定位的纵标值 = 鼠标当前相对页面的纵坐标值 - 对象纵坐标值 + 滚动条滚动的高度；
          var py = event.clientY - thisY + thisScrollTop;

          return {
            x: px
            ,y: py
          };
      }
    }
  }();

  /*Canvas*/
  self.Canvas = function(canvasid, config){//config:{imgW: {number}, imgH: {number}};
    this.canvas =  document.getElementById(canvasid) || canvasid;
    this.context =  this.canvas.getContext("2d");
    this.fillStyle =  "#888";
    this.strokeStyle =  "#36f";
    this.imgSrc = "";
    !config ? false: (this.imgOrgWidth = config.imgW, this.imgOrgHeight = config.imgH);
  
    this.stage = undefined;
    this.listening = false;
    
    // desktop flags
    this.mousePos = null;
    this.mouseDown = false;
    this.mouseUp = false;
    this.mouseOver = false;
    this.mouseMove = false;
    
    // mobile flags
    this.touchPos = null;
    this.touchStart = false;
    this.touchMove = false;
    this.touchEnd = false;
    
    // Region Events
    this.currentRegion = null;
    this.regionIndex = 0;
    this.lastRegionIndex = -1;
    this.mouseOverRegionIndex = -1;
  };

  /*get;set;*/
  self.Canvas.prototype.getCanvas = function(){
    return this.canvas;
  }

  self.Canvas.prototype.getContext = function(){
    return this.context;
  }

  self.Canvas.prototype.init =  function(w, h){
    var self = this;
    arguments.length > 1 ? self.resize(w, h) : self.resizeImg(w);
    if(this.imgSrc){
      var imgObj = new Image();
      imgObj.src = this.imgSrc;
      imgObj.onload  =  function(){
        self.clear();
        self.context.drawImage(imgObj, 0 , 0, self.canvas.width, self.canvas.height);
      }
    }
  }

  self.Canvas.prototype.resize =  function(w,h){
    if(! this.canvas){ return;}
    this.canvas.width = w;
    this.canvas.height = h;
  }

  self.Canvas.prototype.resizeImg =  function(w){
    if(! this.canvas){ return;}
    this.canvas.width = w;
    this.canvas.height = w * this.imgOrgHeight / this.imgOrgWidth;
  }

  self.Canvas.prototype.clear =  function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  self.Canvas.prototype.getMousePosOnCanvas = function(evt){
    var rect = this.canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }

  self.Canvas.prototype.getCanvasPos = function(){
    var obj = this.getCanvas();
    var top = 0;
    var left = 0;
    while (obj.tagName != "BODY") {
        top += obj.offsetTop;
        left += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    return {
        top: top,
        left: left
    };
  }

  self.Canvas.prototype.setStage = function(func){
    this.stage = func;
    this.listen();
  };

  self.Canvas.prototype.reset = function(evt){
    if (!evt) {
        evt = window.event;
    }
    
    this.setMousePosition(evt);
    this.setTouchPosition(evt);
    this.regionIndex = 0;
    
    if (this.stage !== undefined) {
        this.stage();
    }
    
    // desktop flags
    this.mouseOver = false;
    this.mouseMove = false;
    this.mouseDown = false;
    this.mouseUp = false;
    
    // mobile touch flags
    this.touchStart = false;
    this.touchMove = false;
    this.touchEnd = false;
  };
  self.Canvas.prototype.listen = function(){
    var that = this;
    
    if (this.stage !== undefined) {
        this.stage();
    }
    
    // desktop events
    this.canvas.addEventListener("mousedown", function(evt){
        that.mouseDown = true;
        that.reset(evt);
    }, false);
    
    this.canvas.addEventListener("mousemove", function(evt){
        that.reset(evt);
    }, false);
    
    this.canvas.addEventListener("mouseup", function(evt){
        that.mouseUp = true;
        that.reset(evt);
    }, false);
    
    this.canvas.addEventListener("mouseover", function(evt){
        that.reset(evt);
    }, false);
    
    this.canvas.addEventListener("mouseout", function(evt){
        that.mousePos = null;
    }, false);
    
    // mobile events
    this.canvas.addEventListener("touchstart", function(evt){
        evt.preventDefault();
        that.touchStart = true;
        that.reset(evt);
    }, false);
    
    this.canvas.addEventListener("touchmove", function(evt){
        evt.preventDefault();
        that.reset(evt);
    }, false);
    
    this.canvas.addEventListener("touchend", function(evt){
        evt.preventDefault();
        that.touchEnd = true;
        that.reset(evt);
    }, false);
  };

  self.Canvas.prototype.getMousePos = function(evt){
    return this.mousePos;
  }

  self.Canvas.prototype.getTouchPos = function(evt){
    reutn this.touchPos;
  }

  self.Canvas.prototype.setMousePosition = function(evt){
    var mouseX = evt.clientX - this.getCanvasPos().left + window.pageXOffset;
    var mouseY = evt.clientY - this.getCanvasPos().top + window.pageYOffset;
    this.mousePos = {
        x: mouseX,
        y: mouseY
    };
  };

  self.Canvas.prototype.setTouchPosition = function(evt){
    if (evt.touches !== undefined && evt.touches.length == 1) { // Only deal with one finger
      var touch = evt.touches[0]; // Get the information for finger #1
      var touchX = touch.pageX - this.getCanvasPos().left + window.pageXOffset;
      var touchY = touch.pageY - this.getCanvasPos().top + window.pageYOffset;
      
      this.touchPos = {
          x: touchX,
          y: touchY
      };
    }
  };

  self.Canvas.prototype.beginRegion = function(){
    this.currentRegion = {};
    this.regionIndex++;
  };

  self.Canvas.prototype.addRegionEventListener = function(type, func){
    var event = (type.indexOf('touch') == -1) ? 'on' + type : type;
    this.currentRegion[event] = func;
  };

  self.Canvas.prototype.closeRegion = function(){
    var pos = this.touchPos || this.mousePos;
    
    if (pos !== null && this.context.isPointInPath(pos.x, pos.y)) {
      if (this.lastRegionIndex != this.regionIndex) {
          this.lastRegionIndex = this.regionIndex;
      }
      
      // handle onmousedown
      if (this.mouseDown && this.currentRegion.onmousedown !== undefined) {
          this.currentRegion.onmousedown();
          this.mouseDown = false;
      }
      
      // handle onmouseup
      else if (this.mouseUp && this.currentRegion.onmouseup !== undefined) {
          this.currentRegion.onmouseup();
          this.mouseUp = false;
      }
      
      // handle onmouseover
      else if (!this.mouseOver && this.regionIndex != this.mouseOverRegionIndex && this.currentRegion.onmouseover !== undefined) {
          this.currentRegion.onmouseover();
          this.mouseOver = true;
          this.mouseOverRegionIndex = this.regionIndex;
      }
      
      // handle onmousemove
      else if (!this.mouseMove && this.currentRegion.onmousemove !== undefined) {
          this.currentRegion.onmousemove();
          this.mouseMove = true;
      }
      
      // handle touchstart
      if (this.touchStart && this.currentRegion.touchstart !== undefined) {
        this.currentRegion.touchstart();
        this.touchStart = false;
      }
      
      // handle touchend
      if (this.touchEnd && this.currentRegion.touchend !== undefined) {
          this.currentRegion.touchend();
          this.touchEnd = false;
      }
      
      // handle touchmove
      if (!this.touchMove && this.currentRegion.touchmove !== undefined) {
          this.currentRegion.touchmove();
          this.touchMove = true;
      }
        
    }
    else if (this.regionIndex == this.lastRegionIndex) {
      this.lastRegionIndex = -1;
      this.mouseOverRegionIndex = -1;
      
      // handle mouseout condition
      if (this.currentRegion.onmouseout !== undefined) {
          this.currentRegion.onmouseout();
      }
    }
  };
//Common.Util END!  
};