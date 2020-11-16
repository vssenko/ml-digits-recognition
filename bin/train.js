const MultiLayerPerceptron = require('../src/network/multi-layer-perceptron');
const trainer = require('../src/network-trainer');
const serializer = require('../src/network-serializer');

const perceptron = new MultiLayerPerceptron({ layerSizes: [784, 16, 10] });

trainer.train(perceptron);


console.log('Serializing network for future usage...');
serializer.serialize(perceptron);
