const utils = require('./utils');

// Handy class representing neuron
// Can access both inputs and outputs
// Able to generate its value and adjust his input weights

class Neuron {
  constructor({layerIndex, index}) {
    // Just for debug / better understanding
    this.layerIndex = layerIndex;
    this.index = index;

    this.value = 0;
    this.inputBias = 0;
    this.inputWires = null;
    this.outputWires = null;

    //For training
    this.delta = 0;
    this.error = 0;
  }

  calculateValue(){
    if(!this.inputWires){
      throw new Error('Trying to calculate value with missing input wires.');
    }

    const inputSum = this.inputWires.reduce((sum, wire) => {
      return sum + wire.inputNeuron.value * wire.weight;
    }, 0);
    this.value = utils.sigmoid(inputSum + this.inputBias);
  }

  calculateErrorAndDelta(expectedValue){
    if (typeof expectedValue === 'number') {
      // Expected value may be only for output neurons
      this.error = expectedValue - this.value;
    } else {
      if (!this.outputWires){
        throw new Error('Calculating error and delta with no output wires.');
      }
      this.error = this.outputWires.reduce((err, wire) => err + wire.outputNeuron.delta * wire.weight, 0);
    }
    this.delta = this.value * (1 - this.value) * this.error;
  }

  adjustOutputWiresWeights(learningRate = 0.3){
    this.outputWires.forEach(wire => {
      wire.weight += learningRate * wire.inputNeuron.value * wire.outputNeuron.delta;
    });

    this.inputBias += learningRate * this.delta;
  }
}

module.exports = Neuron;