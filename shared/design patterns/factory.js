var CvsUserControlFactory = function() {};
CvsUserControlFactory.prototype = { //通用工厂类,子类实现创建实例方法。
	appendTo: function(container, type, config) { //添加到容器中
		var cvsUserControl = this.create(type, config);
		container.append(cvsUserControl);
		return cvsUserControl;
	},
	create: function() {
		throw new Error("unsupported operation on an abstract class");
	}
};
var CvsIconFactory = function() {};
helper.inheritPrototype(CvsIconFactory, CvsUserControlFactory);

var CvsIcon = function(config) {
	$.extend(this, config);
	this.cvs = $('<canvas class="' + this.className + '" width="' + this.width + '" height="' + this.height + '"></canvas>').css({
		"left": this.left + "px",
		"top": this.top + "px"
	})[0];
	this.ctx = this.cvs.getContext("2d");
	this.ctx.lineWidth = this.lineWidth;
	this.ctx.shadowOffsetX = this.shadowOffsetX;
	this.ctx.shadowOffsetY = this.shadowOffsetY;
	this.ctx.shadowBlur = this.shadowBlur;
	this.ctx.strokeStyle = this.strokeStyle;
	this.ctx.shadowColor = this.shadowColor;
	this.ctx.fillStyle = this.fillStyle;

};
CvsIcon.prototype = {
	className: "p-a",
	left: 0,
	top: 0,
	width: 50,
	height: 50,
	lineWidth: 0,
	strokeStyle: "#888",
	fillStyle: "#2ecb71",
	shadowColor: "#fff",
	shadowOffsetX: 0,
	shadowOffsetY: 0,
	shadowBlur: 0,
	fillText: "",
	font: "20px Arial",
	fillCilcle: function(x,y,radius) {
		var ctx = this.ctx;
		ctx.beginPath();
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();
	}
};
CvsIconFactory.prototype.create = function(type, config) {
	var cvsIcon = null;
	switch (type) {
		case "add":
			cvsIcon = new CvsAddIcon(config);
			break;
		case "remove":
			cvsIcon = new CvsRemoveIcon(config);
			break;
		case "replace":
			cvsIcon = new CvsReplaceIcon(config);
		default:
			break;
	}

	return cvsIcon;
};

var CvsAddIcon = function(config) {
	CvsIcon.call(this, config);
	var cvs = this.cvs,
		ctx = this.ctx,
		centerX1 = cvs.height >> 1,
		centerY1 = cvs.height >> 1,
		lineLengthOffset = centerX1 * 0.6;

	this.fillCilcle(centerX1, centerY1, centerX1 - 2);
	ctx.lineWidth = 4;
	ctx.beginPath();
	ctx.moveTo(centerX1 - lineLengthOffset, centerY1);
	ctx.lineTo(centerX1 + lineLengthOffset, centerY1);
	ctx.moveTo(centerX1, centerY1 - lineLengthOffset);
	ctx.lineTo(centerX1, centerY1 + lineLengthOffset);
	ctx.stroke();
	if (this.fillText) {
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 0;
		ctx.font = this.font;
		// ctx.textBaseLine = "middle";
		ctx.fillText(this.fillText, cvs.height + 3, centerY1 + 8);
	}

	return $(cvs);
}

helper.inheritPrototype(CvsAddIcon, CvsIcon);
var CvsRemoveIcon = function(config) { //删除按钮
	CvsIcon.call(this, config);
	var cvs = this.cvs,
		ctx = this.ctx,
		centerX = cvs.width >> 1,
		centerY = cvs.height >> 1,
		crossLineOffset = centerX * 0.4;
	this.fillCilcle(centerX, centerY, centerX - 3);

	ctx.beginPath();
	ctx.moveTo(centerX - crossLineOffset, centerY - crossLineOffset);
	ctx.lineTo(centerX + crossLineOffset, centerY + crossLineOffset);
	ctx.moveTo(centerX - crossLineOffset, centerY + crossLineOffset);
	ctx.lineTo(centerX + crossLineOffset, centerY - crossLineOffset);
	ctx.stroke();

	return $(cvs);
};
helper.inheritPrototype(CvsRemoveIcon, CvsIcon);

var CvsReplaceIcon = function(config) { //更换按钮
	CvsIcon.call(this, config);
	var cvs = this.cvs,
		ctx = this.ctx,
		centerX = cvs.width >> 1,
		centerY = cvs.height >> 1,
		ratio = 0.7,
		ratioArrow = 0.25,
		angleArrow = 45,
		angle = 20;
	this.fillCilcle(centerX, centerY, centerX - 2);
	var offsetX = centerX * ratio * Math.cos(angle * Math.PI / 180),
		offsetY = centerX * ratio * Math.sin(angle * Math.PI / 180),
		aOffsetX = offsetX * ratioArrow * 2 * Math.cos(angleArrow * Math.PI / 180),
		aOffsetY = offsetX * ratioArrow * 2 * Math.sin(angleArrow * Math.PI / 180);
	ctx.lineJoin = "round";

	ctx.beginPath();
	ctx.moveTo(centerX + offsetX, centerY - offsetY);
	ctx.lineTo(centerX - offsetX, centerY - offsetY);
	ctx.lineTo(centerX - offsetX + aOffsetX, centerY - offsetY - aOffsetY);
	ctx.moveTo(centerX - offsetX, centerY - offsetY);
	ctx.lineTo(centerX - offsetX + aOffsetX, centerY - offsetY + aOffsetY);
	
	ctx.moveTo(centerX - offsetX, centerY + offsetY);
	ctx.lineTo(centerX + offsetX, centerY + offsetY);
	ctx.lineTo(centerX + offsetX - aOffsetX, centerY + offsetY - aOffsetY);
	ctx.moveTo(centerX + offsetX, centerY + offsetY);
	ctx.lineTo(centerX + offsetX - aOffsetX, centerY + offsetY + aOffsetY);
	ctx.stroke();
	return $(cvs);
};
helper.inheritPrototype(CvsReplaceIcon, CvsIcon);