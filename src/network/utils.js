const generateRandomWeight = () => Math.random() - 0.5;


const generateRandomWeightsArray = size => {
    const arr = new Array(size);
    for(let i = 0; i< size; i++){
        arr[i] = generateRandomWeight();
    }

    return arr;
};


const sigmoid = x => 1 / (1 + Math.pow(Math.E, -x));

module.exports = {
    generateRandomWeight,
    generateRandomWeightsArray,
    sigmoid
};