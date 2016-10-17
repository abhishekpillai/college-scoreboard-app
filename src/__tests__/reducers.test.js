import mainReducer from '../reducers';
import { fromJS } from 'immutable';

describe('mainReducer', function() {
  it('should return the initial state', function() {
    expect(mainReducer(undefined, {})).toEqual(fromJS({
      location: '',
      total: 0
    }));
  });

  it("should react to an action with the type 'CHANGE_LOCATION'", function() {
    const location = 'IL';
    expect(mainReducer(undefined, {
      type: 'CHANGE_LOCATION',
      location: location
    })).toEqual(fromJS({
      location: location,
      total: 0
    }));
  });

  it("should react to an action with the type 'SET_TOTAL'", function() {
    const total = 100;
    expect(mainReducer(undefined, {
      type: 'SET_TOTAL',
      total: total
    })).toEqual(fromJS({
      location: '',
      total: total
    }));
  });
});
