mysqladmin -u root -p create RUNOOB
	创建数据库 create database <数据库名>;
	删除数据库 drop database <数据库名>;
选择数据库：
	mysql -u root -p
	use <数据库名>;
mysql条件下命令行输入执行sql脚本
	mysql -u root -p
	在命令行下(已连接数据库,此时的提示符为 mysql> ),
	输入 source F:\hello world\niuzi.sql (注意路径不用加引号的) 或者 \. F:\hello world\niuzi.sql (注意路径不用加引号的) 回车即可