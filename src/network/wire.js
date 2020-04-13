const utils = require('./utils');

// Handly class representing "connection" between one neuron from input layer and one neuron from next layer
// Contains weight of connection

class Wire {
    constructor(inputNeuron, outputNeuron){
        this.inputNeuron = inputNeuron;
        this.outputNeuron = outputNeuron;
        this.weight = utils.generateRandomWeight();
    }
}

module.exports = Wire;