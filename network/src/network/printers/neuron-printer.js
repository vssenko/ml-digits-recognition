function printFeedForward(neuron){
  console.log();
  console.log(`Neuron(${neuron.layerIndex},${neuron.index}): calculating value:`);
  console.log(`Input sum calc: ${neuron.inputWires.map(w => `${w.inputNeuron.output}*${w.weight}`).join('+')}, Bias: ${neuron.bias}`);
  console.log(`.netInput: ${neuron.netInput}, .output: ${neuron.output}`);
}

function printBackpropagation(neuron, { dEtoOutput, dOutputToNetInput, dEtoNetInput }){
  console.log();
  console.log(`Neuron(${neuron.layerIndex},${neuron.index}): backpropagating:`);
  console.log(`dEtoOutput: ${dEtoOutput}, dOutputToNetInput: ${dOutputToNetInput}, dEtoNetInput: ${dEtoNetInput}`);

  const inputWiresWeights = neuron.inputWires.map(w => w.weight).join(',');
  const inputWiresBakedWeights = neuron.inputWires.map(w => w.bakedWeight).join(',');
  console.log(`.delta: ${neuron.delta}, .bias: ${neuron.bias}`);
  console.log(`input wires baked weights: ${inputWiresWeights}, ${inputWiresBakedWeights}`);
}

module.exports = {
  printFeedForward,
  printBackpropagation
};