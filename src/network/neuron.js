const _ = require('lodash');
const utils = require('./utils');

const neuronPrinter = require('./printers/neuron-printer');

// Class representing a neuron
// Can access both input and output wires
// Able to generate its value and adjust his input weights

class Neuron {
  constructor({layerIndex, index, activator, silent } = {}) {
    this.layerIndex = layerIndex;
    this.index = index;
    this.silent = silent;
    this.activator = activator;
    this.value = 0;
    if (layerIndex != 0){
      this.inputBias = utils.generateRandomWeight();
    }
    this.inputWires = null;
    this.outputWires = null;

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
  
    this.value = this.activator.func(inputSum + this.inputBias);
    if (!this.silent){
      neuronPrinter.printCalculation(this);
    }
  }

  calculateErrorAndDelta(expectedValue){
    if (!_.isNil(expectedValue)) {
      this.error = expectedValue - this.value;
    } else {
      if (!this.outputWires){
        throw new Error('Calculating error and delta with no output wires.');
      }
      this.error = this.outputWires.reduce((err, wire) => err + wire.outputNeuron.delta * wire.weight, 0);
    }
    this.delta = this.activator.deriative(this.value) * this.error;
  }

  adjustOutputWiresWeights(learningRate = 0.3){
    this.outputWires.forEach(wire => {
      wire.weight += learningRate * wire.inputNeuron.value * wire.outputNeuron.delta;
    });

    this.inputBias += learningRate * this.delta;
  }
}

module.exports = Neuron;