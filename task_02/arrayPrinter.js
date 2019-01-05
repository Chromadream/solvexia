const sleep = s => {
  const ms = s * 1000;
  return new Promise(resolve => setTimeout(resolve, ms));
};

const printer = async input => {
  for (let i = 0; i < input.length; i++) {
    console.log(input[i]);
    await sleep(2);
  }
};

const data = ["aaaaa", "bbbb", "cccc", "dddd"];
printer(data);
