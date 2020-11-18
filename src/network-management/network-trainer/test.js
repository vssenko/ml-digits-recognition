const _ = require('lodash');
const config = require('../../../config');

const squaredErrorCostCostFunction = require('../../network/mathFunctions/squaredErrorCost');


function test(network, testData, {errorTreshold} = {}) {
  errorTreshold = errorTreshold || config.training.defaultErrorTreshold;

  console.log(`Starting testing network, error treshhold is {${errorTreshold}}`);

  let totalProceed = 0;
  let invalidAnswerCount = 0;
  for (let sample of testData){
    const data = sample.input;
    const expected = sample.output;
    const resultArray = network.runAndBackpropagate(data, expected);

    const error = squaredErrorCostCostFunction(resultArray, expected);
    if (error > errorTreshold){
      invalidAnswerCount++;
    }
    totalProceed++;
  }

  console.log('Final test results:');
  console.log(`Total proceed: ${totalProceed}`);
  console.log(`Invalid answers: ${invalidAnswerCount}`);
  console.log(`Percent of invalid answers: ${invalidAnswerCount / totalProceed * 100}`);
}

module.exports = test;