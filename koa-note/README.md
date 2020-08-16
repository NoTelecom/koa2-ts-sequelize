
## 介绍
一个koa2+ts的初始化项目 使用sequelize作为orm

## 使用

目前路由还没有写入，会报错，可以注释检查

- yarn 或者 npm i
- yarn start 或 npm start
- 在浏览器中开打`localhost:3000`

### 创建model
全局安装mysql2
sequelize-automate
  
  ```bash
  
    sequelize-automate -c sequelize-automate.config.json
  ```

### 打包

- yarn build 或 npm run build

### 生产环境启动

- 生产环境使用 pm2 启动 可以达到负载均衡 执行：yarn pro 或 npm run pro （生产环境端口默认：8080）

### 生成model如果是ts的话，关联表如果报错，更改这里
```ts
const options = {
    tableName: '...',
    comment: '',
    indexes: [{
      name: '例子',
      unique: false,
      using: 'BTREE',
      fields: ['例子'],
    }],
  };
```
就是using那一行 把原来的type： 改成using：即可

### 逻辑

在routes里写入每个路由，并分发
在app.ts里把这些路由注册
在controllers里写入每个action的行为逻辑
models需要通过sequelize-automate自动生成
public里放一些公共的东西，目前把下载的文件放在里边
db文件放置数据库配置

