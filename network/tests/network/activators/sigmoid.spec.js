const chai = require('chai');
const { expect } = chai;

const sigmoidActivator = require('../../../src/network/activators/sigmoid');

describe('activators', () => {
  describe('sigmoid', () => {
    it('should execute correctly for x=0', () => {
      const result = sigmoidActivator.func(0);
      expect(result).to.eql(0.5);
    });

    it('should execute correctly for x=5.3', () => {
      const result = sigmoidActivator.func(5.3);
      expect(result).to.eql(0.995033198349943);
    });
  });
});