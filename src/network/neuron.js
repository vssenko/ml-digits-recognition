const _ = require('lodash');
const utils = require('./utils');
const neuronPrinter = require('./printers/neuron-printer');

const dSquaredErrorCost = require('./mathFunctions/dSquaredErrorCost');


// Class representing a neuron
// Can access both input and output wires
// Able to generate its value and adjust his input weights
class Neuron {
  constructor({layerIndex, index, activator, silent, learningRate = 0.3 } = {}) {
    this.layerIndex = layerIndex;
    this.index = index;
    this.silent = silent;
    this.activator = activator;
    this.netInput = 0;
    this.output = 0;
    if (layerIndex != 0){
      this.bias = utils.generateRandomWeight();
    }
    this.inputWires = null;
    this.outputWires = null;

    this.learningRate = learningRate;
    this.delta = 0;
  }

  feedForward(){
    if(!this.inputWires){
      throw new Error('Trying to calculate value with missing input wires.');
    }

    const inputNeuronSum = _.sumBy(this.inputWires, wire => wire.inputNeuron.output * wire.weight);

    this.netInput = inputNeuronSum + this.bias;
    this.output = this.activator.func(this.netInput);

    if (!this.silent){
      neuronPrinter.printFeedForward(this);
    }
  }

  backPropagateError(expectedValue){
    if (!_.isNil(expectedValue)) {
      this.backpropagateForOutputLayer(expectedValue);
    } else {
      this.backpropagateForHiddenLayer();
    }
  }

  backpropagateForOutputLayer(expectedValue) {
    const dEtoOutput = dSquaredErrorCost(this.output, expectedValue);
    const dOutputToNetInput = this.activator.dFunc(this.netInput);
    
    const dEtoNetInput = dEtoOutput * dOutputToNetInput;

    this.delta = dEtoNetInput;

    this.adjustInputWeightsAndBias();
    if (!this.silent){
      neuronPrinter.printBackpropagation(this, {dEtoOutput, dOutputToNetInput, dEtoNetInput});
    }
  }

  backpropagateForHiddenLayer() {
    const dEtoOutput = _.sumBy(this.outputWires, wire => wire.outputNeuron.delta * wire.bakedWeight);
    const dOutputToNetInput = this.activator.dFunc(this.netInput);

    const dEtoNetInput = dEtoOutput * dOutputToNetInput;
    this.delta = dEtoNetInput;

    this.adjustInputWeightsAndBias();
    if (!this.silent){
      neuronPrinter.printBackpropagation(this, {dEtoOutput, dOutputToNetInput, dEtoNetInput});
    }
  }

  adjustInputWeightsAndBias(){
    this.inputWires.forEach(wire => {

      wire.weight = wire.weight - this.learningRate * this.delta * wire.inputNeuron.output;
    });
    this.bias = this.bias - this.learningRate * this.delta * this.bias;
  }
}

module.exports = Neuron;