import { QUERYDATE } from '../types';
export const setDateQuery = (date: string) => ({
  type: QUERYDATE,
  date,
});

export const startSetDateQuery = (date: string) => (dispatch: any) => {
  dispatch(setDateQuery(date));
};
