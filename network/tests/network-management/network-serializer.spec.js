const chai = require('chai');
const { expect } = chai;

const testHelpers = require('../_misc/helpers');
const networkSerializer = require('../../src/network-management/network-serializer');

describe('networkSerializer', () => {
  let perceptron;

  beforeEach(() => {
    perceptron = testHelpers.getExampleNetwork();
  });

  it('should serialize network and deserealize the same', () => {
    const serialized = networkSerializer.serialize(perceptron);
    console.log(serialized);
    const deserealized = networkSerializer.deserialize(serialized);

    expect(deserealized.layerSizes).to.deep.eql(perceptron.layerSizes);
    //last layer input weights
    expect(deserealized.layers[1][0].outputWires[0].weight).to.eql(perceptron.layers[1][0].outputWires[0].weight);
    expect(deserealized.layers[1][0].outputWires[1].weight).to.eql(perceptron.layers[1][0].outputWires[1].weight);
    expect(deserealized.layers[1][1].outputWires[0].weight).to.eql(perceptron.layers[1][1].outputWires[0].weight);
    expect(deserealized.layers[1][1].outputWires[1].weight).to.eql(perceptron.layers[1][1].outputWires[1].weight);
    expect(deserealized.layers[2][0].bias).to.eql(perceptron.layers[2][0].bias);
    expect(deserealized.layers[2][1].bias).to.eql(perceptron.layers[2][1].bias);
      
    //first layer output weights
    expect(deserealized.layers[0][0].outputWires[0].weight).to.eql(perceptron.layers[0][0].outputWires[0].weight);
    expect(deserealized.layers[0][0].outputWires[1].weight).to.eql(perceptron.layers[0][0].outputWires[1].weight);
    expect(deserealized.layers[0][1].outputWires[0].weight).to.eql(perceptron.layers[0][1].outputWires[0].weight);
    expect(deserealized.layers[0][1].outputWires[1].weight).to.eql(perceptron.layers[0][1].outputWires[1].weight);
    expect(deserealized.layers[1][0].bias).to.eql(perceptron.layers[1][0].bias);
    expect(deserealized.layers[1][1].bias).to.eql(perceptron.layers[1][1].bias);
  });

});