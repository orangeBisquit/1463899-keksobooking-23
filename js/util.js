const isPositiveNumber = (value) => typeof value === 'number' && value >= 0;

const getRandomFloat = (...args) => {
  if (args.some((value) => !isPositiveNumber(value))) {
    throw new Error('min, max или float не являются положительными числами');
  }
  const [min, max, float] = args;
  const from = Math.min(min, max);
  const to = Math.max(min, max);
  const exponentBase = Math.pow(10, float);

  return (
    Math.round((Math.random() * (to - from) + from) * exponentBase) /
    exponentBase
  );
};

const getRandomInteger = (min, max) => getRandomFloat(min, max, 0);

// Выбрать рандомные элементы массива
const getRandomBoolean = () => Math.random() <= 0.5;

const getRandomItems = (array, canBeEmpty = true) => {
  const result = array.filter(getRandomBoolean);

  if (!canBeEmpty && result.length < 1) {
    result.push(array[Math.floor(Math.random * array.length)]);
  }

  return result;
};

const getRandomItem = (array) => {
  const length = getRandomItems(array).length;
  const randomIdx = Math.floor(Math.random() * length);
  const randomItem = array[randomIdx];

  return randomItem;
};

export {getRandomFloat, getRandomInteger, getRandomItems, getRandomItem};
