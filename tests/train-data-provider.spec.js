const chai = require('chai');
const { expect } = chai;

const testData = require('./data/trainImageBytes');

const trainDataProvider = require('../src/train-data-provider');



xdescribe('trainDataProvider', () => {
  describe('getTrainData()', () => {
    it('should return correctly parsed array', () => {
      const result = trainDataProvider.getTrainData();

      expect(result[0].imageBytes).to.deep.eq(testData.firstTrainDataImageBytes);
      expect(result[0].label).to.eql(5);
      expect(result[0].labelArrayRepresentation).to.deep.eql([0,0,0,0,0,1,0,0,0,0]);

      expect(result[1].imageBytes).to.deep.eq(testData.secondTrainImageBytes);
      expect(result[1].label).to.eql(0);
      expect(result[1].labelArrayRepresentation).to.deep.eql([1,0,0,0,0,0,0,0,0,0]);
    });
  });
});