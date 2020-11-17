const MultiLayerPerceptron = require('../src/network/multi-layer-perceptron');

const data = [
  {input: [0,0], output: [0]},
  {input: [1,0], output: [1]},
  {input: [0,1], output: [1]},
  {input: [1,1], output: [0]}
];

const network = new MultiLayerPerceptron({layerSizes: [2,4,1], learningRate: 0.2});

const epochCount = 50000;

for (let epoch = 0; epoch < epochCount; epoch++){
  data.forEach(d => network.train(d.input, d.output));
}

console.log(`After ${epochCount} epochs...`);
console.log(`0 XOR 0 = ${network.run([0,0])[0]}`);
console.log(`0 XOR 1 = ${network.run([0,1])[0]}`);
console.log(`1 XOR 0 = ${network.run([1,0])[0]}`);
console.log(`1 XOR 1 = ${network.run([1,1])[0]}`);