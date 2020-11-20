const chai = require('chai');
const { expect } = chai;

const testData = require('../_misc/mnistTrainSamples');

const trainDataProvider = require('../../src/mnist/train-data-provider');



describe('trainDataProvider', () => {
  describe('getTrainData()', () => {
    it('should return correctly parsed array', () => {
      const result = trainDataProvider.getTrainData();

      expect(result[0].input).to.deep.eq(testData.firstTrainDataImageBytes);
      expect(result[0].label).to.eql(5);
      expect(result[0].output).to.deep.eql([0,0,0,0,0,1,0,0,0,0]);

      expect(result[1].input).to.deep.eq(testData.secondTrainImageBytes);
      expect(result[1].label).to.eql(0);
      expect(result[1].output).to.deep.eql([1,0,0,0,0,0,0,0,0,0]);

      expect(result[59999].output).to.deep.eql([0,0,0,0,0,0,0,0,1,0]);
      expect(result[59999].label).to.eql(8);
      if (result.find(s => s.label === undefined)){
        throw new Error('Invalid data sample');
      }
    });
  });
});