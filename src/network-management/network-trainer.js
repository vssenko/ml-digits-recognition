const config = require('../config');
const trainDataProvider = require('./train-data-provider');
const utils = require('./network/utils');
const squaredErrorCostCostFunction = require('./network/mathFunctions/squaredErrorCost');

const errorTreshold = 0.05;

function train(network) {
  console.log('Preparing for training...');
  const trainData = trainDataProvider.getTrainData();

  // For better speed it, it's better to train network not on every data sample, but on chunks
  // But for simplicity i'll keep it in "brute force" way
  console.log('Training network...');
  console.log(`Satisfying cost threshold is ${errorTreshold}`);

  let currentCost = 10;
  let errorIsSatisfying = false;

  for (let epoch = 1; epoch <= config.training.epochesCount; epoch++){
    if (errorIsSatisfying){
      console.log('Breakinig the testing cycle');
      break;
    }
    for (let i = 0; i < trainData.length; i++){
      const sample = trainData[i];
      if (!(i % 10000)) {
        console.log(`Epoch ${epoch}. Processing data sample #${i}. Current cost : ${currentCost}`);
      }
      const data = sample.imageBytes;
      const expected = sample.labelArrayRepresentation;
      const result = network.runAndBackpropagate(data, expected);
      currentCost = squaredErrorCostCostFunction(result, expected);
      if (currentCost <= errorTreshold){
        console.log(`Cost is satisfying (${currentCost}), stop training.`);
        errorIsSatisfying = true;
        break;
      }
    }
  }
}

function test(network) {
  console.log('Preparing for testing...');
  const testData = trainDataProvider.getTestData();

  console.log('Starting testing network...');
  let totalProceed = 0;
  let invalidAnswerCount = 0;
  for (let sample of testData){
    const data = sample.imageBytes;
    const expected = sample.labelArrayRepresentation;
    const resultArray = network.runAndBackpropagate(data, expected);
    const resultLabel = utils.resultArrayToLabel(resultArray);

    if (resultLabel != sample.label){
      invalidAnswerCount++;
    }
    totalProceed++;
  }

  console.log('Final test results:');
  console.log(`Total proceed: ${totalProceed}`);
  console.log(`Invalid answers: ${invalidAnswerCount}`);
  console.log(`Percent of invalid answers: ${invalidAnswerCount / totalProceed * 100}`);
}

function trainAndTest(network){
  train(network);
  test(network);
}

module.exports = {
  train,
  test,
  trainAndTest
};