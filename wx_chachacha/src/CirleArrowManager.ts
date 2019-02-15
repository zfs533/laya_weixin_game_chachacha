/*
* name;
*/
class CirleArrowManager
{
    private _gap:number = 35;
    private _bottomArr:Array<Arrow> = [];
    private _topArr:Array<Arrow> = [];
    private _parentt:GameScene;
    private _showNum:number = 1;
    private _maxNum:number = 8;
    private _moveFinished:boolean = true;
    private _curCount:number = 0;
    private _data_lv;
    constructor(_parentt:GameScene)
    {
        this._parentt = _parentt;
        this._data_lv = LevelConfig.getCurrentLevelData();
        this._maxNum = this._data_lv.target;
        this._init();
    }
    private _init():void
    {
        for(let i = 0;i<this._showNum;i++)
        {
            let arrow:Arrow = new Arrow();
            arrow.pos(this._parentt.width/2+i*this._gap,this._parentt.height-arrow.getRectangle().height-arrow.getRectangle().width);
            this._parentt.addChild(arrow);
            this._bottomArr.push(arrow);
            this._curCount++;
        }
        if(PlayerData.gamePattern == MsgMgr.doublePattern)
        {
            for(let i = 0;i<this._showNum;i++)
            {
                let arrow:Arrow = new Arrow();
                arrow.setIsTop();
                arrow.pos(this._parentt.width/2-i*this._gap,arrow.getRectangle().height+arrow.getRectangle().width);
                this._parentt.addChild(arrow);
                this._topArr.push(arrow);
                this._curCount++;
            }
        }
    }
    public checkOverLevel():void
    {
        if(PlayerData.gamePattern == MsgMgr.doublePattern)
        {
            if(this._bottomArr.length == 0 && this._topArr.length == 0)
            {
                if(PlayerData.gamestatus != PlayerData.STATUES_END)
                {
                    //通关
                    this._parentt.setOverLevel();
                }
            }
        }
        else
        {
            if(this._bottomArr.length == 0)
            {
                if(PlayerData.gamestatus != PlayerData.STATUES_END)
                {
                    //通关
                    this._parentt.setOverLevel();
                }
            }
        }
        
        // console.log(this._bottomArr.length,this._topArr.length);
    }
    public launchBottom():void
    {
        if(!this._moveFinished){return;}
        this._moveFinished = false;
        if(this._bottomArr.length>0)
        {
            this._bottomArr[0].startMove();
            this._layoutBottomArrow();
        }
        else
        {
            console.log("this._curCount=> "+this._curCount+"  maxnum=>"+this._maxNum);
        }
    }
    public launchTop():void
    {
        if(!this._moveFinished){return;}
        this._moveFinished = false;
        if(this._topArr.length>0)
        {
            this._topArr[0].startMove();
            this._layoutTopArrow();
        }
        else
        {
            console.log("this._curCount=> "+this._curCount+"  maxnum=>"+this._maxNum);
        }
    }
    private _layoutBottomArrow():void
    {
        this._bottomArr.shift();
        // for(let i = 0;i<this._bottomArr.length;i++)
        // {
        //     Laya.Tween.to(this._bottomArr[i],{x:this._bottomArr[i].x-this._gap},300,null,new Laya.Handler(this,()=>
        //     {
        //         if(i == this._bottomArr.length-1)
        //         {
        //             this._moveFinish();
        //         }
        //     }));
        // }
        this._moveFinish();
    }
    private _layoutTopArrow():void
    {
        this._topArr.shift();
        // for(let i = 0;i<this._topArr.length;i++)
        // {
        //     Laya.Tween.to(this._topArr[i],{x:this._topArr[i].x+this._gap},300,null,new Laya.Handler(this,()=>
        //     {
        //         if(i == this._topArr.length-1)
        //         {
        //             this._moveFinish(true);
        //         }
        //     }));
        // }
        this._moveFinish(true);
    }
    private _moveFinish(bool?:boolean):void
    {
        this._moveFinished = true;
        if(this._curCount<this._maxNum)
        {
            this._addArrow(bool);
        }
    }
    private _addArrow(bool?:boolean):void
    {
        let arrow:Arrow = new Arrow();
        if(bool)
        {
            arrow.setIsTop();
            arrow.pos(this._parentt.width/2-(this._topArr.length)*this._gap,arrow.getRectangle().height+arrow.getRectangle().width);
            this._topArr.push(arrow);
        }
        else
        {
            arrow.pos(this._parentt.width/2+(this._bottomArr.length)*this._gap,this._parentt.height-arrow.getRectangle().height);
            this._bottomArr.push(arrow);
        }
        this._parentt.addChild(arrow);
        this._curCount++;
    }
    public cleaningData():void
    {
        for(let i = 0;i<this._topArr.length;i++)
        {
            this._topArr[i].ArrowRemoveSelf();
        }
        for(let i = 0;i<this._bottomArr.length;i++)
        {
            this._bottomArr[i].ArrowRemoveSelf();
        }
    }
}