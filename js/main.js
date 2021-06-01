const getRandomFloat = (min, max, float) => {

  const exponentBase = Math.pow(10, float);

  const from = Math.min(min, max);
  const to = Math.max(min, max);

  const checkIsNaN = () => !Number.isNaN(from, to, float);

  if (from >= 0 && to >= 0 && checkIsNaN()) {
    return (
      Math.round((Math.random() * (to - from) + from) * exponentBase) /
      exponentBase
    );
  } else if (checkIsNaN()) {
    return (
      Math.round((Math.random() * (from - to) + to) * exponentBase) /
      exponentBase
    );
  }
};

const getRandomInteger = (min, max) => getRandomFloat(min, max, 0);
getRandomInteger(1, 4);


console.log(getRandomInteger(-28, 'aaa', 1));
console.log(getRandomInteger(-28, 3, 1));
console.log(getRandomInteger(-2, 3, -5));
console.log(getRandomInteger(-2, 3, 1));
console.log(getRandomInteger(-2, 56, 1));
console.log(getRandomInteger(-2, 3, 1));
