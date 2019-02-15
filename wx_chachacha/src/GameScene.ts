/*
* name;
*/
class GameScene extends ui.GameSceneUI
{
    private _circle:Circle = null;
    private _circleMgr:CirleArrowManager;
    private static _inst:GameScene;
    private _currentDirection:number = -1;//当前该谁发射
    private _gameover:Gameover = null;
    private _overLevel:OverLevel;
    private _target_num:number = 0;
    public static get Inst():GameScene
    {
        return this._inst || (this._inst = new GameScene());
    }
    constructor()
    {
        super();
        GameScene._inst = this;
        this.size(640, 1136);
        this._initUI();
        this._registerEvent();
    }
    private _initUI():void
    {
        this.img_ready1.visible = false;
        this.img_ready2.visible = false;
        this.img_h1.visible = false;
        this.img_h2.visible = false;
        this.box_p1.visible = false;
        this.box_p2.visible = false;
        this.box_level.visible = false;
        this.btn_exit.visible = false;
    }
    private _init():void
    {
        this.img_ready1.visible = false;
        this.img_ready2.visible = false;
        if(this._circle && this._circleMgr)
        {
            this._clearCircleAndArrow();
        }
        this._circleMgr = new CirleArrowManager(this);
        this._circle = new Circle();
        this._circle.pos(this.width/2,this.height/2);
        this.addChild(this._circle);
        // this._registerEvent();
    }
    private _registerEvent():void
    {
        this.on(Laya.Event.MOUSE_DOWN,this,this._launcher);
        this.btn_exit.on(Laya.Event.MOUSE_DOWN,this,this._exitRoom);
    }
    private _exitRoom():void
    {
        console.log("exitroom");
        NetMgr.Inst.sendOutRoom();
    }
    //data{type:,name:,list:[{name:"",direction:}],pattern:}
    public handleJoin(datas):void
    {
        PlayerData.gamestatus = PlayerData.STATUES_REDLY;
        for(var i = 0; i<datas.list.length;i++)
        {
            var data = datas.list[i];
            if(data.name == PlayerData.pname)
            {
                PlayerData.direction = data.direction;
            }
            if(data.direction == 0)
            {
                this.img_ready1.visible = true;
                this.box_p1.visible = true;
                this.txt_name1.text = data.name;//+"_"+data.direction+"_"+PlayerData.direction+"_"+PlayerData.pname;
            }
            else
            {
                this.img_ready2.visible = true;
                this.box_p2.visible = true;
                this.txt_name2.text = data.name;//+"_"+data.direction+"_"+PlayerData.direction+"_"+PlayerData.pname;
            }
        }
        this.btn_exit.visible = true;
        if(this._gameover)
        {
            this._gameover.destroy();
            this._gameover = null;
        }
    }
    //data{type:,first,level,pattern:}
    public handleStart(data):void
    {
        this.btn_exit.visible = false;
        if(data.pattern == MsgMgr.doublePattern)
        {
            PlayerData.doubleLevel = data.level;
        }
        else if(data.pattern == MsgMgr.singlePattern)
        {
            PlayerData.singleLevel = data.level;
        }
        let data_lv = LevelConfig.getCurrentLevelData();
        this._target_num = data_lv.target;
        let ani = new Laya.Animation();
        ani.interval = 50;
        ani.play(0,true,"ani_start");
        this.addChild(ani);
        ani.pos(this.width/2-96,this.height/2-96);
        ani.on(Laya.Event.COMPLETE,this,(event)=>
        {
            this._setTargetNum();
            this.box_level.visible = true;
            this.txt_level.text = data_lv.level;
            ani.removeSelf();
            this._startGame(data);
        });
    }
    private _setTargetNum():void
    {
        this.txt_target_num.text = this._target_num.toString();
        this._target_num--;
    }
    private _startGame(data):void
    {
        PlayerData.gamestatus = PlayerData.STATUES_ING;
        this._init();
        if(data.pattern == MsgMgr.singlePattern)
        {
            this._currentDirection = PlayerData.direction;
        }
        else
        {
            this._currentDirection = data.first;
            this._setCurPlayer(data.first);
        }
    }
    private _setCurPlayer(direction:number):void
    {
        if(direction == 0)
        {
            this.img_h1.visible = true;
            this.img_h2.visible = false;
        }
        else
        {
            this.img_h1.visible = false;
            this.img_h2.visible = true;
        }
    }
    private _launcher():void
    {
        if(PlayerData.gamestatus != PlayerData.STATUES_ING){return;}
        if(this._currentDirection == PlayerData.direction)
        {
            var data = MsgMgr.struct_game;
            data.type = MsgMgr.MSG_game;
            data.cur = this._currentDirection;
            data.pattern = PlayerData.gamePattern;
            NetMgr.Inst.sendMsg(JSON.stringify(data));
        }
    }
    public handleGameState(data):void
    {
        this._currentDirection = data.next;
        this._setCurPlayer(data.next);
        if(data.cur == 0)
        {
            this._circleMgr.launchBottom();
        }
        else
        {
            this._circleMgr.launchTop();
        }
        this._setTargetNum();
    }
    //data{type:,name:,direction:}
    public handleGameOut(data):void
    {
        if(this._overLevel)
        {
            this._overLevel.destroy();
            this._overLevel = null;
        }
        if(data.name == this.txt_name1.text)
        {
            this.box_p1.visible = false;
        }
        else
        {
            this.box_p2.visible = false;
        }
        if(!this._gameover)
        {
            if(PlayerData.gamestatus == PlayerData.STATUES_REDLY && data.name == PlayerData.pname && data.direction == PlayerData.direction)
            {
                this._outGameScene();
            }
            else if(PlayerData.gamestatus != PlayerData.STATUES_CONTINUE)
            {
                //玩家下线
                let gameover:Gameover = new Gameover();
                gameover.handleOver(data);
                this._gameover = gameover;
                this.addChild(gameover);
                gameover.zOrder = 2000;
            }
            else if(data.name == PlayerData.pname && data.direction == PlayerData.direction)
            {
                this._outGameScene();
            }
        }
        else
        {
            if(data.name == PlayerData.pname && data.direction == PlayerData.direction)
            {
                console.log("退出: "+data.name);
                this._outGameScene();
            }
        }
    }
    private _outGameScene():void
    {
        //游戏结束正常退出
        this._initUI();
        PlayerData.doubleLevel = 1;
        PlayerData.singleLevel = 1;
        this.visible = false;
        WelcomeScene.Inst.showSelf(true);
        this._clearCircleAndArrow();
    }
    private _clearCircleAndArrow():void
    {
        Circle.Inst.destroy();
        if(this._circleMgr && this._circleMgr.cleaningData)
        {
            this._circleMgr.cleaningData();
        }
        this._circleMgr = null;
        this._circle = null;
        if(this._gameover)
        {
            this._gameover.destroy();
            this._gameover = null;
        }
        if(this._overLevel)
        {
            this._overLevel.destroy();
            this._overLevel = null;
        }
    }
    public sendGameOverOrder(obj):void
    {
        var data = MsgMgr.struct_end;
        data.type = MsgMgr.MSG_gameend;
        data.name = PlayerData.pname;
        data.direction = PlayerData.direction;
        data.data = obj;
        data.pattern = PlayerData.gamePattern;
        NetMgr.Inst.sendMsg(JSON.stringify(data));
    }
    //data{type:,name:,direction:,data:{index:,x:,y:,rotation:},pattern:}
    public handleGameEnd(data):void
    {
        this._circle.checkoutCollision(data);
        if(PlayerData.gamestatus != PlayerData.STATUES_END)
        {
            PlayerData.gamestatus = PlayerData.STATUES_END;
            if(!this._gameover)
            {
                let gameover:Gameover = new Gameover();
                this._gameover = gameover;
                this.addChild(gameover);
                gameover.zOrder = 2000;
            }
            this._gameover.handleOver(data);
        }
    }
    //data{type,name,direction}
    public handleContinue(data):void
    {
        if(data.direction == PlayerData.direction && data.name == PlayerData.pname)
        {
            PlayerData.gamestatus = PlayerData.STATUES_CONTINUE;
            this._clearCircleAndArrow();
            this.btn_exit.visible = true;
            if(this._overLevel)
            {
                console.log("--------------destroy overlevel-");
                this._overLevel.destroy();
                this._overLevel = null;
            }
        }
        this.img_h1.visible = false;
        this.img_h2.visible = false;
        if(data.direction == 0)
        {
            this.img_ready1.visible = true;
        }
        else
        {
            this.img_ready2.visible = true;
        }
    }
    //ui for over level
    public setOverLevel():void
    {
        this.img_h1.visible = false;
        this.img_h2.visible = false;
        if(!this._overLevel)
        {
            let overLevel = new OverLevel();
            Laya.stage.addChild(overLevel);
            overLevel.zOrder = 10000;
            this._overLevel = overLevel;
        }
    }
    public checkOverLevel():void
    {
        this._circleMgr.checkOverLevel();
    }
    //server close or disconnected server situation
    public forceClearGameScene():void
    {
        this._initUI();
        PlayerData.doubleLevel = 1;
        PlayerData.singleLevel = 1;
        this.visible = false;
        WelcomeScene.Inst.showSelf(true);
        if(PlayerData.gamestatus != PlayerData.STATUES_REDLY)
        {
            this._clearCircleAndArrow();
        }
    }
}
