var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
* name;
*/
var Arrow = /** @class */ (function (_super) {
    __extends(Arrow, _super);
    function Arrow() {
        var _this = _super.call(this) || this;
        _this._radius = 10;
        _this._lineH = 150;
        _this._speed = 100;
        _this._rectArr = new Laya.Rectangle(-_this._radius / 2, 0, _this._radius, _this._radius + _this._lineH);
        _this._isTop = false;
        _this._index = 0;
        _this._data_lv = LevelConfig.getCurrentLevelData();
        _this._drawArrow();
        return _this;
    }
    Arrow.prototype._drawArrow = function () {
        // this.graphics.drawLine(0,0,0,this._lineH,"#ffffff",3);
        // this.graphics.drawCircle(0,this._lineH+this._radius,this._radius,"#ffffff","#ffffff",1);
        var sp = new Laya.Image();
        sp.loadImage("ui/knife" + this._data_lv.arrow + ".png");
        sp.x = -sp.width / 2;
        this.addChild(sp);
        this._arrow = sp;
    };
    Arrow.prototype.startMove = function () {
        this.timer.loop(1, this, this._move);
    };
    Arrow.prototype._move = function () {
        if (this._isTop) {
            this._handleTopMove();
        }
        else {
            this._handleBottomMove();
        }
    };
    Arrow.prototype._handleTopMove = function () {
        this.y += this._speed;
        if (this.y > 1136 + 110) {
            this.ArrowRemoveSelf();
        }
        else {
            var pos = new Laya.Point(this.x, this.y);
            var bool = Circle.Inst.checkArrowCollideTop(pos);
            if (bool) {
                this.ArrowRemoveSelf();
            }
        }
    };
    Arrow.prototype._handleBottomMove = function () {
        this.y -= this._speed;
        if (this.y < -this._radius) {
            this.ArrowRemoveSelf();
        }
        else {
            var pos = new Laya.Point(this.x, this.y);
            var bool = Circle.Inst.checkArrowCollideBottom(pos);
            if (bool) {
                this.ArrowRemoveSelf();
            }
        }
    };
    Arrow.prototype.ArrowRemoveSelf = function () {
        this.timer.clear(this, this._move);
        this.destroy();
    };
    Arrow.prototype.drawRect = function () {
        var filter = new Laya.GlowFilter("#ff0000", 5, 0, 0);
        this._arrow.filters = [filter, filter];
        // this.graphics.drawRect(this._rectArr.x,this._rectArr.y,this._rectArr.width,this._rectArr.height,null,"#00ff00",1);
    };
    Arrow.prototype.getRectangle = function () {
        return this._rectArr;
    };
    Arrow.prototype.setIsTop = function () {
        this._isTop = true;
        this.rotation = 180;
    };
    Arrow.prototype.getIsTop = function () {
        return this._isTop;
    };
    Arrow.prototype.setIndex = function (index) {
        this._index = index;
    };
    Arrow.prototype.getIndex = function () {
        return this._index;
    };
    return Arrow;
}(Laya.Sprite));
//# sourceMappingURL=Arrow.js.map