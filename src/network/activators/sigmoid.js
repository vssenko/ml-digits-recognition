const sigmoid = require('../mathFunctions/sigmoid');

const dSigmoid = require('../mathFunctions/dSigmoid');

module.exports = {
  name: 'sigmoid',
  func: sigmoid,
  dFunc: dSigmoid
};