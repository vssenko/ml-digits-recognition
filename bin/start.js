const MultiLayerPerceptron = require('../src/network/multi-layer-perceptron');
const app = require('../src/image-training-app');

const perceptron = new MultiLayerPerceptron({ layerSizes: [3, 5, 2]});

app.test(perceptron);