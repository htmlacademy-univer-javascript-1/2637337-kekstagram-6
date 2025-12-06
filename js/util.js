const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

const getRandomNoRepeatInt = (min, max, usedArray) => {
  let currentValue = getRandomInteger(min, max);
  while (usedArray.includes(currentValue)) {
    currentValue = getRandomInteger(min, max);
  }
  usedArray.push(currentValue);
  return currentValue;
};

const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => ++lastGeneratedId;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandomInteger, getRandomArrayElement, getRandomNoRepeatInt, createIdGenerator, isEscapeKey };
