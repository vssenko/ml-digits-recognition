const {MultiLayerPerceptron} = require('../src/network');
const serializer = require('../src/network-management/network-serializer');
const trainer = require('../src/network-management/network-trainer');
const mnistProvider = require('../src/mnist/train-data-provider');

const mnistTrainData = mnistProvider.getTrainData();

function simplifyInputArray(arr){
  for (let i = 0; i < arr.length; i++){
    if (arr[i] < 50){
      arr[i] = 0;
    } else {
      arr[i] = 1;
    }
  }

  return arr;
}

mnistTrainData.forEach(s => {
  s.input = simplifyInputArray(s.input);
});


const network = new MultiLayerPerceptron({ layerSizes: [784, 128, 32, 10], learningRate: 0.3 });

trainer.train(network, mnistTrainData, {silent: false, epochesCount: 100, successfullStreak: 10, errorTreshold: 0.005});

const mnistTestData = mnistProvider.getTestData();

trainer.test(network, mnistTestData);

serializer.serialize(network);