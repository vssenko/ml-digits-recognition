const _ = require('lodash');
const chai = require('chai');
const { expect } = chai;

const MultiLayerPerceptron = require('../../src/network/multi-layer-perceptron');

describe('MultiLayerPerceptron', () => {
  let perceptron;

  beforeEach(() => {
    // for visual and detailed calculations of this,
    // see https://mattmazur.com/2015/03/17/a-step-by-step-backpropagation-example
    perceptron = new MultiLayerPerceptron({ layerSizes: [2,2,2] });
    //setting the same weights and biases as in example
    perceptron.layers[0][0].outputWires[0].weight = 0.15;
    perceptron.layers[0][0].outputWires[1].weight = 0.25;

    perceptron.layers[0][1].outputWires[0].weight = 0.20;
    perceptron.layers[0][1].outputWires[1].weight = 0.30;

    perceptron.layers[1][0].inputBias = 0.35;
    perceptron.layers[1][1].inputBias = 0.35;

    perceptron.layers[1][0].outputWires[0].weight = 0.40;
    perceptron.layers[1][0].outputWires[1].weight = 0.50;

    perceptron.layers[1][1].outputWires[0].weight = 0.45;
    perceptron.layers[1][1].outputWires[1].weight = 0.55;

    perceptron.layers[2][0].inputBias = 0.6;
    perceptron.layers[2][1].inputBias = 0.6;
  });

  describe('Forward propagation', () => {
    it('should correctly calculate output by forward propagation', () => {
      const result = perceptron.run([0.05, 0.1]);

      expect(result).to.deep.equal([0.7513650695523157, 0.7729284653214625]);
    });
  });

  describe('Backward propagation', () => {
    it('should correctly execute backward propagation', () => {
      const expectedOutput = [0.01, 0.99];
      perceptron.train([0.05, 0.1], expectedOutput);

      //check last errors
      expect(_.last(perceptron.layers));
    });
  });
});