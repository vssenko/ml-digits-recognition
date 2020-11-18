const _ = require('lodash');
const generateRandomWeight = () => Math.random();


const generateRandomWeightsArray = size => {
  const arr = new Array(size);
  for(let i = 0; i< size; i++){
    arr[i] = generateRandomWeight();
  }

  return arr;
};

const resultArrayToLabel = result => {
  const maxVal = _.max(result);
  return result.indexOf(maxVal);
};

module.exports = {
  generateRandomWeight,
  generateRandomWeightsArray,
  resultArrayToLabel
};