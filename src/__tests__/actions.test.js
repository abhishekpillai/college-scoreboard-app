import {
  changeLocation, setTotal, setSchools, addField
} from '../actions';

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

  describe('setSchools', function() {
    it('should have a type of "SET_SCHOOLS"', function() {
      expect(setSchools().type).toEqual('SET_SCHOOLS');
    });

    it('should pass on the schools we pass in', function() {
      var schools = [{ 'school.name': 'Abhis Cool School' }];
      expect(setSchools(schools).schools).toEqual(schools);
    });
  });

  describe('addField', function() {
    it('should have a type of "ADD_FIELD"', function() {
      expect(addField().type).toEqual('ADD_FIELD');
    });

    it('should pass on the field we pass in', function() {
      var field = 'id'
      expect(addField(field).field).toEqual(field);
    });
  });
});
