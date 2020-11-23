const config = require('../../../config');
const fs = require('fs');
const path = require('path');

const serialize = require('./serialize');
const deserialize = require('./deserialize');

const saveFolder = path.join(process.cwd(), `${config.serialization.folder}`);

if (!fs.existsSync(saveFolder)){
  fs.mkdirSync(saveFolder);
}


function saveToFile(network, serialized){
  const fileName = `network-${network.layerSizes.join('-')}.json`;
  const fullName = path.join(saveFolder, fileName);
  console.log(`Saving serialized network to ${fullName}`);
  if(fs.existsSync(fullName)){
    fs.unlinkSync(fullName);
  }
  fs.writeFileSync(fullName, serialized);
}


function serializeAndSave(network){
  const serialized = serialize(network);
  saveToFile(network, serialized);
}

function deserializeFromFile(filePath){
  const content = fs.readFileSync(filePath);
  return deserialize(content);
}

module.exports = {
  serialize,
  deserialize,
  serializeAndSave,
  deserializeFromFile
};