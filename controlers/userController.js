const ApiError = require("../error/ApiError");
const { faker } = require("@faker-js/faker");
const createRandomUser = require("../utils/fakeGenerator");

class UserController {
  getData(req, res, next) {
    function modelCreation() {
      const locale = req.query.locale;
      const seed = req.query.seed;

      if (!locale || !seed) {
        return next(
          ApiError.badRequest(
            "Incorrect data, fullfill all fields above, please"
          )
        );
      }
      faker.setLocale(locale);
      faker.seed(+seed + +page);
      const users = [];
      Array.from({ length: 100 }).forEach(() => {
        users.push(createRandomUser());
      });
      return users;
    }
    const users = modelCreation();
    function paginatedResults(model) {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const locale = req.query.locale;
      const seed = req.query.seed;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const results = {};

      if (endIndex < model.length) {
        results.next = {
          page: page + 1,
          limit,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit,
        };
      }
      results.results = model.slice(startIndex, endIndex);
      return results;
    }
    const result = paginatedResults(users);
    return res.status(200).json(result);
  }
}

module.exports = new UserController();
