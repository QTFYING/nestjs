# 手册

## 豆包MarsCode

[MarsCode的MySql的部署文档](https://docs.marscode.cn/docs/dependency-management)

一些mysql的常见操作命令

```shell
mysql -u root -p -h 127.0.0.1 // 执行命令后会让输入密码
lsof -i :3306 // 查看3306端口是否已经启用
kill 1234  或者 kill -9 1234 // 1234 为PID
ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password'; // 修改数据库密码
```
