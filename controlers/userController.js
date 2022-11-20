const { faker } = require("@faker-js/faker");

const createRandomUser = require("../utils/fakeGenerator");
const ApiError = require("../error/ApiError");

module.exports = function UserController(req, res) {
  const locale = req.query.locale;
  const seed = req.query.seed;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  faker.setLocale(locale);
  faker.seed(+seed + +page);
  const users = [];
  Array.from({ length: 100 }).forEach(() => {
    users.push(createRandomUser());
  });

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  if (endIndex < users.length) {
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
  results.users = users.slice(startIndex, endIndex);

  // if (!locale || !seed) {
  //   return next(
  //     ApiError.badRequest("Incorrect data, fullfill all fields above, please")
  //   );
  // }

  // const users = modelCreation(locale, seed);
  // const data = paginatedResults(users, page, limit);
  // console.log(result);
  return res.status(200).json(results);
};

function modelCreation(locale, seed) {
  faker.setLocale(locale);
  faker.seed(+seed + +page);
  const users = [];
  Array.from({ length: 100 }).forEach(() => {
    users.push(createRandomUser());
  });

  return users;
}

function paginatedResults(model, page, limit) {
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
  results.users = model.slice(startIndex, endIndex);
  return results;
}
