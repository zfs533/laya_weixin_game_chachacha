
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class AlertViewUI extends View {
		public lab_alert:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"skin":"ui/alert.png","centerY":0,"centerX":0}},{"type":"Label","props":{"wordWrap":true,"width":640,"var":"lab_alert","valign":"middle","text":"玩家昵称不能为空玩家昵称不能为空玩家昵称不能为空玩家昵称不能为空玩家昵称不能为空玩家昵称不能为空","overflow":"visible","height":100,"fontSize":24,"color":"#ffffff","centerY":0,"centerX":0,"align":"center"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.AlertViewUI.uiView);

        }

    }
}

module ui {
    export class GameOverUI extends View {
		public lab_gameover:Laya.Label;
		public lab_exit:Laya.Label;
		public lab_continue:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"ui/black_bg.png"}},{"type":"Label","props":{"var":"lab_gameover","text":"GAME OVER!","fontSize":60,"color":"#ffffff","centerY":0,"centerX":0}},{"type":"Label","props":{"var":"lab_exit","text":"退出","fontSize":60,"color":"#ffffff","centerY":96,"centerX":-81}},{"type":"Label","props":{"var":"lab_continue","text":"继续","fontSize":60,"color":"#ffffff","centerY":96,"centerX":87}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.GameOverUI.uiView);

        }

    }
}

module ui {
    export class GameSceneUI extends View {
		public box_p1:Laya.Box;
		public img_head_one:Laya.Image;
		public txt_name1:laya.display.Text;
		public img_h1:Laya.Image;
		public img_ready1:Laya.Image;
		public box_p2:Laya.Box;
		public img_head_two:Laya.Image;
		public txt_name2:laya.display.Text;
		public img_h2:Laya.Image;
		public img_ready2:Laya.Image;
		public img_mask2:Laya.Image;
		public box_level:Laya.Box;
		public txt_level:laya.display.Text;
		public txt_target_num:laya.display.Text;
		public btn_exit:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":0,"x":0,"skin":"ui/game_bg.png"}},{"type":"Box","props":{"y":1021,"x":15,"var":"box_p1"},"child":[{"type":"Image","props":{"y":23,"x":31,"width":58,"var":"img_head_one","skin":"ui/headicon.png","height":58}},{"type":"Text","props":{"y":43,"x":110,"width":129,"var":"txt_name1","text":"名字","height":24,"fontSize":24,"color":"#ffffff","bold":false}},{"type":"Image","props":{"y":-60,"x":28,"width":50,"var":"img_h1","skin":"ui/jiantou.png","height":50}},{"type":"Image","props":{"y":-19,"x":110,"width":50,"var":"img_ready1","skin":"ui/ready.png","height":50}},{"type":"Image","props":{"y":10,"x":10,"width":100,"skin":"ui/kuang.png","height":100}}]},{"type":"Box","props":{"y":68,"x":347,"var":"box_p2"},"child":[{"type":"Image","props":{"y":12,"x":213,"width":58,"var":"img_head_two","skin":"ui/headicon1.png","height":58}},{"type":"Text","props":{"y":31,"x":17,"width":174,"var":"txt_name2","text":"名字","height":24,"fontSize":24,"color":"#ffffff","bold":false,"align":"right"}},{"type":"Image","props":{"y":-57,"x":216,"width":50,"var":"img_h2","skin":"ui/jiantou.png","height":50}},{"type":"Image","props":{"y":-34,"x":142,"width":50,"var":"img_ready2","skin":"ui/ready.png","height":50}},{"type":"Image","props":{"y":-1,"x":192,"width":100,"var":"img_mask2","skin":"ui/kuang.png","height":100}}]},{"type":"Box","props":{"y":1,"x":0,"var":"box_level"},"child":[{"type":"Label","props":{"y":0,"x":0,"text":"当前关卡：","fontSize":30,"color":"#58ec5e"}},{"type":"Text","props":{"y":0,"x":140,"var":"txt_level","text":"1","fontSize":30,"color":"#e5f808","align":"left"}},{"type":"Label","props":{"y":41,"x":0,"text":"关卡目标：","fontSize":30,"color":"#d4bd46"}},{"type":"Text","props":{"y":41,"x":140,"var":"txt_target_num","text":"1","fontSize":30,"color":"#08e4f8","align":"left"}}]},{"type":"Button","props":{"var":"btn_exit","stateNum":1,"skin":"ui/btn2.png","mouseEnabled":true,"labelStrokeColor":"#ffffff","labelSize":30,"labelColors":"#ffff00","label":"退出房间","centerY":0,"centerX":0}}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("Text",laya.display.Text);

            super.createChildren();
            this.createView(ui.GameSceneUI.uiView);

        }

    }
}

