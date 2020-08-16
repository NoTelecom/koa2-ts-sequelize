import * as Koa from 'koa';
import * as cors from 'koa2-cors';
import * as path from 'path';
import * as json from 'koa-json';
import * as onError from 'koa-onerror';
import * as logger from 'koa-logger';
import * as koaBody from 'koa-body';
import { Sequelize } from 'sequelize';
import * as Router from 'koa-router';
import AppRoutes from './routes';

// const interceptor = require('./intercept/index');
const app = new Koa();
const router = new Router();
const port = process.env.PORT || 3004;

// 拦截http header
// app.use(interceptor);
app.use(cors({
  origin(ctx) {
    if (ctx.url === '/test') {
      return '*'; // 允许来自所有域名请求
    }
    return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  // allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

// // 测试是否与数据库成功建立连接
// export const sequelize = new Sequelize('management', 'root', '123456', {
//   host: 'localhost',
//   dialect: 'mysql',
//   dialectOptions: {
//     socketPath: '/tmp/mysql.sock', // 指定套接字文件路径
//   },
//   define: {
//     timestamps: false
// }
// })
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('数据库连测试接成功哈');
//   })
//   .catch(err => {
//     console.error('数据库测试连接失败', err);
//   });


// error handler
onError(app);
// 相当于注册每一个路由，在路由文件里规定路径和方法
AppRoutes.forEach(route => router[route.method](route.path, route.action));

// logger
// app.use(async (ctx, next) => {
//   const start = Number(new Date(),
//   await next();
//   const ms = Number(new Date()) - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

app.use(json());
app.use(logger());

// 上传需要配置的中间件 引入位置讲究，且与bodyparser冲突
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, 'public/upload/'), // 设置文件上传目录
    maxFileSize: 500 * 1024 * 1024,    // 设置上传文件大小最大限制，默认5M
  },
}));

app.use(router.routes());
app.use(router.allowedMethods());


app.listen(port);

console.log(`应用启动成功 端口:${port}`);

// error-handling
app.on('error', (err, ctx) => {
  // const response = {
  //   status: 500,
  //   message: '服务器错误',
  // };
  // Object.assign(ctx, response);
  // return ctx;

  console.error('server error', err, ctx);
});
