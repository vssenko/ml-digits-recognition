const _ = require('lodash');


const generateRandomWeight = () => {
  const w = 2 * (Math.random() - 0.5);
  const limitValue = Math.abs(w) / 10;
  if (w > -limitValue && w < limitValue){
    return generateRandomWeight();
  }
  return w;
};

const generateBias = () => Math.abs(generateRandomWeight());

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
  generateBias,
  generateRandomWeight,
  generateRandomWeightsArray,
  resultArrayToLabel
};