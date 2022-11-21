const { faker } = require("@faker-js/faker");

module.exports = function UserController(req, res) {
  const locale = req.query.locale;
  const seed = parseInt(req.query.seed);
  const error = parseFloat(req.query.error);
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  faker.setLocale(locale);
  faker.seed(seed + page);
  const users = [];

  Array.from({ length: 200 }).forEach(() => {
    const user = createRandomUser();
    faker.helpers.maybe(() => makeErrors(error, user), { probability: error });
    users.push(user);
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

function createRandomUser() {
  return {
    userId: faker.datatype.uuid(),
    name: faker.name.fullName(),
    address:
      faker.address.zipCode() +
      " " +
      faker.address.city() +
      ", " +
      faker.address.streetAddress(true),
    phone: faker.phone.number(),
  };
}

function makeErrors(error, user) {
  for (let i = 0; i < error; i++) {
    const keyFieldError = faker.helpers.objectKey(user);
    const filedOfError = user[keyFieldError];
    let arrayFromField = filedOfError.split("");
    const typeError = faker.helpers.arrayElement(["swap", "add", "delete"]);
    const letterOfError = faker.helpers.arrayElement(arrayFromField);
    const pos = arrayFromField.indexOf(letterOfError);
    switch (typeError) {
      case "swap":
        arrayFromField = [
          ...arrayFromField.slice(0, pos),
          arrayFromField[pos + 1],
          arrayFromField[pos],
          ...arrayFromField.slice([pos + 2]),
        ];
        break;
      case "add":
        const randomLetter = faker.random.alpha();
        arrayFromField.splice(pos, 0, randomLetter);
        break;
      case "delete":
        arrayFromField.splice(pos, 1);
        break;
      default:
        break;
    }
    const changedFeld = arrayFromField.join("");
    user[keyFieldError] = changedFeld;
  }
}
