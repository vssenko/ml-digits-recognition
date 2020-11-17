const utils = require('./utils');

// Class representing "connection" between one neuron from alayer and one neuron from the next layer
// Contains weight of connection, inputNeuron and outputNeuron refs

class Wire {
  constructor(inputNeuron, outputNeuron){
    this.inputNeuron = inputNeuron;
    this.outputNeuron = outputNeuron;
    this.weight = utils.generateRandomWeight();
  }
}

module.exports = Wire;