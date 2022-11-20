const Router = require("express");
const router = new Router();
const userController = require("../controlers/userController");

router.get("/users", userController);

module.exports = router;
