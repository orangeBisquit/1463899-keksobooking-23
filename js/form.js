const AD_FORM = document.querySelector('.ad-form');
const AD_HEADING = AD_FORM.querySelector('#title');
const AD_PRICE = AD_FORM.querySelector('#price');
const AD_ROOM = AD_FORM.querySelector('#room_number');
const AD_CAPACITY = AD_FORM.querySelector('#capacity');
const AD_CAPACITY_OPTIONS = AD_CAPACITY.querySelectorAll('option');

const ROOM_OPTIONS = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
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
  const value = AD_PRICE.value.length;
  const maxValue = AD_PRICE.getAttribute('max');

  if (value > maxValue) {
    AD_PRICE.setCustomValidity(`Максимальная цена ${maxValue} рублей`);
  } else {
    AD_PRICE.setCustomValidity('');
  }

  AD_PRICE.reportValidity();
};

const disableCapacity = () => {
  AD_CAPACITY_OPTIONS.forEach((option) => {
    if (option.selected !== true) {
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

const enableFormValidation = () => {
  disableCapacity();

  AD_HEADING.addEventListener('input', headingInputHandler);
  AD_PRICE.addEventListener('input', priceInputHandler);
  AD_ROOM.addEventListener('change', roomChangeHandler);
};

const disableFormValidation = () => {
  AD_HEADING.removeEventListener('input', headingInputHandler);
  AD_PRICE.removeEventListener('input', priceInputHandler);
  AD_ROOM.removeEventListener('change', roomChangeHandler);
};

export { enableFormValidation, disableFormValidation };


