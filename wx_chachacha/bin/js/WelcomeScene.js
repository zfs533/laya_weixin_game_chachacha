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
var WelcomeScene = /** @class */ (function (_super) {
    __extends(WelcomeScene, _super);
    function WelcomeScene() {
        var _this = _super.call(this) || this;
        WelcomeScene._inst = _this;
        _this.timer.loop(10, _this, function () {
            _this.box_roll.rotation += 1;
        });
        _this._handleButton();
        _this._test();
        return _this;
    }
    Object.defineProperty(WelcomeScene, "Inst", {
        get: function () {
            return this._inst || (this._inst = new WelcomeScene());
        },
        enumerable: true,
        configurable: true
    });
    WelcomeScene.prototype._handleButton = function () {
        var _this = this;
        this.img_go.on(Laya.Event.MOUSE_DOWN, this, function () {
            _this._handleConnectServer();
        });
        this.btn_single.on(Laya.Event.MOUSE_DOWN, this, this._patternSelect, [1]);
        this.btn_double.on(Laya.Event.MOUSE_DOWN, this, this._patternSelect, [2]);
    };
    WelcomeScene.prototype._patternSelect = function (type) {
        PlayerData.gamePattern = type;
        this._showSelectPattern(type);
    };
    WelcomeScene.prototype._showSelectPattern = function (type) {
        var filter = new Laya.GlowFilter("#ff0000", 5, 0, 0);
        this.btn_single.filters = null;
        this.btn_double.filters = null;
        if (type == 1) {
            this.btn_single.filters = [filter, filter];
        }
        else {
            this.btn_double.filters = [filter, filter];
        }
    };
    WelcomeScene.prototype._test = function () {
    };
    WelcomeScene.prototype._handleConnectServer = function () {
        if (PlayerData.isConnected) {
            var data = MsgMgr.struct_join;
            data.name = PlayerData.pname;
            data.type = MsgMgr.MSG_join;
            data.pattern = PlayerData.gamePattern;
            NetMgr.Inst.sendMsg(JSON.stringify(data));
        }
        else {
            var name_1 = this.input_name.text;
            if (name_1.length > 0 && PlayerData.gamePattern > 0) {
                PlayerData.pname = name_1;
                NetMgr.Inst.connectServer(name_1);
            }
            else {
                if (name_1.length == 0) {
                    view.AlertView.Inst.show("昵称不能为空");
                }
                else {
                    view.AlertView.Inst.show("请选择游戏模式");
                }
            }
        }
    };
    WelcomeScene.prototype.joinSuccess = function () {
        // this.input_name.text = "";
        if (PlayerData.existGameScene) {
            GameScene.Inst.visible = true;
        }
        else {
            var gameScene = new GameScene();
            Laya.stage.addChild(gameScene);
            PlayerData.existGameScene = true;
        }
        this.showSelf(false);
    };
    WelcomeScene.prototype.showSelf = function (bool) {
        this.visible = bool;
        // if(PlayerData.isConnected)
        {
            this.box_nickname.visible = false;
        }
        // else 
        // {
        //     this.box_nickname.visible = true;
        // }
    };
    return WelcomeScene;
}(ui.WelcomeUI));
//# sourceMappingURL=WelcomeScene.js.map