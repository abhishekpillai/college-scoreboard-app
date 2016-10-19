import mainReducer from '../reducers';
import { fromJS } from 'immutable';

describe('mainReducer', function() {
  const initialState = {
    location: '',
    total: 0,
    schools: []
  }

  it('should return the initial state', function() {
    expect(mainReducer(undefined, {})).toEqual(fromJS(initialState));
  });

  it("should react to an action with the type 'CHANGE_LOCATION'", function() {
    const location = 'IL';
    expect(mainReducer(undefined, {
      type: 'CHANGE_LOCATION',
      location: location
    })).toEqual(fromJS(initialState).merge({ location: location }));
  });

  it("should react to an action with the type 'SET_TOTAL'", function() {
    const total = 100;
    expect(mainReducer(undefined, {
      type: 'SET_TOTAL',
      total: total
    })).toEqual(fromJS(initialState).merge({ total: total }));
  });

  it("should react to an action with the type 'SET_SCHOOLS'", function() {
    const schools = [{ 'school.name': 'Abhis Cool School' }];
    expect(mainReducer(undefined, {
      type: 'SET_SCHOOLS',
      schools: schools
    })).toEqual(fromJS(initialState).merge({ schools: schools }));
  });
});
