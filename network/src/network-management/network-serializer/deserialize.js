const { MultiLayerPerceptron } = require('../../network');

module.exports = function deserialize(fileContent){
  const deSerializedJSON = JSON.parse(fileContent);

  const network = new MultiLayerPerceptron({
    layerSizes: deSerializedJSON.layerSizes
  });

  deSerializedJSON.layers.forEach((layer, layerIndex) => {
    layer.forEach((dsNeuron, neuronIndex) =>{
      const networkNeuron = network.layers[layerIndex][neuronIndex];
      networkNeuron.bias = dsNeuron.bias;
      if(dsNeuron.inputWeights){
        dsNeuron.inputWeights.forEach((weight, wInd) => {
          networkNeuron.inputWires[wInd].weight = weight;
        });
      }
    });
  });

  return network;
};
