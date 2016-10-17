import { changeLocation, setTotal } from '../actions';

describe('actions', function() {
  describe('changeLocation', function() {
    it('should have a type of "CHANGE_LOCATION"', function() {
      expect(changeLocation().type).toEqual('CHANGE_LOCATION');
    });

    it('should pass on the location we pass in', function() {
      var location = 'IL';
      expect(changeLocation(location).location).toEqual(location);
    });
  });

  describe('setTotal', function() {
    it('should have a type of "SET_TOTAL"', function() {
      expect(setTotal().type).toEqual('SET_TOTAL');
    });

    it('should pass on the location we pass in', function() {
      var total = 400;
      expect(setTotal(total).total).toEqual(total);
    });
  });
});
