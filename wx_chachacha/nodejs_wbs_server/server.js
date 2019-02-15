
/*
若电脑上没安装nodejs：
    1:在电脑上安装nodejs
    2:使用npm命令安装nodejs-websocket模块
*/
var DataBase = require('./database');
var DBcontrl = DataBase.route;
var DhomeData = require('./homedata').route;
var MsgData = require('./message').route;
(function()
{
//引入WebSocket模块
// var ws = require('nodejs-websocket')//路径为nodejs-websocket npm安装目录路径,如：C:\\Users\\nodejs\\node_modules\\nodejs-websocket
var ws = require('H:\\Apan_WorkAbout\\duokemeng\\Laya\\wx_chachacha\\nodejs_wbs_server\\nodejs-websocket')
var PORT = 9890
 
// on就是addListener，添加一个监听事件调用回调函数
// Scream server example:"hi"->"HI!!!",服务器把字母大写
var svArr = [];
var server = ws.createServer(function(conn)
{
    console.log('New connection'+conn);
    console.log(DhomeData.list.length);
    svArr.push(conn);
    console.log(svArr.length);
    conn.on("text",function(msg)
    {
        console.log("Received"+msg)
        handleMessage(msg,conn)
    })
    conn.on("close",function(code,reason)
    {
        console.log("connection closed")
        handleClose(conn);
    })
    conn.on("error",function(err)
    {
        console.log("handle err")
        console.log(err)
    })
}).listen(PORT,"10.0.7.65");

console.log("websocket 建立完毕");
console.log("PORT=> "+PORT);
function handleClose(conn)
{
    for(var i = 0; i<svArr.length; i++)
    {
        if(svArr[i] == conn)
        {
            svArr.splice(i,1);
            break;
        }
    }
    handleOut(conn,true);
}
function handleOut(conn,isClose)
{
    console.log("handleout ------------------------- ");
    for(var i = 0; i<DhomeData.list.length;i++)
    {
        var item = DhomeData.list[i];
        if(item.length>0)
        {
            for(var j = 0;j<item.length;j++)
            {
                console.log("player name:"+item[j].name+"  out room"+item.length);
                if(item[j].socket == conn)
                {
                    console.log("player name:"+item[j].name+"  out room conn");
                    //给房间的人发送这个人下线操作
                    var data = MsgData.struct_out;
                    data.type = MsgData.MSG_out;
                    data.name = item[j].name;
                    data.direction = item[j].direction;
                    data.pattern = item[j].pattern;
                    if(item.length==2)
                    {
                        if(!isClose)
                        {
                            sendData(item[0].socket,JSON.stringify(data));
                            sendData(item[1].socket,JSON.stringify(data));
                        }
                    }
                    else
                    {
                        if(!isClose)
                        {
                            sendData(item[0].socket,JSON.stringify(data));
                        }
                    }
                    item.splice(j,1);
                    console.log("item.length=> "+item.length);
                    return;
                }
            }
        }
    }
    for(var k = 0; k< DhomeData.listSingle.length;k++)
    {
        var item = DhomeData.listSingle[k];
        if(item.socket == conn)
        {
            var data = MsgData.struct_out;
            data.type = MsgData.MSG_out;
            data.name = item.name;
            data.direction = item.direction;
            data.pattern = item.pattern;
            sendData(item.socket,JSON.stringify(data));
        }
    }
    console.log("out: can not find room");
}
function handleOutData()
{
    
}
//----------------------------------------
function handleMessage(msg,socket)
{
    var data = JSON.parse(msg);
    switch(data.type)
    {
        case MsgData.MSG_join:
        {
            handleJoinMessage(data,socket);
            break;
        }
        case MsgData.MSG_game:
        {
            handleGameMessage(data,socket);
            break;
        }
        case MsgData.MSG_out:
        {
            handleOut(socket);
            break;
        }
        case MsgData.MSG_gameend:
        {
            handleGameEnd(data,socket);
            break;
        }
        case MsgData.MSG_continue:
        {
            handleContinue(data,socket);
            break;
        }
        case MsgData.MSG_overlevel:
        {
            handleOverlevel(data,socket);
            break;
        }
        default:break;
    }
}

function handleJoinMessage(msg,socket)
{
    if(msg.pattern == MsgData.single_pattern)
    {
        var data = MsgData.struct_join;
        data.list.splice(0);
        data.type = MsgData.MSG_join;
        var room = DhomeData.handleJoinSingle(msg,socket);
        var item = MsgData.struct_join_item();
        item.name = room.name;
        item.direction = room.direction;
        item.pattern = msg.pattern;
        data.list.push(item);
        sendData(socket,JSON.stringify(data));

        data = MsgData.struct_start;
        data.type = MsgData.MSG_start;
        data.first = 0;
        data.level = 1;
        data.pattern = msg.pattern;
        sendData(socket,JSON.stringify(data));
    }
    else if(!checkIsJoined(socket))
    {
        var data = MsgData.struct_join;
        data.list.splice(0);
        data.type = MsgData.MSG_join;
        var room = DhomeData.handleJoin(msg,socket);
        console.log("room");
        console.log(room);
        console.log(room.length);
        //房间人数一满就发游戏开始消息
        if(room.length == 2)
        {
            for(var i = 0; i<2;i++)
            {
                var item = MsgData.struct_join_item();
                item.name = room[i].name;
                item.direction = room[i].direction;
                item.pattern = msg.pattern;
                data.list.push(item);
            }
            //先发加入消息
            for(var i = 0; i<room.length;i++)
            {
                sendData(room[i].socket,JSON.stringify(data));
            }
            //再发开始消息
            data = MsgData.struct_start;
            data.type = MsgData.MSG_start;
            data.first = Math.floor(Math.random()*2);
            data.level = 1;
            data.pattern = msg.pattern;
            for(var i = 0; i<room.length;i++)
            {
                sendData(room[i].socket,JSON.stringify(data));
            }
        }
        else
        {
            var item = MsgData.struct_join_item();
            item.name = msg.name;
            item.direction = room[0].direction;
            item.pattern = msg.pattern;
            data.list.push(item);
            sendData(socket,JSON.stringify(data));
        }
        
    }
}

function handleGameMessage(msg,socket)
{
    if(msg.pattern == MsgData.single_pattern)
    {
        var data = MsgData.struct_game;
        data.cur = msg.cur;
        data.type = MsgData.MSG_game;
        data.next = 0;
        data.pattern = msg.pattern;
        sendData(socket,JSON.stringify(data));
        return;
    }
    var room = DhomeData.getOneRoom(socket);
    if(room)
    {
        var next = msg.cur == 0 ? 1 : 0;
        var data = MsgData.struct_game;
        data.cur = msg.cur;
        data.type = MsgData.MSG_game;
        data.next = next;
        data.pattern = msg.pattern;
        for(var i = 0; i<room.length;i++)
        {
            sendData(room[i].socket,JSON.stringify(data));
        }
    }
    else
    {
        console.log("game... : not found room");
    }
}
//msg{type:,name:,direction:}
function handleGameEnd(msg,socket)
{
    if(msg.pattern == MsgData.single_pattern)
    {
        var room = DhomeData.getSinglePlayer(socket);
        if(room)
        {
            room.state = 0;
            var data = MsgData.struct_end;
            data.type = MsgData.MSG_gameend;
            data.name = msg.name;
            data.direction = msg.direction;
            data.pattern = msg.pattern;
            data.data = msg.data;
            sendData(socket,JSON.stringify(data));
        }
        else
        {
            console.log("end single: not find player")
        }
        return;
    }
    var room = DhomeData.getOneRoom(socket);
    if(room)
    {
        var data = MsgData.struct_end;
        data.type = MsgData.MSG_gameend;
        data.name = msg.name;
        data.direction = msg.direction;
        data.data = msg.data;
        for(var i = 0; i<room.length;i++)
        {
            room[i].state = 0
            sendData(room[i].socket,JSON.stringify(data));
        }
    }
    else
    {
        console.log("end: not found room");
    }
}

function handleContinue(msg,socket)
{
    if(msg.pattern == MsgData.single_pattern)
    {
        var room = DhomeData.getSinglePlayer(socket);
        if(room)
        {
            room.state = 2;
            var data = MsgData.struct_continue;
            data.type = MsgData.MSG_continue;
            data.name = msg.name;
            data.direction = msg.direction;
            data.pattern = msg.pattern;
            sendData(socket,JSON.stringify(data));
            checkIsAllReadied(msg,socket);
        }
        else
        {
            console.log("continue single: not find player")
        }
        return;
    }
    var room = DhomeData.getOneRoom(socket);
    if(room)
    {
        var data = MsgData.struct_continue;
        data.type = MsgData.MSG_continue;
        data.name = msg.name;
        data.direction = msg.direction;
        data.pattern = MsgData.double_pattern;
        for(var i = 0; i<room.length;i++)
        {
            if(room[i].name == msg.name)
            {
                room[i].state = 2
            }
            sendData(room[i].socket,JSON.stringify(data));
        }
        checkIsAllReadied(msg,socket);
    }
    else
    {
        var data = MsgData.struct_continue;
        data.type = MsgData.MSG_continue;
        data.name = msg.name;
        data.direction = msg.direction;
        data.pattern = MsgData.double_pattern;
        sendData(socket,JSON.stringify(data));
        console.log("continue: not found room");
    }
}
//继续游戏，都准备了就直接发开始游戏的消息
function checkIsAllReadied(msg,socket)
{
    if(msg.pattern == MsgData.single_pattern)
    {
        var room = DhomeData.getSinglePlayer(socket);
        if(room)
        {
            var data = MsgData.struct_start;
            data.type = MsgData.MSG_start;
            data.first = 0;
            data.level = room.level;
            data.pattern = MsgData.single_pattern;
            room.state = 1;
            sendData(socket,JSON.stringify(data));
        }
        else
        {
            console.log("continue single check: not found room");
        }
        return;
    }
    var room = DhomeData.getOneRoom(socket);
    if(room)
    {
        var level = 0;
        var count = 0;
        for(var i = 0; i<room.length;i++)
        {
            if(room[i].state == 2)
            {
                count++;
            }
            level = room[i].level;
        }
        if(count == 2)
        {
            var data = MsgData.struct_start;
            data.type = MsgData.MSG_start;
            data.first = Math.floor(Math.random()*2);
            data.level = level;
            data.pattern = MsgData.double_pattern;
            for(var i = 0; i<room.length;i++)
            {
                room[i].state = 1;
                sendData(room[i].socket,JSON.stringify(data));
            }
        }
    }
    else
    {
        console.log("continue check: not found room");
    }
}
//over level and continue next level
function handleOverlevel(msg,socket)
{
    if(msg.pattern == MsgData.single_pattern)
    {
        var room = DhomeData.getSinglePlayer(socket);
        if(room)
        {
            var data = MsgData.struct_continue;
            data.type = MsgData.MSG_continue;
            data.name = msg.name;
            data.direction = msg.direction;
            data.pattern = msg.pattern;
            room.state = 2
            room.level++;
            sendData(room.socket,JSON.stringify(data));
        }
        else
        {
            handleOut(socket);
            console.log("overlevel single: someone leave the room");
        }
        checkIsAllReadied(msg,socket);
        return;
    }
    var room = DhomeData.getOneRoom(socket);
    if(room)
    {
        var data = MsgData.struct_continue;
        data.type = MsgData.MSG_continue;
        data.name = msg.name;
        data.direction = msg.direction;
        data.pattern = msg.pattern;
        for(var i = 0; i<room.length;i++)
        {
            if(room[i].name == msg.name)
            {
                room[i].state = 2
                room[i].level++;
            }
            sendData(room[i].socket,JSON.stringify(data));
        }
        checkIsAllReadied(msg,socket);
    }
    else
    {
        handleOut(socket);
        console.log("overlevel: someone leave the room");
    }
}

function checkIsJoined(socket)
{
    for(var i = 0; i<DhomeData.list.length;i++)
    {
        var item = DhomeData.list[i];
        if(item.length>0)
        {
            for(var j = 0;j<item.length;j++)
            {
                if(item[j].socket == socket)
                {
                    return true;
                }
            }
        }
    }
    return false;
}
//---------------------chat---------------

// setInterval(function()
// {
//     for(var i = 0; i<svArr.length; i++)
//     {
//         sendData(svArr[i],"哈哈哈哈");
//     }
// },1000);

function sendData(socket,data)
{
    console.log('send-> '+data);
    socket.sendText(data);
}

})();