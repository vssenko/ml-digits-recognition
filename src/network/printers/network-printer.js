const _ = require('lodash');
const Table = require('cli-table');

function printNeuronsState(network){
  console.log('Neuron state:');
  const consoleTable = new Table({colors: false});
  network.layers.forEach((layer, layerIndex) => {
    const layerState = layer.map((n, nind) => `n(${nind}): out=${n.output}, b=${_.isNil(n.bias) ? 'N/A': n.bias}`);
    const key = `Layer ${layerIndex}`;
    consoleTable.push({
      [key]: layerState
    });
  });

  console.table(consoleTable.toString());
}

function printWiresState(network){
  console.log('Wires state:');
  const consoleTable = new Table({colors: false});
  network.layers.forEach((layer, layerIndex) => {
    if (layerIndex === network.layers.length - 1){
      return;
    }
    const wiresStates = [];
    layer.forEach((n) => n.outputWires.forEach(w => {
      wiresStates.push(`w(${n.index}-${w.outputNeuron.index})=${w.weight}`);
    }));
    const key = `Layer ${layerIndex}`;
    consoleTable.push({
      [key]: wiresStates
    });
  });

  console.table(consoleTable.toString());
}

function printState(network, {step} = {}){
  if (!_.isNil(step)){
    console.log('Executing step: ' + step);
  }
  printNeuronsState(network);
  printWiresState(network);
}

module.exports = {
  printState
};