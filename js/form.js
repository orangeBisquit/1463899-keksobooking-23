const AD_FORM = document.querySelector('.ad-form');
const AD_HEADING = AD_FORM.querySelector('#title');
const AD_PRICE = AD_FORM.querySelector('#price');
const AD_ROOM = AD_FORM.querySelector('#room_number');
const AD_CAPACITY = AD_FORM.querySelector('#capacity');
const AD_TYPE = AD_FORM.querySelector('#type');
const AD_CAPACITY_OPTIONS = AD_CAPACITY.querySelectorAll('option');
const AD_TIMEIN = AD_FORM.querySelector('#timein');
const AD_TIMEOUT = AD_FORM.querySelector('#timeout');

const ROOM_OPTIONS = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const ROOM_PRICE = {
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

  ROOM_OPTIONS[peopleAmount].forEach((maximumPeople) => {
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
  AD_PRICE.setAttribute('min', ROOM_PRICE[evt.target.value]);
  AD_PRICE.setAttribute('placeholder', ROOM_PRICE[evt.target.value]);
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

export { enableFormValidation, disableFormValidation };
