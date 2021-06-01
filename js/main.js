const getRandomFloat = (min, max, float) => {

  const from = Math.min(min, max);
  const to = Math.max(min, max);

  if (from >= 0 && to >= 0) {
    return (Math.random() * (to - from) + from).toFixed(float);
  }
};

const getRandomInteger = (min, max) => getRandomFloat(min, max, 0);
getRandomInteger(1, 4);
