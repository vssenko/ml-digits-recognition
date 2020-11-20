# ml-digits-recognition
Main goal of this application is to show how neural network works step-by-step, with no matrix multiplication.

You may be enterested if you want to learn neural networks and don't want to go Python.

Current implementation is based on plain Multi Layer Perceptron with on-line training (no batches, backpropagation is done after each sample run).

# Presteps
1. npm i
2. npm run download-dataset

# Scripts
Things you can do with that:

## `npm test`
Run tests to be ensured that everything works correctly and see neural network each-step logs for better understanding

## `npm run test-xor`
Script to run NN "Hello World" - XOR operation prediction.

## `npm run test-mnist`
Script to run NN over MNIST training set, and after that test it over MNIST test set.

# Code

Main code idea is to reprecent neurons and wires as objects, with all the parameters set inside them.  
Neuron has `.inputWires` and `.outputWires`.
Wire has `.inputNeuron` and `.outputNeuron`.
Remember that object variable in JS is a reference to object, so  
`neuron === neuron.outputWires[0].inputNeuron`  
as well as  
`neuron.outputWires[0] === neuron.outputWires[0].outputNeuron.inputWires[0]`
