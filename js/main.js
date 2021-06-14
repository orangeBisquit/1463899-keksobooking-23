const AVATAR_DIR = 'img/avatars/user';

const MAX_ROOMS = 10;

const MAX_GUESTS = 30;

const ADS_NUMBER = 10;

const Price = {
  priceMin: 0,
  priceMax: 1000,
};

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

const TYPES = ['palace', 'flat', 'house', 'bungalow'];

const CHECKIN_TIMES = ['12:00', '13:00', '14:00'];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTO_ROOT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking';

const PHOTOS = [
  `${PHOTO_ROOT}/duonguyen-8LrGtIxxa4w.jpg`,
  `${PHOTO_ROOT}/brandon-hoogenboom-SNxQGWxZQi0.jpg`,
  `${PHOTO_ROOT}/claire-rendall-b6kAwr1i0Iw.jpg`,
];

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
getRandomInteger(1, 4);

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

// Создать объект
const getAd = () => {

  const locationLat = getRandomFloat(
    GeoLocation.lat.min,
    GeoLocation.lat.max,
    GeoLocation.float,
  );
  const locationLng = getRandomFloat(
    GeoLocation.lng.min,
    GeoLocation.lng.max,
    GeoLocation.float,
  );

  const checkInAndOut =
    CHECKIN_TIMES[getRandomInteger(0, CHECKIN_TIMES.length - 1)];

  return {
    author: {
      avatar: `${AVATAR_DIR}${String(getRandomInteger(0, 10)).padStart(
        2,
        '0',
      )}'.png'`,
    },
    offer: {
      title: 'Объявление',
      address: `${locationLat}, ${locationLng}`,
      price: getRandomInteger(Price.priceMin, Price.priceMax),
      type: getRandomItem(TYPES),
      rooms: getRandomInteger(1, MAX_ROOMS),
      guests: getRandomInteger(1, MAX_GUESTS),
      checkin: checkInAndOut,
      checkout: checkInAndOut,
      features: getRandomItems(FEATURES),
      description: 'Описание',
      photos: getRandomItems(PHOTOS, false),
    },
    location: {
      lat: locationLat,
      lng: locationLng,
    },
  };};

const getAds = () => {
  const randomAds = [];

  for (let i = 0; i < ADS_NUMBER; i++) {
    randomAds.push(getAd());
  }

  return randomAds;
};

const myAds = getAds();

myAds;
