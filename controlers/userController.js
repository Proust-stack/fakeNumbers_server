const ApiError = require("../error/ApiError");
const { faker } = require("@faker-js/faker");
const createRandomUser = require("../utils/fakeGenerator");

class UserController {
  getData(req, res, next) {
    const page = req.query.page || "1";
    const locale = req.query.locale;

    const seed = req.query.seed || "1";

    if (!locale || !seed) {
      return next(
        ApiError.badRequest("Incorrect data, fullfill all fields above, please")
      );
    }
    faker.setLocale(locale);
    faker.seed(+seed + +page);
    const users = [];
    Array.from({ length: 5 }).forEach(() => {
      users.push(createRandomUser());
      return users;
    });
    return res.status(200).json(users);
  }
}

module.exports = new UserController();
