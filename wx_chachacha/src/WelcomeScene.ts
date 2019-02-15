/*
* name;
*/
class WelcomeScene extends ui.WelcomeUI
{
    private static _inst:WelcomeScene;
    public static get Inst():WelcomeScene
    {
        return this._inst || (this._inst = new WelcomeScene());
    }
    constructor()
    {
        super();
        WelcomeScene._inst = this;
        this.timer.loop(10,this,()=>{
            this.box_roll.rotation+=1;
        });
        this._handleButton();
        this._test();
    }
    private _handleButton():void
    {
        this.img_go.on(Laya.Event.MOUSE_DOWN,this,()=>
        {
            this._handleConnectServer();
        });
        this.btn_single.on(Laya.Event.MOUSE_DOWN,this,this._patternSelect,[1]);
        this.btn_double.on(Laya.Event.MOUSE_DOWN,this,this._patternSelect,[2]);
    }
    private _patternSelect(type:number):void
    {
        PlayerData.gamePattern = type;
        this._showSelectPattern(type); 
    }
    private _showSelectPattern(type:number):void
    {
        let filter:Laya.GlowFilter = new Laya.GlowFilter("#ff0000", 5, 0, 0);
        this.btn_single.filters = null;
        this.btn_double.filters = null;
        if(type == 1)
        {
            this.btn_single.filters = [filter,filter];
        }
        else
        {
            this.btn_double.filters = [filter,filter];
        }
    }
    private _test():void
    {
    }
    private _handleConnectServer():void
    {
        if(PlayerData.isConnected)
        {
            var data = MsgMgr.struct_join;
            data.name = PlayerData.pname;
            data.type = MsgMgr.MSG_join;
            data.pattern = PlayerData.gamePattern;
            NetMgr.Inst.sendMsg(JSON.stringify(data));
        }
        else
        {
            let name:string = this.input_name.text;
            if(name.length>0 && PlayerData.gamePattern>0)
            {
                PlayerData.pname = name;
                NetMgr.Inst.connectServer(name);
            }
            else
            {
                if(name.length==0)
                {
                    view.AlertView.Inst.show("昵称不能为空");
                }
                else
                {
                    view.AlertView.Inst.show("请选择游戏模式");
                }
            }
        }
    }
    public joinSuccess():void
    {
        // this.input_name.text = "";
        if(PlayerData.existGameScene)
        {
            GameScene.Inst.visible = true;
        }
        else
        {
            let gameScene = new GameScene();
            Laya.stage.addChild(gameScene);
            PlayerData.existGameScene = true;
        }
        this.showSelf(false);
    }
    public showSelf(bool:boolean):void
    {
        this.visible = bool;
        // if(PlayerData.isConnected)
        {
            this.box_nickname.visible = false;
        }
        // else 
        // {
        //     this.box_nickname.visible = true;
        // }
    }
}