const MultiLayerPerceptron = require('../src/network/multi-layer-perceptron');
const trainer = require('../src/network-trainer');

const perceptron = new MultiLayerPerceptron({ layerSizes: [784, 16, 10], learningRate: 0.1});

trainer.train(perceptron);