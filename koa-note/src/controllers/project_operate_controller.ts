// import { Op } from 'sequelize';
// import { projectModel } from '../db';
// /* eslint no-param-reassign: ["error", { "props": false }]*/
// // 关联 模糊
// export const searchList = async (ctx, next: any) => {
//   const data = await projectModel.findAll();
//   const req = ctx.request.body;
//   ctx.body = { retcode: 0, result: { msg: data } };
// };
// /* 搜索项目——涉及到对项目和文件分别的模糊查询 */
// export const searchProject = async (ctx, next) => {
//   const req = ctx.request.query;
//   const uId = 2;
//   const proList = await relationModel.findAll({
//     where: { uId },
//     attributes: ['proId'],
//     raw: true,
//   });
//   console.log(proList);
//   let list: any;
//     list = await projectModel.findAll({
//       include: [
//         {
//           /* 关联写到外面就会默认两个主键进行等值连接 */
//           association: projectModel.hasMany(relationModel, {
//             foreignKey: 'proId',
//             sourceKey: 'proId',
//             /* 指定别名的时候一定要把单数和复数形式都指定了要不然就会报错了 */
//             as: {
//               singular: 'relation',
//               plural: 'relations',
//             },
//           }),
//           where: { uId },
//           attributes: [],
//         },
//       ],
//       // attributes: [ "proId", "proName", "creator" ],
//       where: {
//         // 模糊查询
//         proName: {
//           [Op.like]: `%${req.search_info}%`,
//         },
//       },
//       /* attributes起别名的方法————前面是数据库字段原名，后边是别名 */
//       attributes: [['proName', 'name'], ['proId', 'project_id']],
//     });
//   ctx.body = { retcode: 0, result: { list, type: req.search_type } };
// };



// // // 查询 分页
// // export const dispalyList = async (uId, proId, fileType) => await fileModel.findAndCountAll({
// //   include: [{
// //     /* 关联写到外面就会默认两个主键进行等值连接 */
// //     association: fileModel.hasMany(relationModel, {
// //       foreignKey: 'proId',
// //       sourceKey: 'proId',
// //       /* 指定别名的时候一定要把单数和复数形式都指定了要不然就会报错了 */
// //       as: {
// //         singular: 'relation',
// //         plural: 'relations',
// //       },
// //     }),
// //     where: { uId },
// //     attributes: [],
// //   }],
// //   where: {
// //     proId,
// //     fileType,
// //   },
// //   raw: true,
// //   limit: 12,
// //   offset: 0 * 12, // 第x页*每页个数, // 之后根据前端
// // });