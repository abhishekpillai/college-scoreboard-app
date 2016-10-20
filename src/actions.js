import xhr from 'xhr';

export function changeLocation(location) {
  return {
    type: 'CHANGE_LOCATION',
    location: location
  };
}

export function setTotal(total) {
  return {
    type: 'SET_TOTAL',
    total: total
  };
}

export function setSchools(schools) {
  return {
    type: 'SET_SCHOOLS',
    schools: schools
  };
}

export function addFilter(filter) {
  return {
    type: 'ADD_FILTER',
    filter: filter
  };
}


export function fetchData(requestUrl) {
  return function thunk(dispatch) {
    xhr({ url:  requestUrl }, (err, resp, body) => {
      const parsed = JSON.parse(body);
      dispatch(setTotal(parsed.metadata.total));
      dispatch(setSchools(parsed.results));
    })
  }
}
