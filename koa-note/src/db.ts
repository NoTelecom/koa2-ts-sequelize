// 编写db不用每次接口都连接一次数据库
import { Sequelize } from 'sequelize';
// // 将自动生成的models引入
// import projectModels from './models/...';
// import ...Models from './models/...';

const config = {
  dbName: 'xxx',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '123456',
};

const { dbName, host, port, user, password } = config;
const sequelize = new Sequelize(dbName, user, password, {
  host,
  port,
  dialect: 'mysql',
  define: {
    timestamps: false,
  },
  dialectOptions: {
    socketPath: '/tmp/mysql.sock', // 指定套接字文件路径
  },
  pool: {              // 连接池配置
    max: 5,        // 最大连接数
    min: 0,         // 最小连接数
    acquire: 3000,     // 请求超时时间
    idle: 10000,          // 断开连接后，连接实例在连接池保持的时间
  },
  logging: true, // 输出日志信息  true or false
});
// // 连接数据库使用模型
// export const projectModel: any = projectModels(sequelize);
// export const ...Models: any = ...Models(sequelize);

