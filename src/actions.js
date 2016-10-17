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

export function fetchData(requestUrl) {
  return function thunk(dispatch) {
    xhr({ url:  requestUrl }, (err, resp, body) => {
      dispatch(setTotal(JSON.parse(body).metadata.total));
    })
  }
}
