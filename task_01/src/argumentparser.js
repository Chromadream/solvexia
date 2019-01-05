const url = require("url");

const getStartingURL = inputargs => {
  let startingURL;
  try {
    startingURL = new url.URL(inputargs[2]);
  } catch (TypeError) {
    console.error("First parameter is not a valid URL");
    process.exit(1);
  }
  return { start: startingURL.href, base: startingURL.origin };
};

const getCount = inputargs => {
  const URLCount = parseInt(inputargs[3], 10);
  if (Number.isNaN(URLCount)) {
    console.error("Second parameter is not a valid integer");
    process.exit(1);
  }
  return URLCount;
};

const parseArguments = inputargs => {
  const URLArguments = getStartingURL(inputargs);
  const count = getCount(inputargs);
  return { ...URLArguments, count };
};

module.exports = parseArguments;
