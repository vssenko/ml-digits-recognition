const chai = require('chai');
const { expect } = chai;

const sigmoid = require('../../src/network/activators/sigmoid');

const Neuron = require('../../src/network/neuron');

describe('Neuron', () => {
  describe('calculateValue()', () => {
    it('should calculate neuron value based on bias, input wires, their values and weights', () => {
      const neuron = new Neuron({activator: sigmoid});
      neuron.inputBias = 3;

      neuron.inputWires = [
        {inputNeuron: {value: 5}, weight: 2 },
        {inputNeuron: {value: -3}, weight: 4},
        {inputNeuron: {value: 2}, weight: 1},
      ];

      const expectedResult = sigmoid.func(5*2 + (-3)*4 + 2*1 + 3);

      neuron.calculateValue();

      expect(neuron.value).to.eql(expectedResult);
    });
  });

  describe('calculateErrorAndDelta()', () => {
    it('should correctly calculate error and delta with explicit expected value', () => {
      const neuron = new Neuron({activator: sigmoid});
      neuron.value = 0.9;
      neuron.calculateErrorAndDelta(0.1);
      expect(neuron.error).to.eql(-0.8);
    });

    it('should correctly calculate error and delta based on next layer delta');
  });
});