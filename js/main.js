const getRandomFloat = (min, max, float) => {

  if (
    (Number.isNaN(min, max, float) || typeof min !== 'number' || typeof max !== 'number' || typeof float !== 'number')
  ) {
    throw new Error('min, max или float не являются числами');
  }
  const from = Math.min(min, max);
  const to = Math.max(min, max);
  const exponentBase = Math.pow(10, float);

  return (Math.round((Math.random() * (to - from) + from) * exponentBase) / exponentBase);

};

const getRandomInteger = (min, max) => getRandomFloat(min, max, 0);
getRandomInteger(1, 4);

