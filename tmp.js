/*
Copyright (C) 2015 lld

License: lld

name: Pager
description:　分页功能
version: 0.0.1
author: fangqi
dependencies: jquery
repository: git https://github.com/poilkjmn22/common.git

*/
var lldPager = function (totalCount, pagerView, funUpdateView) {
    this.totalCount = totalCount;
    this.pagerView = pagerView;
    this.btnNext = pagerView.children(".btn-next");
    this.btnPrev = pagerView.children(".btn-prev");
    this.funUpdateView = funUpdateView;
}

lldPager.prototype = {//默认初始值
    pageSize: 10
    , currPageIndex: 1
    , pageCount: 1
    , displayPageIndexCount: 5//要显示的页码数,多余的页码用"..."代替
    , btnPageIndexTmpl: $('<a class="btn-pageindex" id="btn-pageindex-0"></a>')
    , txtShenglue: $('<span>...</span>')
    , init: function () {
        this.pageCount = Math.ceil(this.totalCount / this.pageSize);
        this.setBtnPageIndex();
    }
    , setBtnPageIndex: function () {
        if (this.totalCount === 0) {
            return false;
        }
        var pc = this.pageCount
    		, dpic = this.displayPageIndexCount
    		, cpi = this.currPageIndex
    		, btnPItmpl = this.btnPageIndexTmpl
    		, btnPICtnr = this.pagerView.children(".btn-pagerindex-ctnr");
        if (pc <= dpic) {//页数小于要显示的页码数
            for (var i = pc - 1; i >= 0; i--) {
                var btnPI = btnPItmpl.clone().attr("id", "btn-pageindex-" + (i + 1));
                if (cpi === (i + 1)) { btnPI.addClass("current"); };
                btnPICtnr.prepend(btnPI);
            };
        } else {
            if (cpi < dpic) {
                btnPICtnr.prepend(btnPItmpl.clone().attr("id", "btn-pageindex-" + pc));
                btnPICtnr.prepend(this.txtShenglue.clone());
                for (var i = dpic - 1; i >= 0; i--) {
                    var btnPI = btnPItmpl.clone().attr("id", "btn-pageindex-" + (i + 1));
                    if (cpi === (i + 1)) { btnPI.addClass("current"); };
                    btnPICtnr.prepend(btnPI);
                };
            } else {
                if ((cpi + 2) < pc) {
                    btnPICtnr.prepend(btnPItmpl.clone().attr("id", "btn-pageindex-" + pc));
                    btnPICtnr.prepend(this.txtShenglue.clone());
                }
                for (var i = dpic - 1; i >= 0; i--) {
                    var btnPI = btnPItmpl.clone().attr("id", "btn-pageindex-" + (cpi + i - 2));
                    if (cpi === (i + 1)) { btnPI.addClass("current"); };
                    btnPICtnr.prepend(btnPI);
                };
                btnPICtnr.prepend(this.txtShenglue.clone());
                btnPICtnr.prepend(btnPItmpl.clone().attr("id", "btn-pageindex-" + 1));
            }
        }
    }
};

lldPager.prototype.onNext = function () {
    this.btnNext.on("click", this.funUpdateView);
    (this.currPageIndex === this.pageCount) ? false : (++this.currPageIndex);
    this.setBtnPageIndex();
};

lldPager.prototype.onPrev = function () {
    this.btnPrev.on("click", this.funUpdateView);
    (this.currPageIndex === 1) ? false : (--this.currPageIndex);
    this.setBtnPageIndex();
};

var AdvertPlacePager = new lldPager(parseInt($("#page-count").val()));