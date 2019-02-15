var mysql = require('C:\\Users\\DKM20150316\\node_modules\\mysql');
var connection = mysql.createConnection(
{
    host:'localhost',
    user:'root',
    password:'123456',
    database:'chatdatabase',
});
connection.connect();
console.log("connected-------------");
var SqlData = {};
// var table = "login_tb";
SqlData.getAllData = function(table,callback)
{
	var sql = 'select * from '+table;
    console.log(sql);
	connection.query(sql,function(err,results)
	{
		if(err) throw err;
		callback(results);
	});
}
//查
SqlData.getDataByName = function(id,table,callback)
{
	var sql = "select * from "+table+" where id="+id;
    console.log(sql);
	connection.query(sql,function(err,results)
	{
		// if(err) throw err;
		callback(results);
	});
}
//增
SqlData.insertData = function(table,data,callback)
{
    var addsql = "";
    var addsqlParams = [];
	if(table == "login_tb")
    {
        addsql = "INSERT INTO "+table+" (id,name,psd) VALUES(0,?,?)";
	    addsqlParams = [data.data.name,data.data.psd];
    }
    else if(table == "chat_tb")
    {
        addsql = "INSERT INTO "+table+" (id,name,chatchannel,text) VALUES(0,?,?,?)";
	    addsqlParams = [data.data.name,data.data.channelType,data.data.text];
    }
	connection.query(addsql,addsqlParams,function(err,results)
	{
		if(err) throw err;
		callback(results);
	});
}
//改
SqlData.updateDataById = function(id,table,callback)
{
	var sql = 'UPDATE '+table+" SET name = ? where id="+id;
	var sqlParams = ['呵呵哒_'];
	connection.query(sql,sqlParams,function(err,results)
	{
		if(err) throw err;
		callback('update cuccess');
	});
}
//删
SqlData.deleteDataById = function(id,table,callback)
{
	var sql = 'DELETE from '+table+" where id="+id;
	connection.query(sql,function(err,results)
	{
		if(err) throw err;
		callback('delete cuccess');
	});
}

exports.route = SqlData;