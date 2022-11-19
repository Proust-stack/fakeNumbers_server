const { faker } = require("@faker-js/faker");

module.exports = function createRandomUser() {
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
};
