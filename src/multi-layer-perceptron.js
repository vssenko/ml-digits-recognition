const generateRandomArray = size => {
    const arr = new Array(size);
    for(let i = 0; i< size; i++){
        arr[i] = Math.random();
    }

    return arr;
};

const sigmoid = x => 1 / (1 + Math.pow(Math.E, -x));

/**
 * Multi layer perceptron manual implementation.
 * Not optimized due to overhead with copying arrays and no-matrix calculations,
 * but demonstrates well how perceptron works.
 * Example input [3,5,2] (3- input layer size, 5 - hidden layer size, 2 - output layer size)
 * will produce neural network:
 * O x O x
 *   x O x O
 * O x O x
 *   x O x O
 * O x O x
 */
class MultiLayerPerceptron {
    /**
     *
     * @param {Array<number>} args.layerSizes - array of layer dimensions 
     */
    constructor({ layerSizes }) {
        this.inputSize = layerSizes[0];

        // All layers count, including input, hidden and output layers
        this.layersCount = layerSizes.length;

        this._initLayersSpace(layerSizes);
        this._initBiases(layerSizes);
        this._initWeights(layerSizes);
    }

    _initLayersSpace(layerSizes){
        // We will lays copy input layer to _layers[0] just for demonstation how it works.
        this._layers = layerSizes.map(size => new Array(size));
    }

    _initBiases(layerSizes){
        // Each layer which receive data from another has "bias" - value to represent some "threshold".
        // We will start biases from input (always filled with zeros), and counter this.biases[l] as l laywer biases.
        // It will help us not to mess array indexes and layer numbers.
        this.biases = [
            new Array(layerSizes[0]).fill(0),
            ...layerSizes.slice(1).map(generateRandomArray)];
    }

    _initWeights(layerSizes){
        // Each neuron from "left" layer has weights
        // for all neurons from "right" layer in each "pair" of layers (l0-l1, l1-l2, etc).
        // Each weight will be accessible as this.weights[l][n1][n2],
        // where l - number of inter-layer, n1 - input neuron index, n2 - output neuron index.
        // We will count this.weights[0] as l0-l1 weights,
        this.weights = new Array(this.layersCount - 1);
        for(let layerIndex=1; layerIndex < layerSizes.length; layerIndex++) {
            const inputLayerSize = layerSizes[layerIndex-1];
            const outputLayerSize = layerSizes[layerIndex];
            const inputLayerWeights = new Array(inputLayerSize);
            for (let inputNeuronIndex=0; inputNeuronIndex < inputLayerSize; inputNeuronIndex++){
                inputLayerWeights[inputNeuronIndex] = generateRandomArray(outputLayerSize);
            }
            this.weights[layerIndex - 1] = inputLayerWeights;
        }
    }

    _feedNextLayer(inputLayerIndex){
        const outputLayerIndex = inputLayerIndex + 1;
        const inputLayer = this._layers[inputLayerIndex];
        const outputLayer = this._layers[outputLayerIndex];
        const outputBiases = this.biases[outputLayerIndex];
        const layerWeights = this.weights[inputLayerIndex];
        for(let outputNeuronIndex = 0; outputNeuronIndex < outputLayer.length; outputNeuronIndex++){
            // Calculate all input values and substract bias
            const value = inputLayer.reduce((sum, inputVaue, inputNeuronIndex) => {
                return sum + inputVaue * layerWeights[inputNeuronIndex][outputNeuronIndex];
            }, 0) - outputBiases[outputNeuronIndex];
            outputLayer[outputNeuronIndex] = sigmoid(value);
        }
    }

    trainWithData(inputData, expectedOutput) {
        //TODO: finish
    }

    run(inputData) {
        if (inputData.length !== this.inputSize){
            throw new Error('Invalid input size');
        }

        this._layers[0] = [...inputData];

        for(let inputLayerIndex=0; inputLayerIndex< this.layersCount -1; inputLayerIndex++){
            this._feedNextLayer(inputLayerIndex);
        }

        // Return copy of last ("output") layer
        return [...this._layers.slice(-1)[0]];
    }
}

module.exports = MultiLayerPerceptron;