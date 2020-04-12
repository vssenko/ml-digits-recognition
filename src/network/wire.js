const utils = require('./utils');

class Wire {
    constructor(inputNeuron, outputNeuron){
        this.inputNeuron = inputNeuron;
        this.outputNeuron = outputNeuron;
        this.weight = utils.generateRandomWeight();
    }
}

module.exports = Wire;