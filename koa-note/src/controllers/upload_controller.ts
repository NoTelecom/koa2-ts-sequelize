// import * as fs from 'fs';
// import * as path from 'path';
// import * as crypto from 'crypto';
// import { fileModel } from '../db';
// import { getFileListById } from './file_operate_controller';
// /* eslint no-param-reassign: ["error", { "props": false }]*/
// export const uploadFile = async (ctx, next) => {
//   // 上传单个文件
//   const { header } = ctx.request;
//   const uId = 2;
//   const req = ctx.request.body;
//   const file = ctx.request.files.pbfiles; // 获取上传文件
//   // console.log(file);
//   // 创建可读流
//   const reader = fs.createReadStream(file.path);
//   // todo: 需要根据项目/uid去区分文件夹，不然可能回重复，存储未知也需要考虑
//   const filePath = path.resolve(`src/public/upload/${file.name}`);
//   // 生成hash
//   const fsHash = crypto.createHash('md5');
//   const buffer = fs.readFileSync(file.path);
//   fsHash.update(buffer);
//   const fileHash = fsHash.digest('hex');
//   console.log('文件的MD5是：%s', fileHash);
//   // hash未重复时才添加
//   await fileModel.findOrCreate({
//     where: {
//       fileHash,
//     },
//     defaults: {
//       proId: req.projectId, fileName: file.name, fileType: 'PB_LIST', fileContent: filePath,
//       fileCreateTime: new Date(), fileCreator: '未知，可能需要通过pb文件其他已有请求获取',
//       fileInfo: '未知，可能需要通过pb文件其他已有请求获取',
//       fileHash,
//     },
//   })
//     .spread((files, created) => {
//       console.log('文件recur是：');
//       console.log(created);
//       if (created) { // true为添加成功
//       // 创建可写流
//         const upStream = fs.createWriteStream(filePath);
//         // 可读流通过管道写入可写流
//         reader.pipe(upStream);
//         /* 同步读取文件，会产生阻塞 */
//         return ctx.body = { code: 200, msg: '上传成功！' };
//       } // false已经存在
//       return ctx.body = { code: 403, msg: '文件重复' };
//     });
// };
