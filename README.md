# Common
命名空间

# Common.Base

#Common.Base.bind
bind(fn, context)
将fn的this改为context
#Common.Base.inheritPrototype
inheritPrototype(subType, superType)
寄生组合式继承
#Common.Base.extend
extend(destination,source)
对象或数组的深拷贝

# Common.Util

#Common.Util.Event Common.Util.Event.mousePositionBody(event) 获得的坐标值相对于body
Common.Util.Event.addEvent(el, type, fn, capture) 给Dom对象添加事件绑定,
加入了对鼠标滚轮事件的跨浏览器（IE7,8,9,opera,chrome,opera）支持。 #Common.Util.Canvas
constructor(canvas) canvas 为canvas的id 或者其dom引用
Common.Util.Canvas.getMousePos(evt) 获取鼠标相对canvas原点的坐标值
Common.Util.Canvas.resize(w,h) 重新调整canvas元素大小,(移动设备)


