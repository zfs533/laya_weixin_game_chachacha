var Message = {};
Message.single_pattern = 1;
Message.double_pattern = 2;
//加入房间,人数未满时处于等待状态，人数满时自动开始游戏
Message.MSG_join = 1001;
Message.struct_join_item =function(){ 
    return {
        pattern:0,
        name:"",
        direction:0,
    }
}
Message.struct_join = {
    type:0,
    list:[],
    // name:"",
    // direction:0,//位置
}
//开始游戏,给同一个房间玩家发送开始游戏的消息
Message.MSG_start = 1002;
Message.struct_start = {
    type:0,
    pattern:0,
    first:0,//先手
    level:0,//当前关卡
}
//游戏中...，两个玩家交替出手
Message.MSG_game = 1003;
Message.struct_game = {
    type:0,
    pattern:0,
    cur:0,//当前谁出
    next:0,//下一个谁出
}
//退出房间，直接游戏结束
Message.MSG_out = 1004;
Message.struct_out = {
    type:0,
    pattern:0,
    name:"",
    direction:0,
}
//游戏结束，展示游戏结束界面,准备下一次挑战
Message.MSG_gameend = 1005;
Message.struct_end = {
    type:0,
    pattern:0,
    name:"",//失败方name
    direction:0,//失败方direction
    data:null,
}
//游戏结束，继续游戏
Message.MSG_continue = 1006;
Message.struct_continue = {
    type:0,
    pattern:0,
    name:"",
    direction:0,
}
//过关
Message.MSG_overlevel = 1007;
Message.struct_overlevel = {
    type:0,
    pattern:0,
    level:0,
    name:"",
    direction:0,
}
exports.route = Message;