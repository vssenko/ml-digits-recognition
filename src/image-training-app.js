function train() {
    //TODO: finish
}

function test(perceptron) {

    const result = perceptron.run([5,2,1]);
    console.log('Test result: ');
    console.log(result);
    //TODO: finish
}

module.exports = {
    train,
    test
};