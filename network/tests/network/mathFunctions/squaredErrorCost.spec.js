const chai = require('chai');
const { expect } = chai;

const squaredErrorCost = require('../../../src/network/mathFunctions/squaredErrorCost');


describe('mathFunctions', () => {
  describe('squaredErrorCost', () => {
    it('should calculate cost correctly', () => {
      const expectedResult = [3, 5];
      const realResult = [-1, 4];

      const cost = squaredErrorCost(realResult, expectedResult);

      expect(cost).to.eql(8.5);
    });
  });
});