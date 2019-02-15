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
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this._circle = null;
        _this._currentDirection = -1; //当前该谁发射
        _this._gameover = null;
        _this._target_num = 0;
        GameScene._inst = _this;
        _this.size(640, 1136);
        _this._initUI();
        _this._registerEvent();
        return _this;
    }
    Object.defineProperty(GameScene, "Inst", {
        get: function () {
            return this._inst || (this._inst = new GameScene());
        },
        enumerable: true,
        configurable: true
    });
    GameScene.prototype._initUI = function () {
        this.img_ready1.visible = false;
        this.img_ready2.visible = false;
        this.img_h1.visible = false;
        this.img_h2.visible = false;
        this.box_p1.visible = false;
        this.box_p2.visible = false;
        this.box_level.visible = false;
        this.btn_exit.visible = false;
    };
    GameScene.prototype._init = function () {
        this.img_ready1.visible = false;
        this.img_ready2.visible = false;
        if (this._circle && this._circleMgr) {
            this._clearCircleAndArrow();
        }
        this._circleMgr = new CirleArrowManager(this);
        this._circle = new Circle();
        this._circle.pos(this.width / 2, this.height / 2);
        this.addChild(this._circle);
        // this._registerEvent();
    };
    GameScene.prototype._registerEvent = function () {
        this.on(Laya.Event.MOUSE_DOWN, this, this._launcher);
        this.btn_exit.on(Laya.Event.MOUSE_DOWN, this, this._exitRoom);
    };
    GameScene.prototype._exitRoom = function () {
        console.log("exitroom");
        NetMgr.Inst.sendOutRoom();
    };
    //data{type:,name:,list:[{name:"",direction:}],pattern:}
    GameScene.prototype.handleJoin = function (datas) {
        PlayerData.gamestatus = PlayerData.STATUES_REDLY;
        for (var i = 0; i < datas.list.length; i++) {
            var data = datas.list[i];
            if (data.name == PlayerData.pname) {
                PlayerData.direction = data.direction;
            }
            if (data.direction == 0) {
                this.img_ready1.visible = true;
                this.box_p1.visible = true;
                this.txt_name1.text = data.name; //+"_"+data.direction+"_"+PlayerData.direction+"_"+PlayerData.pname;
            }
            else {
                this.img_ready2.visible = true;
                this.box_p2.visible = true;
                this.txt_name2.text = data.name; //+"_"+data.direction+"_"+PlayerData.direction+"_"+PlayerData.pname;
            }
        }
        this.btn_exit.visible = true;
        if (this._gameover) {
            this._gameover.destroy();
            this._gameover = null;
        }
    };
    //data{type:,first,level,pattern:}
    GameScene.prototype.handleStart = function (data) {
        var _this = this;
        this.btn_exit.visible = false;
        if (data.pattern == MsgMgr.doublePattern) {
            PlayerData.doubleLevel = data.level;
        }
        else if (data.pattern == MsgMgr.singlePattern) {
            PlayerData.singleLevel = data.level;
        }
        var data_lv = LevelConfig.getCurrentLevelData();
        this._target_num = data_lv.target;
        var ani = new Laya.Animation();
        ani.interval = 50;
        ani.play(0, true, "ani_start");
        this.addChild(ani);
        ani.pos(this.width / 2 - 96, this.height / 2 - 96);
        ani.on(Laya.Event.COMPLETE, this, function (event) {
            _this._setTargetNum();
            _this.box_level.visible = true;
            _this.txt_level.text = data_lv.level;
            ani.removeSelf();
            _this._startGame(data);
        });
    };
    GameScene.prototype._setTargetNum = function () {
        this.txt_target_num.text = this._target_num.toString();
        this._target_num--;
    };
    GameScene.prototype._startGame = function (data) {
        PlayerData.gamestatus = PlayerData.STATUES_ING;
        this._init();
        if (data.pattern == MsgMgr.singlePattern) {
            this._currentDirection = PlayerData.direction;
        }
        else {
            this._currentDirection = data.first;
            this._setCurPlayer(data.first);
        }
    };
    GameScene.prototype._setCurPlayer = function (direction) {
        if (direction == 0) {
            this.img_h1.visible = true;
            this.img_h2.visible = false;
        }
        else {
            this.img_h1.visible = false;
            this.img_h2.visible = true;
        }
    };
    GameScene.prototype._launcher = function () {
        if (PlayerData.gamestatus != PlayerData.STATUES_ING) {
            return;
        }
        if (this._currentDirection == PlayerData.direction) {
            var data = MsgMgr.struct_game;
            data.type = MsgMgr.MSG_game;
            data.cur = this._currentDirection;
            data.pattern = PlayerData.gamePattern;
            NetMgr.Inst.sendMsg(JSON.stringify(data));
        }
    };
    GameScene.prototype.handleGameState = function (data) {
        this._currentDirection = data.next;
        this._setCurPlayer(data.next);
        if (data.cur == 0) {
            this._circleMgr.launchBottom();
        }
        else {
            this._circleMgr.launchTop();
        }
        this._setTargetNum();
    };
    //data{type:,name:,direction:}
    GameScene.prototype.handleGameOut = function (data) {
        if (this._overLevel) {
            this._overLevel.destroy();
            this._overLevel = null;
        }
        if (data.name == this.txt_name1.text) {
            this.box_p1.visible = false;
        }
        else {
            this.box_p2.visible = false;
        }
        if (!this._gameover) {
            if (PlayerData.gamestatus == PlayerData.STATUES_REDLY && data.name == PlayerData.pname && data.direction == PlayerData.direction) {
                this._outGameScene();
            }
            else if (PlayerData.gamestatus != PlayerData.STATUES_CONTINUE) {
                //玩家下线
                var gameover = new Gameover();
                gameover.handleOver(data);
                this._gameover = gameover;
                this.addChild(gameover);
                gameover.zOrder = 2000;
            }
            else if (data.name == PlayerData.pname && data.direction == PlayerData.direction) {
                this._outGameScene();
            }
        }
        else {
            if (data.name == PlayerData.pname && data.direction == PlayerData.direction) {
                console.log("退出: " + data.name);
                this._outGameScene();
            }
        }
    };
    GameScene.prototype._outGameScene = function () {
        //游戏结束正常退出
        this._initUI();
        PlayerData.doubleLevel = 1;
        PlayerData.singleLevel = 1;
        this.visible = false;
        WelcomeScene.Inst.showSelf(true);
        this._clearCircleAndArrow();
    };
    GameScene.prototype._clearCircleAndArrow = function () {
        Circle.Inst.destroy();
        if (this._circleMgr && this._circleMgr.cleaningData) {
            this._circleMgr.cleaningData();
        }
        this._circleMgr = null;
        this._circle = null;
        if (this._gameover) {
            this._gameover.destroy();
            this._gameover = null;
        }
        if (this._overLevel) {
            this._overLevel.destroy();
            this._overLevel = null;
        }
    };
    GameScene.prototype.sendGameOverOrder = function (obj) {
        var data = MsgMgr.struct_end;
        data.type = MsgMgr.MSG_gameend;
        data.name = PlayerData.pname;
        data.direction = PlayerData.direction;
        data.data = obj;
        data.pattern = PlayerData.gamePattern;
        NetMgr.Inst.sendMsg(JSON.stringify(data));
    };
    //data{type:,name:,direction:,data:{index:,x:,y:,rotation:},pattern:}
    GameScene.prototype.handleGameEnd = function (data) {
        this._circle.checkoutCollision(data);
        if (PlayerData.gamestatus != PlayerData.STATUES_END) {
            PlayerData.gamestatus = PlayerData.STATUES_END;
            if (!this._gameover) {
                var gameover = new Gameover();
                this._gameover = gameover;
                this.addChild(gameover);
                gameover.zOrder = 2000;
            }
            this._gameover.handleOver(data);
        }
    };
    //data{type,name,direction}
    GameScene.prototype.handleContinue = function (data) {
        if (data.direction == PlayerData.direction && data.name == PlayerData.pname) {
            PlayerData.gamestatus = PlayerData.STATUES_CONTINUE;
            this._clearCircleAndArrow();
            this.btn_exit.visible = true;
            if (this._overLevel) {
                console.log("--------------destroy overlevel-");
                this._overLevel.destroy();
                this._overLevel = null;
            }
        }
        this.img_h1.visible = false;
        this.img_h2.visible = false;
        if (data.direction == 0) {
            this.img_ready1.visible = true;
        }
        else {
            this.img_ready2.visible = true;
        }
    };
    //ui for over level
    GameScene.prototype.setOverLevel = function () {
        this.img_h1.visible = false;
        this.img_h2.visible = false;
        if (!this._overLevel) {
            var overLevel = new OverLevel();
            Laya.stage.addChild(overLevel);
            overLevel.zOrder = 10000;
            this._overLevel = overLevel;
        }
    };
    GameScene.prototype.checkOverLevel = function () {
        this._circleMgr.checkOverLevel();
    };
    //server close or disconnected server situation
    GameScene.prototype.forceClearGameScene = function () {
        this._initUI();
        PlayerData.doubleLevel = 1;
        PlayerData.singleLevel = 1;
        this.visible = false;
        WelcomeScene.Inst.showSelf(true);
        if (PlayerData.gamestatus != PlayerData.STATUES_REDLY) {
            this._clearCircleAndArrow();
        }
    };
    return GameScene;
}(ui.GameSceneUI));
//# sourceMappingURL=GameScene.js.map