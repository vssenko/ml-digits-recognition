const _ = require('lodash');
const Neuron = require('./neuron');
const Wire = require('./wire');
const networkPrinter = require('./printers/network-printer');

const activatorsMap =  require('./activators');
const utils = require('./utils');

/**
 * Multi layer perceptron manual implementation.
 * Not optimized due to overhead with copying arrays and no-matrix calculations,
 * but demonstrates well how perceptron works.
 * 
 * Example input [3,5,2] (3- input layer size, 5 - hidden layer size, 2 - output layer size)
 * will produce neural network:
 *          O x O x O
 *      O x O x O x O X O
 *            O x O
 * 
 * Have fun and make research!
 * Remember, that you always have option for enabling step-by-step logs (silent: false)
 */
class MultiLayerPerceptron {
  constructor({
    layerSizes,
    learningRate = 0.3,
    minLearningRate,
    learningRateDecayStep, //after how many backpropagations learning rate will be decresed by 10%
    activator = 'sigmoid',
    silent = true,
    omitBias = false,
  }) {
    this.learningRate = learningRate;
    this.minLearningRate = minLearningRate || learningRate / 10;
    this.learningRateDecayStep = learningRateDecayStep;
    this.inputSize = layerSizes[0];
    this.layerSizes = layerSizes;
    this.silent = silent;
    this.activator = activatorsMap[activator];
    this.omitBias = omitBias;
    this._stallBackpropagateCount = 0;
    if (!activator){
      throw new Error('Unsupported activator');
    }

    this._initNeurons(layerSizes);
  }

  // The most complex part: create non-repeatable objects for each neuron, wire and add correct references to them. 
  _initNeurons(){
    this.layers = [];
    for(let layerIndex = 0; layerIndex < this.layerSizes.length; layerIndex++) {
      const isInputLayer = layerIndex === 0;
      const layerSize = this.layerSizes[layerIndex];
      const layerNeurons = [];
      const inputNeurons = isInputLayer ? null : this.layers[layerIndex -1];
      // Create layer with references to previous as inputs
      for(let neuronIndex = 0; neuronIndex < layerSize; neuronIndex++){
        const bias = isInputLayer ? 0 : this.omitBias ? 0 : utils.generateBias();
        const neuron = new Neuron({ layerIndex, index: neuronIndex, activator: this.activator, silent: this.silent, bias});
        if(inputNeurons){
          const wires = inputNeurons.map(inputNeuron => new Wire(inputNeuron, neuron));
          neuron.inputWires = wires;
        }
        layerNeurons.push(neuron);
      }
      this.layers.push(layerNeurons);
      // Adjust previous layer, add references to outputs
      // Save references, corresponding input wire and corresponding output wire should be the same object
      if (inputNeurons){
        inputNeurons.forEach(prevLayerNeuron => {
          prevLayerNeuron.outputWires = [];
          layerNeurons.forEach(layerNeuron => {
            const wire = layerNeuron.inputWires.find(w => w.inputNeuron === prevLayerNeuron);
            prevLayerNeuron.outputWires.push(wire);
          });
        });
      }
    }
  }

  runAndBackpropagate(inputData, expectedOutput) {
    const result = this.run(inputData);
    this.backpropagateError(expectedOutput);

    return result;
  }

  backpropagateError(expectedOutput){
    if (
      this.learningRateDecayStep &&
      this._stallBackpropagateCount > this.learningRateDecayStep &&
      this.learningRate > this.minLearningRate
    ){
      this.learningRate = Math.max(this.learningRate * 0.9, this.minLearningRate);
      this._stallBackpropagateCount = 0;
    }

    for(let layer of this.layers.slice(1).reverse()){
      const isOutput = layer === _.last(this.layers);

      layer.forEach(neuron => {
        this.logState();
        return isOutput
          ? neuron.backpropagateForOutputLayer({expectedOutput: expectedOutput[neuron.index], learningRate: this.learningRate})
          : neuron.backpropagateForHiddenLayer({learningRate: this.learningRate});
      }
      );
    }

    this._stallBackpropagateCount += 1;
  }

  run(inputData) {
    if (inputData.length !== this.inputSize){
      throw new Error('Invalid input size');
    }

    this.layers[0].forEach(neuron => neuron.output = inputData[neuron.index]);

    this.layers.slice(1).forEach((layer) => {
      this.logState();

      layer.forEach(neuron => neuron.feedForward());
    });

    return this.getNetworkOutput();
  }

  getNetworkOutput(){
    return _.last(this.layers).map(n => n.output);
  }

  logState(additionalInfo){
    if (!this.silent){
      networkPrinter.printState(this, additionalInfo);
    }
  }
}

module.exports = MultiLayerPerceptron;