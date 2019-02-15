/*
* name;
*/
var CirleArrowManager = /** @class */ (function () {
    function CirleArrowManager(_parentt) {
        this._gap = 35;
        this._bottomArr = [];
        this._topArr = [];
        this._showNum = 1;
        this._maxNum = 8;
        this._moveFinished = true;
        this._curCount = 0;
        this._parentt = _parentt;
        this._data_lv = LevelConfig.getCurrentLevelData();
        this._maxNum = this._data_lv.target;
        this._init();
    }
    CirleArrowManager.prototype._init = function () {
        for (var i = 0; i < this._showNum; i++) {
            var arrow = new Arrow();
            arrow.pos(this._parentt.width / 2 + i * this._gap, this._parentt.height - arrow.getRectangle().height - arrow.getRectangle().width);
            this._parentt.addChild(arrow);
            this._bottomArr.push(arrow);
            this._curCount++;
        }
        if (PlayerData.gamePattern == MsgMgr.doublePattern) {
            for (var i = 0; i < this._showNum; i++) {
                var arrow = new Arrow();
                arrow.setIsTop();
                arrow.pos(this._parentt.width / 2 - i * this._gap, arrow.getRectangle().height + arrow.getRectangle().width);
                this._parentt.addChild(arrow);
                this._topArr.push(arrow);
                this._curCount++;
            }
        }
    };
    CirleArrowManager.prototype.checkOverLevel = function () {
        if (PlayerData.gamePattern == MsgMgr.doublePattern) {
            if (this._bottomArr.length == 0 && this._topArr.length == 0) {
                if (PlayerData.gamestatus != PlayerData.STATUES_END) {
                    //通关
                    this._parentt.setOverLevel();
                }
            }
        }
        else {
            if (this._bottomArr.length == 0) {
                if (PlayerData.gamestatus != PlayerData.STATUES_END) {
                    //通关
                    this._parentt.setOverLevel();
                }
            }
        }
        // console.log(this._bottomArr.length,this._topArr.length);
    };
    CirleArrowManager.prototype.launchBottom = function () {
        if (!this._moveFinished) {
            return;
        }
        this._moveFinished = false;
        if (this._bottomArr.length > 0) {
            this._bottomArr[0].startMove();
            this._layoutBottomArrow();
        }
        else {
            console.log("this._curCount=> " + this._curCount + "  maxnum=>" + this._maxNum);
        }
    };
    CirleArrowManager.prototype.launchTop = function () {
        if (!this._moveFinished) {
            return;
        }
        this._moveFinished = false;
        if (this._topArr.length > 0) {
            this._topArr[0].startMove();
            this._layoutTopArrow();
        }
        else {
            console.log("this._curCount=> " + this._curCount + "  maxnum=>" + this._maxNum);
        }
    };
    CirleArrowManager.prototype._layoutBottomArrow = function () {
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
    };
    CirleArrowManager.prototype._layoutTopArrow = function () {
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
    };
    CirleArrowManager.prototype._moveFinish = function (bool) {
        this._moveFinished = true;
        if (this._curCount < this._maxNum) {
            this._addArrow(bool);
        }
    };
    CirleArrowManager.prototype._addArrow = function (bool) {
        var arrow = new Arrow();
        if (bool) {
            arrow.setIsTop();
            arrow.pos(this._parentt.width / 2 - (this._topArr.length) * this._gap, arrow.getRectangle().height + arrow.getRectangle().width);
            this._topArr.push(arrow);
        }
        else {
            arrow.pos(this._parentt.width / 2 + (this._bottomArr.length) * this._gap, this._parentt.height - arrow.getRectangle().height);
            this._bottomArr.push(arrow);
        }
        this._parentt.addChild(arrow);
        this._curCount++;
    };
    CirleArrowManager.prototype.cleaningData = function () {
        for (var i = 0; i < this._topArr.length; i++) {
            this._topArr[i].ArrowRemoveSelf();
        }
        for (var i = 0; i < this._bottomArr.length; i++) {
            this._bottomArr[i].ArrowRemoveSelf();
        }
    };
    return CirleArrowManager;
}());
//# sourceMappingURL=CirleArrowManager.js.map