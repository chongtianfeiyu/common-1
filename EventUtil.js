/*
Copyright (C) 2015 fangqi

License: lld

name: EventUtil
description:　浏览器事件工具类,提供常用事件处理方法
version: 0.0.1
repository: git https://github.com/poilkjmn22/fq.git
dependencies: null
*/
var EventUtil = function(){
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
