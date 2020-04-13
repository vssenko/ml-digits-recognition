const trainDataProvider = require('./train-data-provider');
const networkSerializer = require('./network-serializer');
const utils = require('./network/utils');

const errorTreshold = 0.2;

function train(network) {
    console.log('Preparing for training...');
    const trainData = trainDataProvider.getTrainData();

    // For better speed it, it's better to train network not on every data sample, but on chunks
    // But for simplicity i'll keep it in "brute force" way
    console.log('Training network...');
    console.log(`Satisfying cost threshold is ${errorTreshold}`);

    let currentCost = 10;

    for (let i = 0; i < trainData.length; i++){
        const sample = trainData[i];
        if (!(i % 1000)) {
            console.log(`Processing data sample #${i}. Current cost : ${currentCost}`);
        }
        const data = sample.imageBytes;
        const expected = sample.labelArrayRepresentation;
        const result = network.trainWithData(data, expected);
        currentCost = utils.costFunction(result, expected);
        if (currentCost <= errorTreshold){
            console.log('Cost is satisfying, stop training.');
            break;
        }
    }
    console.log('Serializing network for future usage...');
    networkSerializer.serialize(network);
}

function test(perceptron) {
}

module.exports = {
    train,
    test
};