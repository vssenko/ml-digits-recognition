const utils = require('./utils');

// Handy class representing neuron
// Can access both inputs and outputs
// Able to generate its value

class Neuron {
    constructor(index) {
        this.index = index;
        this.value = 0;
        this.inputBias = 0;
        this.inputWires = null;
        this.outputWires = null;
    }

    calculateValue(){
        if(!this.inputWires){
            throw new Error('Trying to calculate value with missing input weights.');
        }

        const inputSum = this.inputWires.reduce((sum, wire) => {
            return sum + wire.inputNeuron.value * wire.weight;
        }, 0);
        this.value = utils.sigmoid(inputSum + this.inputBias);
    }
}

module.exports = Neuron;