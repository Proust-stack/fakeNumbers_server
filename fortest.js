const { faker } = require("@faker-js/faker");

const typo = { swap: "", add: "", delete: "" };
const rndKey = faker.helpers.objectKey(typo);
console.log(rndKey);

const arr = faker.helpers.arrayElements("asdfg".split(), 4);
console.log(arr);
console.log("asdfg".split("").join(""));

const getPositionofError = () => {
  faker.rand(1000, 500);
};
console.log(faker.rand(1000, 500));

//mthods

const addElement = (field) => (filed = field + faker.random.alpha());
const deleteElement = (field) => filed.slice(1);
const swapElements = (field) => filed.slice(1);

////////////////////////////////////////////////////////

faker.helpers.maybe(() => "Hello World!", { probability: 0.5 }); // !!!!