module ui {
    export class OverLevelUI extends View {
		public img_black_bg:Laya.Image;
		public lab_exit:Laya.Label;
		public lab_next:Laya.Label;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Image","props":{"y":0,"x":0,"var":"img_black_bg","skin":"ui/black_bg.png"}},{"type":"Label","props":{"text":"恭喜过关","fontSize":50,"color":"#22e8a1","centerY":-246,"centerX":0,"bold":true}},{"type":"Label","props":{"var":"lab_exit","text":"退  出","fontSize":50,"color":"#8ddce7","centerY":-65,"centerX":-133,"bold":true}},{"type":"Label","props":{"var":"lab_next","text":"下一关","rotation":0,"fontSize":50,"color":"#f4e109","centerY":-65,"centerX":127,"bold":true}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.OverLevelUI.uiView);

        }

    }
}

module ui {
    export class WelcomeUI extends View {
		public box_roll:Laya.Box;
		public box_nickname:Laya.Box;
		public input_name:Laya.TextInput;
		public img_go:Laya.Image;
		public btn_single:Laya.Button;
		public btn_double:Laya.Button;

        public static  uiView:any ={"type":"View","props":{"width":640,"height":1136},"child":[{"type":"Box","props":{"y":0,"x":0,"width":640,"height":1136},"child":[{"type":"Image","props":{"x":0,"skin":"ui/wel_bg.png"}},{"type":"Box","props":{"y":239,"x":321,"width":400,"var":"box_roll","rotation":0,"pivotY":211,"pivotX":217,"height":400},"child":[{"type":"Image","props":{"y":292.0000000535896,"x":199.00000008038427,"skin":"ui/knife4.png"}},{"type":"Image","props":{"y":298.0000000535896,"x":238.00000008038427,"skin":"ui/knife0.png","rotation":-30}},{"type":"Image","props":{"y":276.0000000535896,"x":277.00000008038427,"skin":"ui/knife2.png","rotation":-60}},{"type":"Image","props":{"y":231.0000000535896,"x":299.00000008038427,"skin":"ui/knife3.png","rotation":-90}},{"type":"Image","props":{"y":223.0000000535896,"x":131.00000008038427,"width":34,"skin":"ui/knife4.png","rotation":-270,"pivotY":1,"pivotX":33,"height":132}},{"type":"Image","props":{"y":131.0000000535896,"x":202.00000008038427,"width":34,"skin":"ui/knife4.png","rotation":-180,"pivotY":1,"pivotX":33,"height":132}},{"type":"Image","props":{"y":166.0000000535896,"x":141.00000008038427,"width":34,"skin":"ui/knife5.png","rotation":-220,"pivotY":1,"pivotX":33,"height":132}},{"type":"Image","props":{"y":290.0000000535896,"x":178.00000008038427,"width":34,"skin":"ui/knife0.png","rotation":30,"pivotY":1,"pivotX":33,"height":132}},{"type":"Image","props":{"y":147.0000000535896,"x":274.00000008038427,"width":34,"skin":"ui/knife2.png","rotation":-120,"pivotY":1,"pivotX":33,"height":132}},{"type":"Image","props":{"y":268.0000000535896,"x":147.00000008038427,"width":34,"skin":"ui/knife1.png","rotation":-300,"pivotY":1,"pivotX":33,"height":132}},{"type":"Image","props":{"y":128,"x":131,"width":213,"skin":"ui/gm_yuan.png","scaleY":0.8,"scaleX":0.8,"pivotY":-2,"pivotX":1,"height":213}}]}]},{"type":"Image","props":{"y":183,"x":265,"width":99,"skin":"ui/gm_yu0.png","scaleY":1,"scaleX":1,"pivotY":-2,"pivotX":1,"height":124}},{"type":"Box","props":{"y":623,"x":173,"var":"box_nickname"},"child":[{"type":"Label","props":{"y":42,"x":105,"width":153,"text":"NickName：","pivotY":28,"pivotX":153,"height":50,"fontSize":32,"color":"#e8e89c","bold":true}},{"type":"TextInput","props":{"y":5,"x":133,"width":298,"var":"input_name","promptColor":"#ccbaba","prompt":"please input nickname","height":50,"fontSize":30,"color":"#3ce7be"}}]},{"type":"Image","props":{"y":704,"x":277,"var":"img_go","skin":"ui/go.png","scaleY":0.5,"scaleX":0.5}},{"type":"Button","props":{"y":506,"x":100,"var":"btn_single","stateNum":1,"skin":"ui/btn2.png","mouseEnabled":true,"left":100,"labelStrokeColor":"#ffffff","labelSize":30,"labelColors":"#00ffff","label":"单人模式"}},{"type":"Button","props":{"y":506,"x":350,"var":"btn_double","stateNum":1,"skin":"ui/btn2.png","right":100,"mouseEnabled":true,"labelStrokeColor":"#ffffff","labelSize":30,"labelColors":"#ffff00","label":"双人模式"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.WelcomeUI.uiView);

        }

    }
}
