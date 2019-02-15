/*
* name;
*/
class Gameover extends ui.GameOverUI
{
    constructor()
    {
        super();
        this.lab_continue.visible = false;
        this.lab_exit.visible = false;
    }
    public handleOver(data):void
    {
        if(data.type == MsgMgr.MSG_out)
        {
            this.lab_continue.visible = false;
            this.lab_exit.visible = false;
            PlayerData.gamestatus = PlayerData.STATUES_END;
            this.on(Laya.Event.MOUSE_DOWN,this,this._restartGame);
        }
        else if(data.type == MsgMgr.MSG_gameend)
        {
            this.lab_continue.visible = true;
            this.lab_exit.visible = true;
            this.lab_exit.on(Laya.Event.MOUSE_DOWN,this,this._restartGame);
            this.lab_continue.on(Laya.Event.MOUSE_DOWN,this,this._continueGame);
        }
    }
    private _restartGame():void
    {
        NetMgr.Inst.sendOutRoom();
    }
    private _continueGame():void
    {
        NetMgr.Inst.sendContinueMsg();
    }
    private _cleanScene():void
    {
        GameScene.Inst.destroy();
        Circle.Inst.destroy();
        this.destroy();
    }
}