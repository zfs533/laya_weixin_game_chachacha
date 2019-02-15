/*
* name;
*/
class Circle extends Laya.Sprite
{
    private static _inst:Circle;
    private _radius:number = 80;
    private _arrowList:Array<Arrow> = [];
    public static get Inst():Circle
    {
        return this._inst ||(this._inst = new Circle());
    }
    private _index:number = 0;
    private _data_lv;
    private _fishGirl:Laya.Image;
    constructor()
    {
        super();
        this._data_lv = LevelConfig.getCurrentLevelData();
        Circle._inst = this;
        this._drawCircle();
        this.timer.loop(10,this,this._tween);
        this.initBaseArrow(this._data_lv.origin);
    }
    private _drawCircle():void
    {
        // this.graphics.drawCircle(0,0,this._radius,"#ff00ff","#ffff00",2);
        // this.graphics.drawLine(-this._radius,0,this._radius,0,"#00ff00",2);
        // this.graphics.drawLine(0,-this._radius,0,this._radius,"#00ff00",2);
        let sp:Laya.Image = new Laya.Image();
        sp.loadImage("ui/gm_yuan.png");
        sp.scale(this._radius*2/sp.width,this._radius*2/sp.height);
        sp.anchorX = 0.5;
        sp.anchorY = 0.5;
        sp.pivot(0.5,0.5);
        this.addChild(sp);

        let fishGirl:Laya.Image = new Laya.Image();
        fishGirl.loadImage("ui/gm_yu0.png");
        fishGirl.anchorX = 0.5;
        fishGirl.anchorY = 0.5;
        this.addChild(fishGirl);
        this._fishGirl = fishGirl;
    }
    private _tween():void
    {
        this.rotation+=1;
        if(this._fishGirl)
        {
            this._fishGirl.rotation-=1;
        }
        if(this.rotation>=360*100000)
        {
            this._fishGirl.rotation = 0;
            this.rotation = 0;
        }
    }
    public checkArrowCollideBottom(pos:Laya.Point):boolean
    {
        if(pos.y<=this.y+this._radius)
        {
            this._addArrow1();
            return true;
        }
        return false;
    }
    public checkArrowCollideTop(pos:Laya.Point):boolean
    {
        if(pos.y>=this.y-this._radius)
        {
            this._addArrow2();
            return true;
        }
        return false;
    }
    public initBaseArrow(num:number):void
    {
        //在圆上平均排列
        let angle_gap = 360/num;
        for(let i = 0; i<num; i++)
        {
            this._index++;
            let angle = angle_gap*i+90;
            let hudu = angle/180*Math.PI;
            let arrow:Arrow = new Arrow();
            arrow.setIndex(this._index);
            let pos:Laya.Point = new Laya.Point(-Math.cos(hudu)*this._radius,Math.sin(hudu)*this._radius);
            arrow.pos(pos.x,pos.y);
            arrow.rotation = -angle_gap*i;
            this.addChild(arrow);
            this._arrowList.push(arrow);
        }   
    }
    private _addArrow1():void
    {
        this._index++;
        let angle = this.rotation+90;
        let hudu = angle/180*Math.PI;
        let arrow:Arrow = new Arrow();
        arrow.setIndex(this._index);
        let pos:Laya.Point = new Laya.Point(-Math.cos(hudu)*this._radius,Math.sin(hudu)*this._radius);
        arrow.pos(pos.x,pos.y);
        arrow.rotation = -this.rotation;
        this.addChild(arrow);
        this._checkCollideBetweenArrow(arrow);
    }
    private _addArrow2():void
    {
        this._index++;
        let angle = this.rotation-90;
        let hudu = angle/180*Math.PI;
        let arrow:Arrow = new Arrow();
        arrow.setIndex(this._index);
        let pos:Laya.Point = new Laya.Point(-Math.cos(hudu)*this._radius,Math.sin(hudu)*this._radius);
        arrow.pos(pos.x,pos.y);
        arrow.rotation = -this.rotation+180;
        this.addChild(arrow);
        this._checkCollideBetweenArrow(arrow);
    }
    private _checkCollideBetweenArrow(arrow:Arrow):void
    {
        //只需要判断两个arrow起点坐标间的物理距离即可
        for(let i = 0;i<this._arrowList.length;i++)
        {
            let item:Arrow = this._arrowList[i];
            let xx = item.x - arrow.x;
            let yy = item.y - arrow.y;
            let distance = Math.sqrt(xx*xx+yy*yy);
            if(distance<= arrow.getRectangle().width)
            {
                this.timer.clear(this,this._tween);
                arrow.drawRect();
                item.drawRect();
                let obj = {
                    arrow1:{index:arrow.getIndex(),x:arrow.x,y:arrow.y,rotation:arrow.rotation},
                    arrow2:{index:item.getIndex(),x:item.x,y:item.y,rotation:item.rotation},
                }
                GameScene.Inst.sendGameOverOrder(obj);
                return;
            }
        }
        this._arrowList.push(arrow);
        GameScene.Inst.checkOverLevel();
    }
    public checkoutCollision(data):void
    {
        let arr = [data.data.arrow1,data.data.arrow2];
        for(let i = 0;i<this._arrowList.length;i++)
        {
            for(let j = 0; j<arr.length; j++)
            {
                let index1 = this._arrowList[i].getIndex();
                let index2 = arr[j].index;
                if(index1 == index2)
                {
                    this._arrowList[i].pos(arr[j].x,arr[j].y);
                    this._arrowList[i].rotation = arr[j].rotation;
                    this._arrowList[i].drawRect();
                    this.timer.clear(this,this._tween);
                }
            }
        }
    }
}