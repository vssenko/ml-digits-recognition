const chai = require('chai');
const { expect } = chai;

const testHelpers = require('../_misc/helpers');

describe('MultiLayerPerceptron', () => {
  let perceptron;

  beforeEach(() => {
    perceptron = testHelpers.getExampleNetwork();
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
      expect(perceptron.layers[2][0].bias).to.eql(0.5307507191857215);
      expect(perceptron.layers[2][1].bias).to.eql(0.6190491182582781);
      
      //first layer output weights
      expect(perceptron.layers[0][0].outputWires[0].weight).to.eql(0.1497807161327628);
      expect(perceptron.layers[0][0].outputWires[1].weight).to.eql(0.24975114363236958);
      expect(perceptron.layers[0][1].outputWires[0].weight).to.eql(0.19956143226552567);
      expect(perceptron.layers[0][1].outputWires[1].weight).to.eql(0.29950228726473915);

      expect(perceptron.layers[1][0].bias).to.eql(0.3456143226552565);
      expect(perceptron.layers[1][1].bias).to.eql(0.3450228726473914);
    });
  });
});