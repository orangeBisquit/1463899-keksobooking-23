import { conjucationHelper, checkExistence } from "./util.js";

const CARD_TEMPLATE = document
  .querySelector('#card')
  .content.querySelector('.popup');

const MAP_CANVAS = document.querySelector('#map-canvas');

const TYPE_KEYS = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const GUESTS_TYPES = ['Гостя', 'Гостей', 'Гостей'];
const ROOMS_TYPES = ['Комната', 'Комнаты', 'Комнат'];

const getCapacityNames = (roomsNumber, guestsNumber) => {
  const capacity = {
    guests: '',
    rooms: '',
  };

  capacity.guests = GUESTS_TYPES[conjucationHelper(guestsNumber)];
  capacity.rooms = ROOMS_TYPES[conjucationHelper(roomsNumber)];

  return capacity;
};

const getFeatures = (cardItem, featuresList) => {
  const templateFeatures = cardItem.querySelectorAll('.popup__feature');

  const modifiers = featuresList.map((feature) => `popup__feature--${feature}`);

  templateFeatures.forEach((item) => {
    const modifier = item.classList[1];

    if (!modifiers.includes(modifier)) {
      item.remove();
    }
  });
};

const getPhotos = (cardItem, photosDirs) => {
  const photosBlock = cardItem.querySelector('.popup__photos');

  const templatePhoto = photosBlock.querySelector('.popup__photo');

  photosBlock.innerHTML = '';

  photosDirs.forEach((dir) => {
    const newPhoto = templatePhoto.cloneNode();
    newPhoto.src = dir;
    photosBlock.appendChild(newPhoto);
  });
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

  const { avatar } = author;
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
  } = offer;

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

  adAvatar.src = avatar;
  if (!avatar) {
    adAvatar.remove();
  }

  getFeatures(card, features);
  getPhotos(card, photos);

  return card;
};

const renderCard = (card) => {
  MAP_CANVAS.appendChild(card);
};

export { createCard, renderCard };
