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

#Common.Util.Event
Common.Util.Event.mousePositionBody(event)
获得的坐标值相对于body
Common.Util.Event.mousePositionObj(event, el)
获得的坐标值相对于某一Dom对象
#Common.Util.Canvas
constructor(canvas)
canvas 为canvas的id 或者其dom引用

