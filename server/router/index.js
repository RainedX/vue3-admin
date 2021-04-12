const Router = require("koa-router");
const router = new Router();

router.post("/user/login", async (ctx) => {
  ctx.response.status = 200;
  ctx.response.body = {
    "Content-Type": "application/json",
  };
  ctx.body = {
    code: 0,
    data: {
      token: "wwbs.rained",
    },
  };
});

router.post("/user/info", async (ctx) => {
  if (ctx.request.headers.cookie !== "Admin-Token=wwbs.rained") {
    ctx.response.status = 200;
    ctx.body = {
      code: 50008,
      message: "非法的token",
    };
    return;
  }
  ctx.response.status = 200;
  ctx.response.body = {
    "Content-Type": "application/json",
    "“charset": "utf-8",
  };
  ctx.body = {
    code: 0,
    data: {
      roles: ["admin"],
      name: "Rain",
      avator: "",
      introduction: "爱学习",
    },
  };
});

module.exports = router;
