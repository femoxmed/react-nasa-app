import { FETCH_APOD, ERROR } from '../types';

export const fetchApod = (data: object) => ({
  type: FETCH_APOD,
  data,
});

export const throwError = (error: string) => ({
  type: ERROR,
  error,
});

export const fetchApodFromLocalStorage = (data: object) => async (
  dispatch: any
) => {
  if (Object.keys(data).length > 0) {
    return dispatch(fetchApod(data));
  } else {
    return dispatch(throwError('Data cannot be fetched'));
  }
};

export const startFetchApod = (date: string = '') => async (dispatch: any) => {
  let url: string = `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`;

  if (date && date.length > 0) url += `&date=${date}`;

  try {
    let response = await fetch(url);
    let data = await response.json();

    if (data && data.code === 400) {
      dispatch(throwError(data.msg));
    } else {
      dispatch(fetchApod(data));
      return data;
    }
  } catch (error) {
    return dispatch(throwError(error.message));
  }
};
