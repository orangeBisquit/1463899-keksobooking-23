const getRandomFloat = (min, max, float) => {
  if (min >= 0 && max >= 0 && min < max) {
    return Math.round((Math.random() * (max - min) + min) * Math.pow(10, float)) /
      Math.pow(10, float);
  }
};

getRandomFloat(20, 30, 3);
getRandomFloat(40, 30, 3);
// DELETE
// console.log(getRandomFloat(20, 30, 3));
// console.log(getRandomFloat(20, 30, 3));
// console.log(getRandomFloat(20, 30, 3));
// console.log(getRandomFloat(40, 30, 3));


const getRandomInteger = (min, max) => {
  if (min >= 0 && max >= 0 && min < max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
};

getRandomInteger(10, 15);
getRandomInteger(17, 15);
// DELETE
// console.log(getRandomInteger(10, 15));
// console.log(getRandomInteger(10, 15));
// console.log(getRandomInteger(10, 15));
// console.log(getRandomInteger(17, 15));

