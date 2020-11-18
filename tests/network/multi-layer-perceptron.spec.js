const chai = require('chai');
const { expect } = chai;

const MultiLayerPerceptron = require('../../src/network/multi-layer-perceptron');

describe('MultiLayerPerceptron', () => {
  let perceptron;

  beforeEach(() => {
    // for visual and detailed calculations of this,
    // see https://mattmazur.com/2015/03/17/a-step-by-step-backpropagation-example
    // (man, thanks a lot, you are awesome)

    perceptron = new MultiLayerPerceptron({ layerSizes: [2,2,2], silent: false, learningRate: 0.5 });
    //setting the same weights and biases as in example
    perceptron.layers[0][0].outputWires[0].weight = 0.15;
    perceptron.layers[0][0].outputWires[1].weight = 0.25;

    perceptron.layers[0][1].outputWires[0].weight = 0.20;
    perceptron.layers[0][1].outputWires[1].weight = 0.30;

    perceptron.layers[1][0].bias = 0.35;
    perceptron.layers[1][1].bias = 0.35;

    perceptron.layers[1][0].outputWires[0].weight = 0.40;
    perceptron.layers[1][0].outputWires[1].weight = 0.50;

    perceptron.layers[1][1].outputWires[0].weight = 0.45;
    perceptron.layers[1][1].outputWires[1].weight = 0.55;

    perceptron.layers[2][0].bias = 0.6;
    perceptron.layers[2][1].bias = 0.6;
  });

  describe('Forward propagation', () => {
    it('should correctly calculate output by forward propagation', () => {
      const result = perceptron.run([0.05, 0.1]);

      expect(result).to.deep.equal([0.7513650695523157, 0.7729284653214625]);
    });
  });

  describe('Backward propagation', () => {
    it('should correctly execute backward propagation', () => {
      const output = [0.01, 0.99];
      perceptron.runAndBackpropagate([0.05, 0.1], output);

      //last layer input weights
      expect(perceptron.layers[1][0].outputWires[0].weight).to.eql(0.35891647971788465);
      expect(perceptron.layers[1][0].outputWires[1].weight).to.eql(0.5113012702387375);
      expect(perceptron.layers[1][1].outputWires[0].weight).to.eql(0.4086661860762334);
      expect(perceptron.layers[1][1].outputWires[1].weight).to.eql(0.5613701211079891);
      expect(perceptron.layers[2][0].bias).to.eql(0.5584504315114329);
      expect(perceptron.layers[2][1].bias).to.eql(0.6114294709549668);
      
      //first layer output weights
      expect(perceptron.layers[0][0].outputWires[0].weight).to.eql(0.1497807161327628);
      expect(perceptron.layers[0][0].outputWires[1].weight).to.eql(0.24975114363236958);
      expect(perceptron.layers[0][1].outputWires[0].weight).to.eql(0.19956143226552567);
      expect(perceptron.layers[0][1].outputWires[1].weight).to.eql(0.29950228726473915);

      expect(perceptron.layers[1][0].bias).to.eql(0.3484650129293398);
      expect(perceptron.layers[1][1].bias).to.eql(0.34825800542658697);
    });
  });
});