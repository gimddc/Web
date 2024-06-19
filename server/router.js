//导入koa-router包
const Router = require('koa-router');
const { addData, getData, editData, delData } = require('./controller/data');
const { addTag, getTags, editTag, delTag } = require('./controller/tag');
const { setLang, getLang } = require('./controller/lang');

//实例化router对象
const router = new Router();

// 定义标签路由（编写路由规则）
//post方式请求/api/data，交给addData处理
router.post('/api/data', addData);
router.get('/api/data', getData);
router.put('/api/data', editData);
router.delete('/api/data', delData);

// 定义切换语言接口
router.post('/api/lang', setLang);
router.get('/api/lang', getLang);

// 定义标签路由
router.post('/api/tags', addTag);
router.get('/api/tags', getTags);
router.put('/api/tags', editTag);
router.delete('/api/tags', delTag);

module.exports = router;
