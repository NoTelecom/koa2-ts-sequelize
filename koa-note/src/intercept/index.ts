const interceptor = async (ctx, next) => {
  console.log('请求拦截');

  await next();
};

module.exports = interceptor;
