const chai = require('chai');
const { expect } = chai;

const utils = require('../src/network/utils');

describe('utils', () => {
  describe('sigmoid', () => {
    it('should execute correctly for x=0', () => {
      const result = utils.sigmoid(0);
      expect(result).to.eql(0.5);
    });

    it('should execute correctly for x=5.3', () => {
      const result = utils.sigmoid(5.3);
      expect(result).to.eql(0.995033198349943);
    });
  });
});