import { AnyAction } from 'redux';
import { FETCH_APOD, ERROR } from '../types';

const apodDefaultstate = { error: null, data: null };
export default (state: any = apodDefaultstate, action: AnyAction) => {
  switch (action.type) {
    case FETCH_APOD:
      return { erorr: null, data: action.data };
    case ERROR:
      return { error: action.error, data: null };
    default:
      return state;
  }
};
