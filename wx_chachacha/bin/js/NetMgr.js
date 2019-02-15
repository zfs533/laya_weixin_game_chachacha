var PlayerData = /** @class */ (function () {
    function PlayerData() {
    }
    PlayerData.gamePattern = 0; //1单人模式，2双人模式
    PlayerData.isConnected = false;
    PlayerData.existGameScene = false;
    PlayerData.singleLevel = 1;
    PlayerData.doubleLevel = 1;
    PlayerData.pname = "";
    PlayerData.direction = 0;
    PlayerData.gamestatus = 0; //0：准备，1：游戏中，2：游戏结束,3：继续游戏
    PlayerData.STATUES_REDLY = 0;
    PlayerData.STATUES_ING = 1;
    PlayerData.STATUES_END = 2;
    PlayerData.STATUES_CONTINUE = 3;
    return PlayerData;
}());
var MsgMgr = /** @class */ (function () {
    function MsgMgr() {
    }
    MsgMgr.singlePattern = 1;
    MsgMgr.doublePattern = 2;
    MsgMgr.MSG_join = 1001;
    MsgMgr.struct_join = {
        type: 0,
        pattern: 0,
        name: "",
        direction: 0,
    };
    MsgMgr.MSG_start = 1002;
    MsgMgr.struct_start = {
        type: 0,
        pattern: 0,
        first: 0,
        level: 1,
    };
    MsgMgr.MSG_game = 1003;
    MsgMgr.struct_game = {
        type: 0,
        pattern: 0,
        cur: 0,
        next: 0,
    };
    MsgMgr.MSG_out = 1004;
    MsgMgr.struct_out = {
        type: 0,
        pattern: 0,
        name: "",
        direction: 0,
    };
    MsgMgr.MSG_gameend = 1005;
    MsgMgr.struct_end = {
        type: 0,
        pattern: 0,
        name: "",
        direction: 0,
        data: null,
    };
    MsgMgr.MSG_continue = 1006;
    MsgMgr.struct_continue = {
        type: 0,
        pattern: 0,
        name: "",
        direction: 0,
    };
    //过关
    MsgMgr.MSG_overlevel = 1007;
    MsgMgr.struct_overlevel = {
        type: 0,
        pattern: 0,
        level: 0,
        name: "",
        direction: 0,
    };
    return MsgMgr;
}());
var NetMgr = /** @class */ (function () {
    function NetMgr() {
        NetMgr._inst = this;
        this._socket = new Laya.Socket();
    }
    Object.defineProperty(NetMgr, "Inst", {
        get: function () {
            return this._inst || (this._inst = new NetMgr());
        },
        enumerable: true,
        configurable: true
    });
    NetMgr.prototype.connectServer = function (name) {
        var _this = this;
        this._socket.connectByUrl("ws://10.0.7.65:9890");
        this._socket.on(Laya.Event.OPEN, this, function () {
            PlayerData.isConnected = true;
            console.log("connect success");
            var data = MsgMgr.struct_join;
            data.name = name;
            data.type = MsgMgr.MSG_join;
            data.pattern = PlayerData.gamePattern;
            _this.sendMsg(JSON.stringify(data));
        });
        this._socket.on(Laya.Event.ERROR, this, function (e) {
            view.AlertView.Inst.show("连接服务器发生错误");
            console.log("connect error " + e);
        });
        this._socket.on(Laya.Event.CLOSE, this, function () {
            PlayerData.isConnected = false;
            GameScene.Inst.forceClearGameScene();
            view.AlertView.Inst.show("服务器关闭");
        });
        this._socket.on(Laya.Event.MESSAGE, this, this._recvMessage);
    };
    NetMgr.prototype._recvMessage = function (msg) {
        console.log(msg);
        var data = JSON.parse(msg);
        switch (data.type) {
            case MsgMgr.MSG_join:
                {
                    if (WelcomeScene.Inst) {
                        WelcomeScene.Inst.joinSuccess();
                    }
                    GameScene.Inst.handleJoin(data);
                    break;
                }
            case MsgMgr.MSG_start:
                {
                    GameScene.Inst.handleStart(data);
                    break;
                }
            case MsgMgr.MSG_game:
                {
                    GameScene.Inst.handleGameState(data);
                    break;
                }
            case MsgMgr.MSG_out:
                {
                    GameScene.Inst.handleGameOut(data);
                    break;
                }
            case MsgMgr.MSG_gameend:
                {
                    GameScene.Inst.handleGameEnd(data);
                    break;
                }
            case MsgMgr.MSG_continue:
                {
                    GameScene.Inst.handleContinue(data);
                    break;
                }
            default: break;
        }
    };
    NetMgr.prototype.sendMsg = function (data) {
        console.log("send-> " + data);
        this._socket.send(data);
    };
    //exit room
    NetMgr.prototype.sendOutRoom = function () {
        var data = MsgMgr.struct_out;
        data.type = MsgMgr.MSG_out;
        data.name = PlayerData.pname;
        data.direction = PlayerData.direction;
        data.pattern = PlayerData.gamePattern;
        NetMgr.Inst.sendMsg(JSON.stringify(data));
    };
    //continue game
    NetMgr.prototype.sendContinueMsg = function () {
        var data = MsgMgr.struct_continue;
        data.type = MsgMgr.MSG_continue;
        data.name = PlayerData.pname;
        data.direction = PlayerData.direction;
        data.pattern = PlayerData.gamePattern;
        NetMgr.Inst.sendMsg(JSON.stringify(data));
    };
    //over level
    NetMgr.prototype.sendOverLevelMsg = function () {
        var data = MsgMgr.struct_overlevel;
        data.type = MsgMgr.MSG_overlevel;
        data.level = PlayerData.doubleLevel;
        data.name = PlayerData.pname;
        data.direction = PlayerData.direction;
        data.pattern = PlayerData.gamePattern;
        NetMgr.Inst.sendMsg(JSON.stringify(data));
    };
    return NetMgr;
}());
//# sourceMappingURL=NetMgr.js.map