const Koa = require("koa");
const bodyParser = require('koa-bodyparser')
const router = require("./router");

const app = new Koa();

app.use(bodyParser())
app.use(router.routes());

app.listen(3000, () => {
  console.log("server is running...");
});
