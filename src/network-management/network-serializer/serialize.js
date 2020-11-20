module.exports = function serialize(network){
  console.log('Serializing network...');

  const serializationObject = { layers: [], layerSizes: network.layerSizes};

  for (let layer of network.layers) {
    const serializedLayer = [];
    layer.forEach(neuron => {
      const serializedNeuron = { bias: neuron.bias, layerIndex: neuron.layerIndex, index: neuron.index };
      if (neuron.inputWires){
        serializedNeuron.inputWeights = neuron.inputWires.map(w => w.weight);
      }
      serializedLayer.push(serializedNeuron);
    });
    serializationObject.layers.push(serializedLayer);
  }

  return JSON.stringify(serializationObject);
};
