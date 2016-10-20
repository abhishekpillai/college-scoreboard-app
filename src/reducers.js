import { fromJS } from 'immutable';

var initialState = fromJS({
  location: '',
  total: 0,
  schools: [],
  filters: {}
});

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_LOCATION':
      return state.set('location', action.location);
    case 'SET_TOTAL':
      return state.set('total', action.total);
    case 'SET_SCHOOLS':
      return state.set('schools', fromJS(action.schools));
    case 'ADD_FILTER':
      let existingFilters = state.get('filters');
      return state.set('filters', existingFilters.merge(action.filter));
    default:
      return state;
  }
}
