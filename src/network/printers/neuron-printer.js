function printCalculation(neuron){
  console.log(`Neuron(${neuron.layerIndex},${neuron.index}): calculating value:`);
  console.log(`Input sum calc: ${neuron.inputWires.map(w => `${w.inputNeuron.value}*${w.weight}`).join('+')}`);
  console.log(`Current bias: ${neuron.inputBias}, Result: ${neuron.value}`);
}

module.exports = {
  printCalculation
};