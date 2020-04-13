const generateRandomWeight = () => 2 * (Math.random() - 0.5);


const generateRandomWeightsArray = size => {
    const arr = new Array(size);
    for(let i = 0; i< size; i++){
        arr[i] = generateRandomWeight();
    }

    return arr;
};


const sigmoid = x => 1 / (1 + Math.pow(Math.E, -x));

const costFunction = (result, expected) => 1 / 2 * result.reduce((sum,val,ind) => sum + Math.abs(val - expected[ind]),0);

module.exports = {
    generateRandomWeight,
    generateRandomWeightsArray,
    sigmoid,
    costFunction
};