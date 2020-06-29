import * as Koa from 'koa';
import * as Router from 'koa-router';


import * as logger from 'koa-logger';
import * as json from 'koa-json';



import lrs from './cases/longrunningreq';
import objcheck from './utils/objectchecker';

const app = new Koa();
const router = new Router();


router.get('/', async (ctx, next) =>{
    ctx.body = {msg : 'hello world'};
    await next();
});

router.get('/cases/longrun', async (ctx, next) =>{
    const waittime = ctx.query.wait;
    lrs(objcheck.isNilOrUndefined(waittime) ? 2000 : waittime);
    ctx.body = {msg : `i waited for you for ${waittime}`};
    await next();
});


app.use(json());

app.use(logger());

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () =>{
    console.log("koa started");
});



