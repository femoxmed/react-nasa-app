export const addZeros = (num: number): string =>
  num < 10 ? `0${num}` : num.toString();

const formatDate = (date: Date): string => {
  let year, month, day;

  year = date.getFullYear();
  month = date.getMonth() + 1;
  day = date.getDate();

  const fomattedDate: string = `${year}-${addZeros(month)}-${addZeros(day)}`;
  return fomattedDate;
};

export default formatDate;
