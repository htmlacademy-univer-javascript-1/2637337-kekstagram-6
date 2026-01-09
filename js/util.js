const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

const getRandomNoRepeatInt = (min, max, usedArray) => {
  let currentValue = getRandomInteger(min, max);
  while (usedArray.includes(currentValue))
  {
    currentValue = getRandomInteger(min, max);
  }
  usedArray.push(currentValue);
  return currentValue;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const checkForRepeats = (array) => {
  const lowerCaseArray = array.map((item) => item.toLowerCase());
  const uniqueSet = new Set(lowerCaseArray);
  return uniqueSet.size !== lowerCaseArray.length;
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomInteger, getRandomArrayElement, getRandomNoRepeatInt, isEscapeKey, checkForRepeats, debounce };
