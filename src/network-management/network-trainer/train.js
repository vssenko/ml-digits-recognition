const config = require('../../../config');
const squaredErrorCostCostFunction = require('../../network/mathFunctions/squaredErrorCost');


function train(network, trainData, {epochesCount, successfullStreak, errorTreshold, silent = true} = {}) {
  // For better speed it, it's better to train network not on every data sample, but on chunks
  // But for simplicity i'll keep it in "brute force" way

  errorTreshold = errorTreshold || config.training.defaultErrorTreshold;
  successfullStreak = successfullStreak || config.training.successfullStreak;
  epochesCount = epochesCount || config.training.defaultEpochcesCount;


  console.log('Training network...');
  console.log(`Satisfying cost threshold is ${errorTreshold}, successfull streak: ${successfullStreak}`);

  
  let costsSum;
  let currentSuccessStreak = 0;
  let currentCost = 10;
  let stopTraining = false;

  for (let epoch = 1; epoch <= epochesCount; epoch++){
    costsSum = 0;
    if (stopTraining){
      break;
    }

    for (let i = 0; i < trainData.length; i++){
      const sample = trainData[i];
      if (!silent && i > 0 && !(i % 10000)) {
        console.log(`Epoch ${epoch}. Processing data sample #${i} (Digit ${sample.label}). Current median cost : ${costsSum / i}`);
      }
      const data = sample.input;
      const expected = sample.output;
      const result = network.run(data);

      currentCost = squaredErrorCostCostFunction(result, expected);
      costsSum +=currentCost;
      if (currentCost <= errorTreshold){
        currentSuccessStreak++;
      } else {
        network.backpropagateError(expected);
        currentSuccessStreak = 0;
      }
      if (currentSuccessStreak >= successfullStreak){
        console.log(`Cost is satisfying (${currentCost}), stop training at Epoch ${epoch}, iteration ${i}.`);
        stopTraining = true;
        break;
      }
    }
  }

  if (!stopTraining){
    console.log('Warning: training was not successfull');
  }
}

module.exports = train;