const axios = require("axios");

const arrayPrinter = input => {
  input.forEach((value, index, array) => {
    console.log(value);
  });
  console.log(`Found ${input.length} links.`);
};

const axiosWrapper = async link => {
  const data = axios
    .get(link)
    .then(response => response.data)
    .catch(/* throw away error, it's not in our interests now */);
  return data;
};

module.exports = { arrayPrinter, axiosWrapper };
