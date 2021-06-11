const AVATAR_DIR = 'img/avatars/user';

const TEMP_MAX_ROOMS = 10;

const TEMP_MAX_GUESTS = 30;

const OBJECTS_NUMBER = 10;

const getRandomFloat = (min, max, float) => {
  if (
    Number.isNaN(min, max, float) ||
    typeof min !== 'number' ||
    typeof max !== 'number' ||
    typeof float !== 'number'
  ) {
    throw new Error('min, max или float не являются числами');
  }
  const from = Math.min(min, max);
  const to = Math.max(min, max);
  const exponentBase = Math.pow(10, float);

  return (
    Math.round((Math.random() * (to - from) + from) * exponentBase) /
    exponentBase
  );
};

const getRandomInteger = (min, max) => getRandomFloat(min, max, 0);
getRandomInteger(1, 4);

// module4 task 1

// Выбрать рандомные элементы массива
const getRandomArrayValues = (array) => {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  const valuesPickedNumber = getRandomInteger(0, array.length) + 1;
  const valuesPickedArray = [];
  for (let i = 0; i < valuesPickedNumber; i++) {
    valuesPickedArray[i] = shuffledArray[i];
  }
  return valuesPickedArray;
};

// Создать объект

const TempPrice = {
  priceMin: 0,
  priceMax: 1000,
};

const TYPES = ['palace', 'flat', 'house', 'bungalow'];

const CHECKIN_TIMES = ['12:00', '13:00', '14:00'];

const CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const GeoLocation = {
  lat: {
    min: 35.65,
    max: 35.7,
  },
  lng: {
    min: 139.7,
    max: 139.8,
  },
  float: 5,
};

const createRandomObj = () => ({
  author: {
    avatar: `${AVATAR_DIR}${String(getRandomInteger(0, 10)).padStart(
      2,
      '0',
    )}'.png'`,
  },
  offer: {
    title: 'Объявление',
    address: `${getRandomFloat(
      GeoLocation.lat.min,
      GeoLocation.lat.max,
      GeoLocation.float,
    )}, ${getRandomFloat(
      GeoLocation.lng.min,
      GeoLocation.lng.max,
      GeoLocation.float,
    )}`,
    price: getRandomInteger(TempPrice.priceMin, TempPrice.priceMax),
    type: TYPES[getRandomInteger(0, TYPES.length - 1)],
    rooms: getRandomInteger(1, TEMP_MAX_ROOMS),
    guests: getRandomInteger(1, TEMP_MAX_GUESTS),
    checkin: CHECKIN_TIMES[getRandomInteger(0, CHECKIN_TIMES.length - 1)],
    checkout: CHECKOUT_TIMES[getRandomInteger(0, CHECKOUT_TIMES.length - 1)],
    features: getRandomArrayValues(FEATURES),
    description: 'Описание',
    photos: getRandomArrayValues(PHOTOS),
  },
  location: {
    lat: getRandomFloat(
      GeoLocation.lat.min,
      GeoLocation.lat.max,
      GeoLocation.float,
    ),
    lng: getRandomFloat(
      GeoLocation.lng.min,
      GeoLocation.lng.max,
      GeoLocation.float,
    ),
  },
});

const randomObjects = [];

for (let i = 0; i < OBJECTS_NUMBER; i++) {
  randomObjects.push(createRandomObj());
}

randomObjects;
