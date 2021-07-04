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

const roundToDecimals = (number, dec) => {
  const roundedNumber = Number(number.toFixed(dec));
  return roundedNumber;
};

const getRandomPadded = (min, max) =>
  String(getRandomInteger(min, max)).padStart(2, '0');

const getNounEnding = (amount) => {
  if (amount % 10 === 1 && amount % 100 !== 11) {
    return 0;
  }
  if (
    amount % 10 >= 2 &&
    amount % 10 <= 4 &&
    (amount % 100 < 10 || amount % 100 >= 20)
  ) {
    return 1;
  } else {
    return 2;
  }
};

const checkExistence = (...args) => !args.includes(undefined);

const isEscPress = (evt) => {
  if (evt.keyCode === 27 || evt.key === 'Escape' || evt.key === 'Escape') {
    return true;
  }
};

export {
  getRandomFloat,
  getRandomInteger,
  getRandomPadded,
  getNounEnding,
  checkExistence,
  isEscPress,
  roundToDecimals
};
