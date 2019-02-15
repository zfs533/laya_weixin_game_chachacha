import Handler = Laya.Handler;
import Loader = Laya.Loader;

//初始化微信小游戏
Laya.MiniAdpter.init();
//程序入口
Laya.init(640, 1136,Laya.WebGL);
Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
Laya.stage.alignH = Laya.Stage.ALIGN_CENTER
Laya.stage.alignV = Laya.Stage.ALIGN_CENTER;
//激活资源版本控制
Laya.ResourceVersion.enable("version.json", Handler.create(null, beginLoad), Laya.ResourceVersion.FILENAME_VERSION);


class Welcome
{
	constructor()
	{
		this._loadRes();
	}
	private _loadRes():void
	{
		let resArr = [
			"res/atlas/ui.atlas",
		];
		Laya.loader.load(resArr, Handler.create(null, this.onLoaded));
	}
	private onLoaded():void
	{
		let aniArr = [];
        for(let i = 0; i<25;i++)
        {
            aniArr.push("res/effect/start"+i+".png");
        }
        Laya.Animation.createFrames(aniArr,"ani_start");
		let fire = [];
		for(let i = 0; i<8;i++)
		{
			fire.push("res/effect/fire/fire"+i+".png");
		}
		Laya.Animation.createFrames(fire,"ani_fire");
		// let gameScene = new GameScene();
		// Laya.stage.addChild(gameScene);
		let wScene = new WelcomeScene();
		Laya.stage.addChild(wScene);

		Laya.stage.addChild(view.AlertView.Inst);
		view.AlertView.Inst.zOrder = 1000;
	}
}

function beginLoad(){
	new Welcome();
}
