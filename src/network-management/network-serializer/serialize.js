const config = require('../../../config');
const fs = require('fs');
const path = require('path');

const saveFolder = path.join(process.cwd(), `${config.serialization.folder}`);

if (!fs.existsSync(saveFolder)){
  fs.mkdirSync(saveFolder);
}

module.exports = function serialize(network){
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

  const fileName = `network-${network.layerSizes.join('-')}.json`;
  const fullName = path.join(saveFolder, fileName);
  console.log(`Saving to ${fullName}`);
  if(fs.existsSync(fullName)){
    fs.unlinkSync(fullName);
  }
  fs.writeFileSync(fullName, JSON.stringify(serializationObject));
};
