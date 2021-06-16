import { getAds } from './data.js';
import { conjucationHelper } from './util.js';

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

const cardTemplate = document
  .querySelector('#card')
  .content.querySelector('.popup');

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

  const card = cardTemplate.cloneNode(true);

  const adTitle = card.querySelector('.popup__title');
  const adAddress = card.querySelector('.popup__text--address');
  const adPrice = card.querySelector('.popup__text--price');
  const adType = card.querySelector('.popup__type');
  const adCapacity = card.querySelector('.popup__text--capacity');
  const adCheckInAndOut = card.querySelector('.popup__text--time');
  const adDescription = card.querySelector('.popup__description');
  const adAvatar = card.querySelector('.popup__avatar');

  const capacityNames = getCapacityNames(rooms, guests);

  adTitle.textContent = title;

  adAddress.textContent = address;

  adPrice.textContent = `${price} ₽/ночь`;

  adType.textContent = TYPE_KEYS[type];

  adCapacity.textContent = `${rooms} ${capacityNames.rooms} для ${guests} ${capacityNames.guests}`;

  getFeatures(card, features);

  adDescription.textContent = description;

  getPhotos(card, photos);

  adAvatar.src = avatar;

  adCheckInAndOut.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;

  return card;
};

const mapCanvas = document.querySelector('#map-canvas');

const renderCard = (card) => {
  mapCanvas.appendChild(card);
};

const myAds = getAds();

renderCard(createCard(myAds[0]));
