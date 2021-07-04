import { mainMarker, resetMainMarker } from './leaflet-map.js';
import { postDataSuccess } from './message.js';
import { roundToDecimals } from './util.js';
import { updateMarkers } from './render-card.js';

const AD_FORM = document.querySelector('.ad-form');
const MAP_FILTERS = document.querySelector('.map__filters');
const AD_HEADING = AD_FORM.querySelector('#title');
const AD_PRICE = AD_FORM.querySelector('#price');
const AD_ROOM = AD_FORM.querySelector('#room_number');
const AD_CAPACITY = AD_FORM.querySelector('#capacity');
const AD_TYPE = AD_FORM.querySelector('#type');
const AD_CAPACITY_OPTIONS = AD_CAPACITY.querySelectorAll('option');
const AD_TIMEIN = AD_FORM.querySelector('#timein');
const AD_TIMEOUT = AD_FORM.querySelector('#timeout');
const AD_ADDRESS = AD_FORM.querySelector('#address');
const RESET_BUTTON = AD_FORM.querySelector('.ad-form__reset');

const RoomOptions = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const RoomPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const headingInputHandler = () => {
  const valueLength = AD_HEADING.value.length;
  const minLength = AD_HEADING.getAttribute('minlength');
  const maxLength = AD_HEADING.getAttribute('maxlength');

  if (valueLength < minLength) {
    AD_HEADING.setCustomValidity(`Ещё ${minLength - valueLength} символов`);
  } else if (valueLength > maxLength) {
    AD_HEADING.setCustomValidity(
      `Удалите лишние ${valueLength - maxLength} символы`,
    );
  } else {
    AD_HEADING.setCustomValidity('');
  }

  AD_HEADING.reportValidity();
};

const priceInputHandler = () => {
  const value = AD_PRICE.value;
  const maxValue = AD_PRICE.getAttribute('max');
  const minValue = AD_PRICE.getAttribute('min');

  if (value < Number(minValue)) {
    AD_PRICE.setCustomValidity(`Минимальная цена ${minValue} рублей`);
  } else if (value > Number(maxValue)) {
    AD_PRICE.setCustomValidity(`Максимальная цена ${maxValue} рублей`);
  } else {
    AD_PRICE.setCustomValidity('');
  }

  AD_PRICE.reportValidity();
};

const disableCapacity = (onload) => {
  AD_CAPACITY_OPTIONS.forEach((option) => {
    if (onload === true) {
      if (option.selected !== true) {
        option.disabled = true;
      }
    } else {
      option.disabled = true;
    }
  });
};

const setCapacity = (peopleAmount) => {
  disableCapacity();

  RoomOptions[peopleAmount].forEach((maximumPeople) => {
    AD_CAPACITY_OPTIONS.forEach((option) => {
      if (Number(option.value) === maximumPeople) {
        option.disabled = false;
        option.selected = true;
      }
    });
  });
};

const roomChangeHandler = (evt) => {
  setCapacity(evt.target.value);
};

const typeChangeTypeHandler = (evt) => {
  AD_PRICE.setAttribute('min', RoomPrice[evt.target.value]);
  AD_PRICE.setAttribute('placeholder', RoomPrice[evt.target.value]);
};

const timeChangeHandler = (evt) => {
  AD_TIMEIN.value = evt.target.value;
  AD_TIMEOUT.value = evt.target.value;
};

const enableFormValidation = () => {
  disableCapacity(true);

  AD_HEADING.addEventListener('input', headingInputHandler);
  AD_PRICE.addEventListener('input', priceInputHandler);
  AD_ROOM.addEventListener('change', roomChangeHandler);
  AD_TYPE.addEventListener('change', typeChangeTypeHandler);
  AD_TIMEIN.addEventListener('change', timeChangeHandler);
  AD_TIMEOUT.addEventListener('change', timeChangeHandler);
};

const disableFormValidation = () => {
  AD_HEADING.removeEventListener('input', headingInputHandler);
  AD_PRICE.removeEventListener('input', priceInputHandler);
  AD_ROOM.removeEventListener('change', roomChangeHandler);
  AD_TYPE.removeEventListener('change', typeChangeTypeHandler);
  AD_TIMEIN.removeEventListener('change', timeChangeHandler);
  AD_TIMEOUT.removeEventListener('change', timeChangeHandler);
};

const resetForms = () => {
  AD_FORM.reset();
  MAP_FILTERS.reset();
};

const setFormAddress = () => {
  const pinLat = roundToDecimals(mainMarker._latlng.lat, 5);
  const pinLng = roundToDecimals(mainMarker._latlng.lng, 5);

  AD_ADDRESS.value = `${pinLat}, ${pinLng}`;
};

const handleSubmitSuccess = () => {
  postDataSuccess();
  resetForms();
  resetMainMarker();
  setFormAddress();
  updateMarkers();
};

const resetFormHandler = (evt) => {
  evt.preventDefault();
  resetForms();
  resetMainMarker();
  setFormAddress();
  updateMarkers();
};

const enableReset = () => {
  RESET_BUTTON.addEventListener('click', resetFormHandler);
};

const disableReset = () => {
  RESET_BUTTON.removeEventListener('click', resetFormHandler);
};

export {
  enableFormValidation,
  disableFormValidation,
  setFormAddress,
  handleSubmitSuccess,
  AD_FORM,
  enableReset,
  disableReset
};
