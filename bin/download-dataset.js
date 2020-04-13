const config = require('../config');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const zlib = require('zlib');

const saveFolder = path.join(process.cwd(), config.dataset.folder);

if (!fs.existsSync(saveFolder)){
    fs.mkdirSync(saveFolder);
}

const getFileLocation = fileName => path.join(saveFolder, fileName);
const getFileUrl = (link, fileName) => `${link}${fileName}.gz`;

async function downloadFile(link, fileName){
    console.log(`Starting processing file ${fileName}`);
    const fileLocation = getFileLocation(fileName);

    if (fs.existsSync(fileLocation)){
        console.log(`File ${fileLocation} exists, skipping.`);
        return Promise.resolve();
    }

    console.log('Starting download...');

    const getFileResponse = await axios({
        method: 'get',
        url: getFileUrl(link, fileName),
        responseType: 'stream'
    });

    return new Promise((resolve, reject) => {
        const unzipStream = zlib.createGunzip();
        const writeStream = fs.createWriteStream(fileLocation);
        unzipStream.on('error', reject);
        writeStream.on('error', reject);
        unzipStream.on('end', () => {
            console.log(`File saved to ${fileLocation}`);
            resolve();
        });
        getFileResponse.data.pipe(unzipStream).pipe(writeStream);
    });
}

async function main(){
    for (const fileName of Object.values(config.mnist.files)){
        await downloadFile(config.mnist.link, fileName);
    }
}

main();