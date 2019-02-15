var homedata = {};
homedata.max = 2;//一个房间人数
var countId = 0;
function getinfo()
{
    var info= {
        id:countId++,
        socket:null,
        pattern:0,
        direction:0,//0在上，1在下
        name:"",
        state:0,//0等待，1开始游戏,2继续游戏
        first:false,//是否为先手
        level:1,
    }
    return info;
}
homedata.list = [];
for(var i = 0;i<10000;i++)
{
    homedata.list.push([]);
}
homedata.listSingle = [];//单人模式玩家列表

homedata.handleJoinSingle = function(msg,socket)
{
    var obj = homedata.getItem(msg,socket);
    homedata.listSingle.push(obj);
    return obj;
}
//只有满两人的才能开始游戏,一个人进入，游戏处于等待状态
homedata.handleJoin = function(msg,socket)
{
    for(var i = 0; i<homedata.list.length;i++)
    {
        var item = homedata.list[i];
        if(item.length == 1 && item[0].level == 1)
        {
            var obj = homedata.getItem(msg,socket,item[0]);
            item.push(obj);
            return item;
        }
    }
    for(var i = 0; i<homedata.list.length;i++)
    {
        var item = homedata.list[i];
        if(item.length == 0)
        {
            var obj = homedata.getItem(msg,socket);
            item.push(obj);
            return item;
        }
    }
}

homedata.getItem = function(msg,socket,item)
{
    var info = getinfo();
    info.first = true;
    info.socket = socket;
    info.name = msg.name;
    info.state = 0;
    info.pattern = msg.pattern;
    info.level = 1;
    if(item)
    {
        info.direction = item.direction == 0 ? 1 : 0;
        info.state = 1;//切换为游戏状态，向客户端发送开始游戏的消息
        item.state = 1;
        item.level = 1;
    }
    return info;
}


homedata.getOneRoom = function(socket)
{
    for(var i = 0; i<homedata.list.length;i++)
    {
        var item = homedata.list[i];
        if(item.length == 2)
        {
            if(item[0].socket == socket || item[1].socket == socket)
            {
                return item;
            }
        }
    }
    return false;
}
homedata.getSinglePlayer = function(socket)
{
    for(var i = 0; i<homedata.listSingle.length;i++)
    {
        if(homedata.listSingle[i].socket == socket)
        {
            return homedata.listSingle[i];
        }
    }
    return false;
}
exports.route = homedata;



