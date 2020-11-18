const utils = require('./utils');

// Class representing "connection" between one neuron from alayer and one neuron from the next layer
// Contains weight of connection, inputNeuron and outputNeuron refs

class Wire {
  constructor(inputNeuron, outputNeuron){
    this.inputNeuron = inputNeuron;
    this.outputNeuron = outputNeuron;
    this._weight = utils.generateRandomWeight();
    this._bakedWeight = this.weight;
  }

  set weight(v){
    this._bakedWeight = this._weight;
    this._weight = v;
  }

  get weight(){
    return this._weight;
  }

  // This "baked" weight is important
  // Because all the math in current "cycle" of training calculated based on initial weights!
  // I spent a lot of time finding this bug.
  get bakedWeight(){
    return this._bakedWeight;
  }
}

module.exports = Wire;