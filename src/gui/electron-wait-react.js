const net = require('net');

//foreman will offset any ports by 100, so we need to subsctract them back
const port = process.env.PORT ? (process.env.PORT - 100) : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

console.log('Electron: waiting for react...');

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () => client.connect({port: port}, () => {
  client.end();
  if(!startedElectron) {
    console.log('Electron: starting Electron...');
    startedElectron = true;
    const exec = require('child_process').exec;
    exec('npm run start-electron');
  }
}
);

tryConnection();

client.on('error', () => {
  setTimeout(tryConnection, 1000);
});