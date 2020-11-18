const chai = require('chai');
const { expect } = chai;

const sigmoid = require('../../src/network/activators/sigmoid');

const Neuron = require('../../src/network/neuron');

describe('Neuron', () => {
  describe('feedForward()', () => {
    it('should calculate neuron value based on bias, input wires, their values and weights', () => {
      const neuron = new Neuron({activator: sigmoid, learningRate: 0.3, silent: false});
      neuron.bias = 3;

      neuron.inputWires = [
        {inputNeuron: {output: 5}, weight: 2 },
        {inputNeuron: {output: -3}, weight: 4},
        {inputNeuron: {output: 2}, weight: 1},
      ];

      const expectedResult = sigmoid.func(5*2 + (-3)*4 + 2*1 + 3);

      neuron.feedForward();

      expect(neuron.output).to.eql(expectedResult);
    });
  });

  describe('backpropagateForOutputLayer()', () => {
    it('should adjust wires and biases for output neuron', () => {
      const neuron = new Neuron({activator: sigmoid});
      neuron.output = 0.9;
      neuron.inputWires = [
        { weight: 1, inputNeuron: {output: 10} },
        { weight: 0.4, inputNeuron: {output: 8} }
      ];
      neuron.bias = 0.3;
      neuron.backpropagateForOutputLayer(0.1);
      expect(neuron.bias).to.eql(0.318);
      expect(neuron.inputWires[0].weight).to.eql(1.6);
      expect(neuron.inputWires[1].weight).to.eql(0.88);
    });
  });

  describe('backpropagateForHiddenLayer()', () => {
    it('should adjust wires and biases for hidden neuron');
  });
});