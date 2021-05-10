import moment from 'moment';

export const getLastWeek = () => {
  return {
    start: moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD'),
    end: moment().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD'),
  };
};

export const getLastMonth = () => {
  return {
    start: moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'),
    end: moment().subtract(1, 'months').endOf('month').format('YYYY-MM-DD'),
  };
};

export const getLastYear = () => {
  return {
    start: moment().subtract(1, 'years').startOf('year').format('YYYY-MM-DD'),
    end: moment().subtract(1, 'years').endOf('year').format('YYYY-MM-DD'),
  };
};
export const getTime = {
  getLastWeek,
  getLastMonth,
  getLastYear,
};
