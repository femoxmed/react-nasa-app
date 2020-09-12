import { AnyAction } from 'redux';
import { QUERYDATE } from '../types';

const defaultQueryDate = { date: '' };
export default (state: any = defaultQueryDate, action: AnyAction) => {
  switch (action.type) {
    case QUERYDATE:
      return { ...action.date };
    default:
      return state;
  }
};
