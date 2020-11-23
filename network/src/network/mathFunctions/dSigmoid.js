const sigmoid = require('./sigmoid');

module.exports = x => sigmoid(x) * (1 - sigmoid(x));