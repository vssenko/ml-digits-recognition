const fs = require('fs');
const path = require('path');
const config = require('../../config');

const trainImageFile = config.mnist.files.trainImages;
const trainLabelFile = config.mnist.files.trainLabels;
const testImageFile = config.mnist.files.testImages;
const testLabelFile = config.mnist.files.testLabels;

function parseImagesBuffer(imagesDataBuffer){
  const startPosition = 16;
  const step = 28 * 28;

  const imagesBytes = [];
  let pointer = startPosition;
  while(pointer < imagesDataBuffer.length - 1){
    imagesBytes.push(Array.from(new Uint8Array(imagesDataBuffer.slice(pointer, pointer+step))));
    pointer+=step;
  }

  return imagesBytes;
}

function parseLabelsBuffer(labelsBuffer){
  const startPosition = 8;
  const step = 1;

  const labels = [];
  let pointer = startPosition;
  while(pointer <= labelsBuffer.length - 1){
    labels.push(Uint8Array.from(labelsBuffer.slice(pointer, pointer+step))[0]);
    pointer+=step;
  }
  return labels;
}

function labelToArrayRepresentation(label){
  const arr = new Array(10).fill(0);
  arr[label] = 1;
  return arr;
}

function combineArrays(imagesBytesArray, labelsArray){
  console.log(`Combying images (${imagesBytesArray.length}) and labels (${labelsArray.length}) arrays`);
  return imagesBytesArray.map((input, index) => {
    const label = labelsArray[index];
    return {
      input,
      label,
      output: labelToArrayRepresentation(label)
    };
  });
}

function provideData(imageFileName, labelFileName) {
  const imagesDataBuffer = fs.readFileSync(path.join(process.cwd(), `./dataset/${imageFileName}`));
  console.log(`Read file ${trainImageFile}:`);
  console.log(`${trainImageFile}: Total file length: ${imagesDataBuffer.byteLength}`);
  console.log(`${trainImageFile}: First magic number: ${imagesDataBuffer.slice(0, 4).readInt32BE()}`);
  console.log(`${trainImageFile}: Number of images: ${imagesDataBuffer.slice(4, 8).readInt32BE()}`);
  console.log(`${trainImageFile}: Number of rows: ${imagesDataBuffer.slice(8, 12).readInt32BE()}`);
  console.log(`${trainImageFile}: Number of columns: ${imagesDataBuffer.slice(12, 16).readInt32BE()}`);
  console.log('');
  const labelsDataBuffer = fs.readFileSync(path.join(process.cwd(), `./dataset/${labelFileName}`));
  console.log(`Read file ${trainLabelFile}:`);
  console.log(`${trainLabelFile}: Total file length: ${labelsDataBuffer.byteLength}`);
  console.log(`${trainLabelFile}: First magic number: ${labelsDataBuffer.slice(0, 4).readInt32BE()}`);
  console.log(`${trainLabelFile}: Number of labels: ${labelsDataBuffer.slice(4, 8).readInt32BE()}`);

  console.log('Loading...');

  const images = parseImagesBuffer(imagesDataBuffer);
  const labels = parseLabelsBuffer(labelsDataBuffer);

  return combineArrays(images, labels);
}

function getTrainData(){
  console.log('Reading training data...');
  return provideData(trainImageFile, trainLabelFile);
}



function getTestData(){
  console.log('Reading test data...');
  return provideData(testImageFile, testLabelFile);
}

module.exports = {
  getTrainData,
  getTestData
};