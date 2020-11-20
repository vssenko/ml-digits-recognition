const {MultiLayerPerceptron} = require('../src/network');
const trainer = require('../src/network-management/network-trainer');
const mnistProvider = require('../src/mnist/train-data-provider');

const mnistTrainData = mnistProvider.getTrainData();

const network = new MultiLayerPerceptron({
  layerSizes: [784, 512, 256, 128, 10],
  learningRate: 0.01
});

trainer.train(
  network,
  mnistTrainData,
  { silent: false, epochesCount: 50, successfullStreak: 10, errorTreshold: 0.005, serializeAfterEpoch: true });

const mnistTestData = mnistProvider.getTestData();

trainer.test(network, mnistTestData);

console.log('Example run on first 10 mnist test images: ');

for (let i =0; i < 10; i++){
  const sample = mnistTestData[i];
  const result = network.run(sample.input);

  console.log(`${sample.label}:${result}`);
}