const chai = require('chai');
const { expect } = chai;

const squaredErrorCostFunction = require('../../../src/network/costFunctions/squaredError');


describe('costFunctions', () => {
  describe('squaredError', () => {
    it('should calculate cost correctly', () => {
      const expectedResult = [3, 5];
      const realResult = [-1, 4];

      const cost = squaredErrorCostFunction(realResult, expectedResult);

      expect(cost).to.eql(8.5);
    });
  });
});