const networkTrainer = require('../src/network-management/network-trainer');
const {MultiLayerPerceptron} = require('../src/network');

const data = [
  {input: [0,0], output: [1,0]}, // 0 xor 0 = 0
  {input: [1,0], output: [0,1]}, // 1 xor 0 = 1
  {input: [0,1], output: [0,1]}, // 0 xor 1 = 1
  {input: [1,1], output: [1,0]}  // 1 xor 1 = 0
];



const network = new MultiLayerPerceptron({layerSizes: [2,4,2], learningRate: 0.5});
networkTrainer.train(network, data, {epochesCount: 100000, successfullStreak: 100, errorTreshold:0.00000000005});


console.log('Final result');
console.log(`0 XOR 0 = ${1 - network.run([0,0])[0]}`);
console.log(`0 XOR 1 = ${network.run([0,1])[1]}`);
console.log(`1 XOR 0 = ${network.run([1,0])[1]}`);
console.log(`1 XOR 1 = ${1 - network.run([1,1])[0]}`);