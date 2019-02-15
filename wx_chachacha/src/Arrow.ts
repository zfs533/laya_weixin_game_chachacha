/*
* name;
*/
class Arrow extends Laya.Sprite
{
    private _radius:number = 10;
    private _lineH:number = 150;
    private _speed:number = 100;
    private _rectArr = new Laya.Rectangle(-this._radius/2,0,this._radius,this._radius+this._lineH);
    private _isTop:boolean = false;
    private _index:number = 0;
    private _arrow:Laya.Sprite;
    private _data_lv;
    constructor()
    {
        super();
        this._data_lv = LevelConfig.getCurrentLevelData();
        this._drawArrow();
    }
    private _drawArrow():void
    {
        // this.graphics.drawLine(0,0,0,this._lineH,"#ffffff",3);
        // this.graphics.drawCircle(0,this._lineH+this._radius,this._radius,"#ffffff","#ffffff",1);

        let sp:Laya.Image = new Laya.Image();
        sp.loadImage("ui/knife"+this._data_lv.arrow+".png");
        sp.x = -sp.width/2;
        this.addChild(sp);
        this._arrow = sp;
    }
    public startMove():void
    {
        this.timer.loop(1,this,this._move);
    }
    private _move():void
    {
        if(this._isTop)
        {
            this._handleTopMove();
        }
        else
        {
            this._handleBottomMove();
        }
        
    }
    private _handleTopMove():void
    {
        this.y += this._speed;
        if(this.y>1136+110)
        {
            this.ArrowRemoveSelf();
        }
        else
        {
            let pos:Laya.Point = new Laya.Point(this.x,this.y);
            let bool:boolean = Circle.Inst.checkArrowCollideTop(pos);
            if(bool)
            {
                this.ArrowRemoveSelf();
            }
        }
    }
    private _handleBottomMove():void
    {
        this.y-=this._speed;
        if(this.y<-this._radius)
        {
            this.ArrowRemoveSelf();
        }
        else
        {
            let pos:Laya.Point = new Laya.Point(this.x,this.y);
            let bool:boolean = Circle.Inst.checkArrowCollideBottom(pos);
            if(bool)
            {
                this.ArrowRemoveSelf();
            }
        }
    }
    public ArrowRemoveSelf():void
    {
        this.timer.clear(this,this._move);
        this.destroy();
    }
    public drawRect():void
    {
        let filter:Laya.GlowFilter = new Laya.GlowFilter("#ff0000", 5, 0, 0);
        this._arrow.filters = [filter,filter];
        // this.graphics.drawRect(this._rectArr.x,this._rectArr.y,this._rectArr.width,this._rectArr.height,null,"#00ff00",1);
    }
    public getRectangle():Laya.Rectangle
    {
        return this._rectArr;
    }
    public setIsTop():void
    {
        this._isTop = true;
        this.rotation = 180;
    }
    public getIsTop():boolean
    {
        return this._isTop;
    }
    public setIndex(index:number):void
    {
        this._index = index;
    }
    public getIndex():number
    {
        return this._index;
    }
}