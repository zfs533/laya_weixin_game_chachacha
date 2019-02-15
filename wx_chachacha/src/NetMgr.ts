class PlayerData
{
    public static gamePattern:number = 0;//1单人模式，2双人模式
    public static isConnected:boolean = false;
    public static existGameScene:boolean = false;
    public static singleLevel:number = 1;
    public static doubleLevel:number = 1;
    public static pname:string = "";
    public static direction:number = 0;
    public static gamestatus:number = 0;//0：准备，1：游戏中，2：游戏结束,3：继续游戏

    public static STATUES_REDLY = 0;
    public static STATUES_ING = 1;
    public static STATUES_END = 2;
    public static STATUES_CONTINUE = 3;

    constructor(){}
}
class MsgMgr
{
    public static singlePattern:number = 1;
    public static doublePattern:number = 2;
    public static MSG_join:number = 1001;
    public static struct_join = {
        type:0,
        pattern:0,
        name:"",
        direction:0,//位置
    }
    public static MSG_start:number = 1002;
    public static struct_start = {
        type:0,
        pattern:0,
        first:0,//先手
        level:1,//当前关卡
    }
    public static MSG_game:number = 1003;
    public static struct_game = {
        type:0,
        pattern:0,
        cur:0,//当前谁出
        next:0,//下一个谁出
    }
    public static MSG_out:number = 1004;
    public static struct_out = {
        type:0,
        pattern:0,
        name:"",
        direction:0,
    }
    public static MSG_gameend:number = 1005;
    public static struct_end = {
        type:0,
        pattern:0,
        name:"",//失败方name
        direction:0,//失败方direction
        data:null,
    }
    public static MSG_continue = 1006;
    public static struct_continue = {
        type:0,
        pattern:0,
        name:"",
        direction:0,
    }
    //过关
    public static MSG_overlevel = 1007;
    public static struct_overlevel = {
        type:0,
        pattern:0,
        level:0,
        name:"",
        direction:0,
    }
    constructor(){}
}


class NetMgr
{
    private static _inst:NetMgr;
    private _socket:Laya.Socket;
    public static get Inst():NetMgr
    {
        return this._inst || (this._inst = new NetMgr());
    }
    constructor()
    {
        NetMgr._inst = this;
        this._socket = new Laya.Socket();
    }
    public connectServer(name:string):void
    {
        this._socket.connectByUrl("ws://10.0.7.65:9890");
        this._socket.on(Laya.Event.OPEN,this,()=>
        {
            PlayerData.isConnected = true;
            console.log("connect success");
            var data = MsgMgr.struct_join;
            data.name = name;
            data.type = MsgMgr.MSG_join;
            data.pattern = PlayerData.gamePattern;
            this.sendMsg(JSON.stringify(data));
        });
        
        this._socket.on(Laya.Event.ERROR,this,(e)=>
        {
            view.AlertView.Inst.show("连接服务器发生错误");
            console.log("connect error "+e);
        });
        this._socket.on(Laya.Event.CLOSE,this,()=>
        {
            PlayerData.isConnected = false;
            GameScene.Inst.forceClearGameScene();
            view.AlertView.Inst.show("服务器关闭");
        });
        this._socket.on(Laya.Event.MESSAGE,this,this._recvMessage);
    }
    private _recvMessage(msg):void
    {
        console.log(msg);
        var data = JSON.parse(msg);
        switch(data.type)
        {
            case MsgMgr.MSG_join:
            {
                if(WelcomeScene.Inst)
                {
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
            default:break;
        }
    }
    public sendMsg(data):void
    {
        console.log("send-> "+data);
        this._socket.send(data);
    }
    //exit room
    public sendOutRoom():void
    {
        let data = MsgMgr.struct_out;
        data.type = MsgMgr.MSG_out;
        data.name = PlayerData.pname;
        data.direction = PlayerData.direction;
        data.pattern = PlayerData.gamePattern;
        NetMgr.Inst.sendMsg(JSON.stringify(data));
    }
    //continue game
    public sendContinueMsg():void
    {
        let data = MsgMgr.struct_continue;
        data.type = MsgMgr.MSG_continue;
        data.name = PlayerData.pname;
        data.direction = PlayerData.direction;
        data.pattern = PlayerData.gamePattern;
        NetMgr.Inst.sendMsg(JSON.stringify(data));
    }
    //over level
    public sendOverLevelMsg():void
    {
        let data = MsgMgr.struct_overlevel;
        data.type = MsgMgr.MSG_overlevel;
        data.level = PlayerData.doubleLevel;
        data.name = PlayerData.pname;
        data.direction = PlayerData.direction;
        data.pattern = PlayerData.gamePattern;
        NetMgr.Inst.sendMsg(JSON.stringify(data));
    }
}