const _ = require('lodash');
const generateRandomWeight = () => 2 * (Math.random() - 0.5);


const generateRandomWeightsArray = size => {
  const arr = new Array(size);
  for(let i = 0; i< size; i++){
    arr[i] = generateRandomWeight();
  }

  return arr;
};


const sigmoid = x => 1 / (1 + Math.pow(Math.E, -x));

const costFunction = (result, expected) => result.reduce((sum,val,ind) => sum + Math.pow(val - expected[ind], 2), 0) / 2;

const resultArrayToLabel = result => {
  const maxVal = _.max(result);
  return result.indexOf(maxVal);
};

module.exports = {
  generateRandomWeight,
  generateRandomWeightsArray,
  sigmoid,
  costFunction,
  resultArrayToLabel
};