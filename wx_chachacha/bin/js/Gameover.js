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
var Gameover = /** @class */ (function (_super) {
    __extends(Gameover, _super);
    function Gameover() {
        var _this = _super.call(this) || this;
        _this.lab_continue.visible = false;
        _this.lab_exit.visible = false;
        return _this;
    }
    Gameover.prototype.handleOver = function (data) {
        if (data.type == MsgMgr.MSG_out) {
            this.lab_continue.visible = false;
            this.lab_exit.visible = false;
            PlayerData.gamestatus = PlayerData.STATUES_END;
            this.on(Laya.Event.MOUSE_DOWN, this, this._restartGame);
        }
        else if (data.type == MsgMgr.MSG_gameend) {
            this.lab_continue.visible = true;
            this.lab_exit.visible = true;
            this.lab_exit.on(Laya.Event.MOUSE_DOWN, this, this._restartGame);
            this.lab_continue.on(Laya.Event.MOUSE_DOWN, this, this._continueGame);
        }
    };
    Gameover.prototype._restartGame = function () {
        NetMgr.Inst.sendOutRoom();
    };
    Gameover.prototype._continueGame = function () {
        NetMgr.Inst.sendContinueMsg();
    };
    Gameover.prototype._cleanScene = function () {
        GameScene.Inst.destroy();
        Circle.Inst.destroy();
        this.destroy();
    };
    return Gameover;
}(ui.GameOverUI));
//# sourceMappingURL=Gameover.js.map