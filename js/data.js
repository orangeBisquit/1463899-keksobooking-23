import {
  getRandomFloat,
  getRandomInteger,
  getRandomItems,
  getRandomItem,
  addPadLeft
} from './util.js';

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

const PHOTO_ROOT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking';

const PHOTOS = [
  `${PHOTO_ROOT}/duonguyen-8LrGtIxxa4w.jpg`,
  `${PHOTO_ROOT}/brandon-hoogenboom-SNxQGWxZQi0.jpg`,
  `${PHOTO_ROOT}/claire-rendall-b6kAwr1i0Iw.jpg`,
];

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
      avatar: `${AVATAR_DIR}${addPadLeft(0, 10)}.png`,
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

export const getAds = () => {
  const randomAds = [];

  for (let i = 0; i < ADS_NUMBER; i++) {
    randomAds.push(getAd());
  }

  return randomAds;
};
