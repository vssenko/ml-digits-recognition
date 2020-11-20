const relu = require('../mathFunctions/relu');

const dRelu = require('../mathFunctions/dRelu');

module.exports = {
  name: 'relu',
  func: relu,
  dFunc: dRelu
};