const Router = require("koa-router");
const router = new Router();

router.post("/user/login", async (ctx) => {
  ctx.response.status = 200;
  ctx.response.body = {
    "Content-Type": "application/json",
  };
  if (ctx.request.body.username === 'admin') {
    ctx.body = {
      code: 0,
      data: {
        token: "admin",
      },
    };
  } else if (ctx.request.body.username === 'user') {
    ctx.body = {
      code: 0,
      data: {
        token: "user",
      },
    };
  } else {
    ctx.body = {
      code: -1,
      message: '用户名或密码错误'
    }
  }
  
});

router.post("/user/info", async (ctx) => {
  ctx.response.status = 200;
  if (!['admin', 'user'].includes(ctx.request.body.token)) {
    ctx.body = {
      code: 50008,
      message: "非法的token",
    };
    return;
  }
  ctx.response.body = {
    "Content-Type": "application/json",
    "“charset": "utf-8",
  };
  if (ctx.request.body.token === 'admin') {
    ctx.body = {
      code: 0,
      data: {
        roles: ["admin"],
        name: "Rain",
        avator: "",
        introduction: "爱学习",
      },
    };
  } else {
    ctx.body = {
      code: 0,
      data: {
        roles: ["user"],
        name: "HJ",
        avator: "",
        introduction: "不爱学习",
      },
    };
  }
  
});

module.exports = router;
