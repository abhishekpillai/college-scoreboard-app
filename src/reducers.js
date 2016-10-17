var initialState = {
  location: '',
  total: 0
};

export default function mainReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_LOCATION':
      return Object.assign({}, state, {
        location: action.location
      });
    case 'SET_TOTAL':
      return Object.assign({}, state, {
        total: action.total
      });
    default:
      return state;
  }
}
