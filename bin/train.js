const {MultiLayerPerceptron} = require('../src/network');
const trainer = require('../src/network-trainer');
const mnistProvider = require('../src/mnist/train-data-provider');
const serializer = require('../src/network-serializer');

const mnistData = mnistProvider.getTrainData();

const perceptron = new MultiLayerPerceptron({ layerSizes: [784, 16, 10] });

trainer.train(perceptron, mnistData);


console.log('Serializing network for future usage...');
serializer.serialize(perceptron);
