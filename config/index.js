module.exports = {
    mnist: {
        link: 'http://yann.lecun.com/exdb/mnist/',
        files: {
            trainImages: 'train-images-idx3-ubyte',
            trainLabels: 'train-labels-idx1-ubyte',
            testImages: 't10k-images-idx3-ubyte',
            testLabels: 't10k-labels-idx1-ubyte'
        }
    },
    dataset: {
        folder: '/dataset'
    },
    serialization: {
        folder: '/serialized-network-samples'
    }
};