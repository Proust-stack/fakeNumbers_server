const Router = require("express");
const router = new Router();
const userRouter = require("./usersRouter");

router.use("/api", userRouter);

module.exports = router;
