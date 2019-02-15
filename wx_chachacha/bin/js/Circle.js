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
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        var _this = _super.call(this) || this;
        _this._radius = 80;
        _this._arrowList = [];
        _this._index = 0;
        _this._data_lv = LevelConfig.getCurrentLevelData();
        Circle._inst = _this;
        _this._drawCircle();
        _this.timer.loop(10, _this, _this._tween);
        _this.initBaseArrow(_this._data_lv.origin);
        return _this;
    }
    Object.defineProperty(Circle, "Inst", {
        get: function () {
            return this._inst || (this._inst = new Circle());
        },
        enumerable: true,
        configurable: true
    });
    Circle.prototype._drawCircle = function () {
        // this.graphics.drawCircle(0,0,this._radius,"#ff00ff","#ffff00",2);
        // this.graphics.drawLine(-this._radius,0,this._radius,0,"#00ff00",2);
        // this.graphics.drawLine(0,-this._radius,0,this._radius,"#00ff00",2);
        var sp = new Laya.Image();
        sp.loadImage("ui/gm_yuan.png");
        sp.scale(this._radius * 2 / sp.width, this._radius * 2 / sp.height);
        sp.anchorX = 0.5;
        sp.anchorY = 0.5;
        sp.pivot(0.5, 0.5);
        this.addChild(sp);
        var fishGirl = new Laya.Image();
        fishGirl.loadImage("ui/gm_yu0.png");
        fishGirl.anchorX = 0.5;
        fishGirl.anchorY = 0.5;
        this.addChild(fishGirl);
        this._fishGirl = fishGirl;
    };
    Circle.prototype._tween = function () {
        this.rotation += 1;
        if (this._fishGirl) {
            this._fishGirl.rotation -= 1;
        }
        if (this.rotation >= 360 * 100000) {
            this._fishGirl.rotation = 0;
            this.rotation = 0;
        }
    };
    Circle.prototype.checkArrowCollideBottom = function (pos) {
        if (pos.y <= this.y + this._radius) {
            this._addArrow1();
            return true;
        }
        return false;
    };
    Circle.prototype.checkArrowCollideTop = function (pos) {
        if (pos.y >= this.y - this._radius) {
            this._addArrow2();
            return true;
        }
        return false;
    };
    Circle.prototype.initBaseArrow = function (num) {
        //在圆上平均排列
        var angle_gap = 360 / num;
        for (var i = 0; i < num; i++) {
            this._index++;
            var angle = angle_gap * i + 90;
            var hudu = angle / 180 * Math.PI;
            var arrow = new Arrow();
            arrow.setIndex(this._index);
            var pos = new Laya.Point(-Math.cos(hudu) * this._radius, Math.sin(hudu) * this._radius);
            arrow.pos(pos.x, pos.y);
            arrow.rotation = -angle_gap * i;
            this.addChild(arrow);
            this._arrowList.push(arrow);
        }
    };
    Circle.prototype._addArrow1 = function () {
        this._index++;
        var angle = this.rotation + 90;
        var hudu = angle / 180 * Math.PI;
        var arrow = new Arrow();
        arrow.setIndex(this._index);
        var pos = new Laya.Point(-Math.cos(hudu) * this._radius, Math.sin(hudu) * this._radius);
        arrow.pos(pos.x, pos.y);
        arrow.rotation = -this.rotation;
        this.addChild(arrow);
        this._checkCollideBetweenArrow(arrow);
    };
    Circle.prototype._addArrow2 = function () {
        this._index++;
        var angle = this.rotation - 90;
        var hudu = angle / 180 * Math.PI;
        var arrow = new Arrow();
        arrow.setIndex(this._index);
        var pos = new Laya.Point(-Math.cos(hudu) * this._radius, Math.sin(hudu) * this._radius);
        arrow.pos(pos.x, pos.y);
        arrow.rotation = -this.rotation + 180;
        this.addChild(arrow);
        this._checkCollideBetweenArrow(arrow);
    };
    Circle.prototype._checkCollideBetweenArrow = function (arrow) {
        //只需要判断两个arrow起点坐标间的物理距离即可
        for (var i = 0; i < this._arrowList.length; i++) {
            var item = this._arrowList[i];
            var xx = item.x - arrow.x;
            var yy = item.y - arrow.y;
            var distance = Math.sqrt(xx * xx + yy * yy);
            if (distance <= arrow.getRectangle().width) {
                this.timer.clear(this, this._tween);
                arrow.drawRect();
                item.drawRect();
                var obj = {
                    arrow1: { index: arrow.getIndex(), x: arrow.x, y: arrow.y, rotation: arrow.rotation },
                    arrow2: { index: item.getIndex(), x: item.x, y: item.y, rotation: item.rotation },
                };
                GameScene.Inst.sendGameOverOrder(obj);
                return;
            }
        }
        this._arrowList.push(arrow);
        GameScene.Inst.checkOverLevel();
    };
    Circle.prototype.checkoutCollision = function (data) {
        var arr = [data.data.arrow1, data.data.arrow2];
        for (var i = 0; i < this._arrowList.length; i++) {
            for (var j = 0; j < arr.length; j++) {
                var index1 = this._arrowList[i].getIndex();
                var index2 = arr[j].index;
                if (index1 == index2) {
                    this._arrowList[i].pos(arr[j].x, arr[j].y);
                    this._arrowList[i].rotation = arr[j].rotation;
                    this._arrowList[i].drawRect();
                    this.timer.clear(this, this._tween);
                }
            }
        }
    };
    return Circle;
}(Laya.Sprite));
//# sourceMappingURL=Circle.js.map