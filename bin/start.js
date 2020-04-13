const MultiLayerPerceptron = require('../src/network/multi-layer-perceptron');
const trainer = require('../src/image-trainer');

const perceptron = new MultiLayerPerceptron({ layerSizes: [3, 5, 2]});

trainer.test(perceptron);