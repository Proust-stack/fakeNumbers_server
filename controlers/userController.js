const { faker } = require("@faker-js/faker");
const createRandomUser = require("../utils/fakeGenerator");
const ApiError = require("../error/ApiError");

module.exports = function UserController(req, res) {
  const locale = req.query.locale;
  const seed = parseInt(req.query.seed);
  const error = parseInt(req.query.error);

  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  faker.setLocale(locale);
  faker.seed(seed + page);
  const users = [];

  Array.from({ length: 100 }).forEach(() => {
    const user = createRandomUser();
    faker.helpers.maybe(makeErrors, { probability: error });
    users.push(user);

    function makeErrors(error, user) {
      for (let i = 0; i < error; i++) {
        const keyFieldError = faker.helpers.objectKey(user);
        const filedOfError = user[keyFieldError];
        const arrayFromField = filedOfError.split("");
        const typeError = faker.helpers.arrayElement(["swap", "add", "delete"]);
        const letterOfError = faker.helpers.arrayElement(arrayOfField);
        const pos = arrayFromField.indexOf(letterOfError);

        switch (typeError) {
          case "swap":
            arrayFromField = [
              ...arrayFromField.slice(0, pos),
              arrayFromField[pos + 1],
              arrayFromField[pos],
              ...arrayFromField.slice[pos + 2],
            ];
            break;
          case "add":
            const randomLetter = faker.random.alpha();
            arr.splice(pos, 0, randomLetter);
          case "delete":
            arr.splice(pos, 1);
            break;
          default:
            break;
        }
      }
      const changedFeld = arrayFromField.join("");
      user[keyFieldError] = changedFeld;
    }
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
  return res.status(200).json(results);
};
