import { getNounEnding, checkExistence } from './util.js';
import { createMarker, clearPins } from './leaflet-map.js';
import { setFormAddress } from './form.js';
import { prepareData, getData } from './store-data.js';
import { applyFilters } from './filter.js';

const CARD_TEMPLATE = document
  .querySelector('#card')
  .content.querySelector('.popup');

const TYPE_KEYS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const GUESTS_TYPES = ['гостя', 'гостей', 'гостей'];
const ROOMS_TYPES = ['комната', 'комнаты', 'комнат'];

const getCapacityNames = (roomsNumber, guestsNumber) => {
  const capacity = {
    guests: '',
    rooms: '',
  };

  capacity.guests = GUESTS_TYPES[getNounEnding(guestsNumber)];
  capacity.rooms = ROOMS_TYPES[getNounEnding(roomsNumber)];

  return capacity;
};

const setFeatures = (cardItem, featuresList) => {
  const featuresBlock = cardItem.querySelector('.popup__features');
  const templateFeatures = cardItem.querySelectorAll('.popup__feature');

  if (featuresList) {
    const modifiers = featuresList.map((feature) => `popup__feature--${feature}`);

    templateFeatures.forEach((item) => {
      const modifier = item.classList[1];

      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  } else {
    featuresBlock.remove();
  }

};

const setPhotos = (cardItem, photosDirs) => {
  const photosBlock = cardItem.querySelector('.popup__photos');

  const templatePhoto = photosBlock.querySelector('.popup__photo');

  photosBlock.innerHTML = '';

  if (photosDirs) {
    photosDirs.forEach((dir) => {
      const newPhoto = templatePhoto.cloneNode();
      newPhoto.src = dir;
      photosBlock.appendChild(newPhoto);
    });
  } else {
    photosBlock.remove();
  }

};

const setOrRemove = (element, value, text = value) => {
  if (!value) {
    element.remove();
  } else {
    element.textContent = text;
  }
};

const createCard = (arrayItem) => {
  const { author, offer } = arrayItem;

  const { avatar } = author || {};
  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    features,
    description,
    photos,
    checkin,
    checkout,
  } = offer || {};

  const card = CARD_TEMPLATE.cloneNode(true);

  const adTitle = card.querySelector('.popup__title');
  const adAddress = card.querySelector('.popup__text--address');
  const adPrice = card.querySelector('.popup__text--price');
  const adType = card.querySelector('.popup__type');
  const adCapacity = card.querySelector('.popup__text--capacity');
  const adCheckInAndOut = card.querySelector('.popup__text--time');
  const adDescription = card.querySelector('.popup__description');
  const adAvatar = card.querySelector('.popup__avatar');

  const capacityNames = getCapacityNames(rooms, guests);


  setOrRemove(adTitle, title);
  setOrRemove(adAddress, address);
  setOrRemove(adPrice, price, `${price} ₽/ночь`);
  setOrRemove(adType, type, TYPE_KEYS[type]);
  setOrRemove(
    adCapacity,
    rooms * guests,
    `${rooms} ${capacityNames.rooms} для ${guests} ${capacityNames.guests}`,
  );
  setOrRemove(adDescription, description);
  setOrRemove(
    adCheckInAndOut,
    checkExistence(checkin, checkout),
    `Заезд после ${checkin}, выезд до ${checkout}`,
  );

  if (!avatar) {
    adAvatar.remove();
  } else {
    adAvatar.src = avatar;
  }


  setFeatures(card, features);
  setPhotos(card, photos);

  return card;
};

const createPins = (adsData) => {
  adsData.forEach((item) => {
    createMarker(item);
  });
};

const updateMarkers = () => {
  clearPins();
  setFormAddress();
  prepareData(applyFilters);
  createPins(getData());
};

export { createCard, createPins, updateMarkers };
