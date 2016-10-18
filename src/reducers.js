import { fromJS } from 'immutable';

var initialState = fromJS({
  location: '',
  total: 0,
  schools: []
});

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_LOCATION':
      return state.set('location', action.location);
    case 'SET_TOTAL':
      return state.set('total', action.total);
    case 'SET_SCHOOLS':
      return state.set('schools', fromJS(action.schools));
    default:
      return state;
  }
}
