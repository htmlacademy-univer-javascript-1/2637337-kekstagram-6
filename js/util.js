export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

export const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

export const getRandomNoRepeatInt = (min, max, usedArray) => {
  let currentValue = getRandomInteger(min, max);
  while (usedArray.includes(currentValue)) {
    currentValue = getRandomInteger(min, max);
  }
  usedArray.push(currentValue);
  return currentValue;
};

export const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => ++lastGeneratedId;
};
