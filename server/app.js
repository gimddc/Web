// 导入koa包，其导出是一个类
const Koa = require('koa');
const { koaBody } = require('koa-body');
const serve = require('koa-static');

// 加载导出的路由
const routes = require('./router');

// 实例化app对象
const app = new Koa();

// 全局异常处理
process.on('uncaughtException', (err, origin) => {
  console.log(`Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

// 静态资源目录，
app.use(serve('../client/build'));

// 注册koabody中间件，用于解析请求体的参数，将请求的参数挂载到ctx.request.body
app.use(koaBody());

/*
中间件：处理应用程序的请求和响应，提供各种服务和功能，以简化应用程序的开发和维护
在Web开发中，中间件通常用于Web服务器和框架中，用于处理HTTP请求和响应
中间件的工作原理通常是基于“洋葱模型”（Onion Model）
即中间件按顺序执行，每个中间件可以在执行前后对请求和响应进行处理
中间件通过调用next()函数来传递控制权给下一个中间件
编写中间件：函数，use传参函数
ctx：context http请求的上下文，Koa上下文对象，包含请求和响应的相关信息
统一接口错误处理
*/
app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.response.status === 404 && !ctx.response.body) {
      ctx.throw(404);
    }
  } catch (error) {
    const { url = '' } = ctx.request;
    const { status = 500, message } = error;
    if (url.startsWith('/api')) {
      ctx.status = typeof status === 'number' ? status : 500;
      // 返回
      ctx.body = {
        msg: message,
      };
    }
  }
});

/* 
加载数据路由
routes.routes()是router的一个方法（函数），返回一个中间件（函数）
这个中间件注册到app
*/
app.use(routes.routes());

//启动服务，监听3001端口
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
