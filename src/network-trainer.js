const trainDataProvider = require('./train-data-provider');
const networkSerializer = require('./network-serializer');
const utils = require('./network/utils');

const errorTreshold = 0.005;

function train(network) {
  console.log('Preparing for training...');
  const trainData = trainDataProvider.getTrainData();

  // For better speed it, it's better to train network not on every data sample, but on chunks
  // But for simplicity i'll keep it in "brute force" way
  console.log('Training network...');
  console.log(`Satisfying cost threshold is ${errorTreshold}`);

  let currentCost = 10;

  for (let epoch = 0; epoch < 5; epoch++){
    if (currentCost <= errorTreshold){
      break;
    }

    for (let i = 0; i < trainData.length; i++){
      const sample = trainData[i];
      if (!(i % 10000)) {
        console.log(`Epoch ${epoch}. Processing data sample #${i}. Current cost : ${currentCost}`);
      }
      const data = sample.imageBytes;
      const expected = sample.labelArrayRepresentation;
      const result = network.trainWithData(data, expected);
      currentCost = utils.costFunction(result, expected);
      if (currentCost <= errorTreshold){
        console.log(`Cost is satisfying (${currentCost}), stop training.`);
        break;
      }
    }
    epoch++;
  }


  console.log('Serializing network for future usage...');
  networkSerializer.serialize(network);
}

function test() {
}

module.exports = {
  train,
  test
};