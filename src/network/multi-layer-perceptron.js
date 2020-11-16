const _ = require('lodash');
const Neuron = require('./neuron');
const Wire = require('./wire');

/**
 * Multi layer perceptron manual implementation.
 * Not optimized due to overhead with copying arrays and no-matrix calculations,
 * but demonstrates well how perceptron works.
 * Example input [3,5,2] (3- input layer size, 5 - hidden layer size, 2 - output layer size)
 * will produce neural network:
 *   O x O x O
 * O x O x O x O X O
 *     O x O
 */
class MultiLayerPerceptron {
  constructor({ layerSizes, learningRate = 0.01 }) {
    this.learningRate = learningRate;
    this.inputSize = layerSizes[0];
    this.layerSizes = layerSizes;
    this._initNeurons(layerSizes);
  }

  _initNeurons(layerSizes){
    this.layers = [];
    for(let layerIndex = 0; layerIndex < layerSizes.length; layerIndex++) {
      const isInputLayer = layerIndex === 0;
      const layerSize = layerSizes[layerIndex];
      const layerNeurons = [];
      const inputNeurons = isInputLayer ? null : this.layers[layerIndex -1];
      // Create layer with references to previous as inputs
      for(let neuronIndex = 0; neuronIndex < layerSize; neuronIndex++){
        const neuron = new Neuron({ layerIndex, index: neuronIndex});
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

  trainWithData(inputData, expectedOutput) {
    const result = this.run(inputData);
    // Backpropagation: from last to first
    for(let layer of this.layers.slice().reverse()){
      const isOutput = layer === _.last(this.layers);

      layer.forEach(neuron => {
        if (isOutput) {
          neuron.calculateErrorAndDelta(expectedOutput[neuron.index]);
        } else {
          neuron.calculateErrorAndDelta();
          neuron.adjustOutputWiresWeights(this.learningRate);
        }
      });
    }

    return result;
  }

  run(inputData) {
    if (inputData.length !== this.inputSize){
      throw new Error('Invalid input size');
    }

    // Set input values to first layer neurons
    this.layers[0].forEach(neuron => neuron.value = inputData[neuron.index]);

    // Our smart neurons can process itself, they have all input info
    this.layers.slice(1).forEach(layer => {
      layer.forEach(neuron => neuron.calculateValue());
    });

    // Return copy of last ("output") layer values
    return this.layers[this.layers.length - 1].map(n => n.value);
  }
}

module.exports = MultiLayerPerceptron;