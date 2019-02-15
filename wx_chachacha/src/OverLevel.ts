/*
* name;
*/
class OverLevel extends ui.OverLevelUI
{
    constructor()
    {
        super();
        this._setEvent();
        this._addFireEffect();
    }
    private _setEvent():void
    {
        this.lab_exit.on(Laya.Event.MOUSE_DOWN,this,()=>
        {
            //NetMgr.Inst.sendOutRoom();
            GameScene.Inst.handleGameOut({type:MsgMgr.MSG_out,name:PlayerData.pname,direction:PlayerData.direction});
            this.visible = false;
        });
        this.lab_next.on(Laya.Event.MOUSE_DOWN,this,()=>
        {
            NetMgr.Inst.sendOverLevelMsg();
        });
    }
    private _addFireEffect():void
    {
        for(let i = 0; i<3; i++)
        {
            let ani = new Laya.Animation();
            ani.interval = 50;
            ani.play(0,true,"ani_fire");
            ani.rotation = -90;
            this.addChild(ani);
            ani.pos((this.width/2-150-75)+150*i,this.height-100);
        }
    }
}