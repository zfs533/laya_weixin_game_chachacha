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
var OverLevel = /** @class */ (function (_super) {
    __extends(OverLevel, _super);
    function OverLevel() {
        var _this = _super.call(this) || this;
        _this._setEvent();
        _this._addFireEffect();
        return _this;
    }
    OverLevel.prototype._setEvent = function () {
        var _this = this;
        this.lab_exit.on(Laya.Event.MOUSE_DOWN, this, function () {
            //NetMgr.Inst.sendOutRoom();
            GameScene.Inst.handleGameOut({ type: MsgMgr.MSG_out, name: PlayerData.pname, direction: PlayerData.direction });
            _this.visible = false;
        });
        this.lab_next.on(Laya.Event.MOUSE_DOWN, this, function () {
            NetMgr.Inst.sendOverLevelMsg();
        });
    };
    OverLevel.prototype._addFireEffect = function () {
        for (var i = 0; i < 3; i++) {
            var ani = new Laya.Animation();
            ani.interval = 50;
            ani.play(0, true, "ani_fire");
            ani.rotation = -90;
            this.addChild(ani);
            ani.pos((this.width / 2 - 150 - 75) + 150 * i, this.height - 100);
        }
    };
    return OverLevel;
}(ui.OverLevelUI));
//# sourceMappingURL=OverLevel.js.map