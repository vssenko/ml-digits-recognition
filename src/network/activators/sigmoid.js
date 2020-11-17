const func = x => 1 / (1 + Math.pow(Math.E, -x));

const deriative = val => val * (1 - val);


module.exports = {
  name: 'sigmoid',
  func,
  deriative
};