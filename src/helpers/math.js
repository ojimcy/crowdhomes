export const formatAmount = (amount) => {
  return (amount / 1e4).toFixed(4);
};

export const add = (a, b) => {
  return a + b;
};

export const formatUnixDate = (date) => {
  return `${new Date(date * 1000).toDateString()} ${new Date(
    date * 1000
  ).toTimeString()}`;
};
