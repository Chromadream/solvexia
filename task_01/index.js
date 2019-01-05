const process = require("process");
const argumentParser = require("./src/argumentparser");
const Loader = require("./src/loader");

const inputarg = process.argv;
if (inputarg.length < 4) {
  console.error("Not enough arguments provided.");
  process.exit(1);
}
const { start, base, count } = argumentParser(inputarg);
const loader = new Loader(start, base, count);
loader.go();
