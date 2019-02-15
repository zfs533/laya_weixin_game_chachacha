/**Created by the LayaAirIDE*/
module view
{
	export class AlertView extends ui.AlertViewUI
	{
		private static _inst:AlertView;
		public static get Inst():AlertView
		{
			return this._inst || (this._inst = new AlertView());
		}
		constructor()
		{
			super();
			this.alpha = 0;
			AlertView._inst = this;
		}
		public show(info:string):void
		{
			this.lab_alert.text = info;
			this._playAction();
		}
		private _playAction():void
		{
			this.alpha = 0;
			this.y = 100;
			Laya.Tween.to(this,{alpha:1,y:50},1000,Laya.Ease.backOut,Laya.Handler.create(this,()=>
			{
				Laya.Tween.to(this,{alpha:0,y:0},1000,null,Laya.Handler.create(this,()=>
				{
					
				}));
			}));
		}
	}
}